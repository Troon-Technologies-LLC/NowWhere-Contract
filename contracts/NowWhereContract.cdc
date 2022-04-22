import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

pub contract NowWhereContract {
    // -----------------------------------------------------------------------
    // Nowwhere contract Event definitions
    // -----------------------------------------------------------------------
    pub event ContractInitialized()
    // Emitted when a new Drop is created
    pub event DropCreated(dropId: UInt64, creator: Address, startDate: UFix64, endDate: UFix64)
    // Emitted when a new Drop is updated
    pub event DropUpdated(dropId: UInt64, creator: Address, startDate: UFix64, endDate: UFix64)
    // Emitted when a Drop is purchased
    pub event DropPurchased(dropId: UInt64, templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address)
     // Emitted when a Drop is purchased using flow
    pub event DropPurchasedWithFlow(dropId: UInt64, templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address, price: UFix64)
    // Emitted when a Drop is removed
    pub event DropRemoved(dropId: UInt64)
    // Emitted when a user mintNumber is reserved
    pub event MintNumberReserved(dropId: UInt64, receiptAddress: Address)
    // Contract level paths for storing resources
    pub let DropAdminStoragePath: StoragePath
    // The capability that is used for calling the admin functions 
    access(contract) let adminRef: Capability<&{NFTContract.NFTMethodsCapability}>
    // Variable size dictionary of Drop structs
    access(self) var allDrops: {UInt64: Drop}
    // The dictionary to store the reserved mints for user address
    access(contract) var allReserved: {UInt64: {Address: ReserveMints}}
    // The dictionary to store the reserved mints for drops
    access(contract) var reservedMints: {UInt64: UInt64}
    // -----------------------------------------------------------------------
    // Nowwhere contract-level Composite Type definitions
    // -----------------------------------------------------------------------
    // These are just *definitions* for Types that this contract
    // and other accounts can use. These definitions do not contain
    // actual stored values, but an instance (or object) of one of these Types
    // can be created by this contract that contains stored values.

    // Drop is a struct 
    pub struct Drop {
        pub let dropId: UInt64
        pub var startDate: UFix64
        pub var endDate: UFix64
        access(contract) var templates: {UInt64: AnyStruct}

        init(dropId: UInt64, startDate: UFix64, endDate: UFix64, templates: {UInt64: AnyStruct}) {
            self.dropId = dropId
            self.startDate = startDate
            self.endDate = endDate
            self.templates = templates
        }

        access(contract) fun updateDrop(startDate: UFix64, endDate: UFix64, templates: {UInt64: AnyStruct}){
            self.startDate = startDate
            self.endDate = endDate
            self.templates = templates
        }
        
        pub fun getDropTemplates(): {UInt64: AnyStruct} {
            return self.templates
        }
    }

    // ReserveMints is a struct
    pub struct ReserveMints {
        pub let user_address: {String: UInt64}

        init(user_address: {String: UInt64}) {
            self.user_address = user_address
        }
         pub fun addUserMint(mintNumber: String, mintNumberValue :UInt64){
            self.user_address.insert(key: mintNumber, mintNumberValue)
        }
    }

    // DropAdmin
    // This is the main resource to manage the NFTs that they are creating and purchasing.
    pub resource DropAdmin {
        access(contract) var ownerVault: Capability<&AnyResource{FungibleToken.Receiver}>?

        pub fun addOwnerVault(_ownerVault: Capability<&AnyResource{FungibleToken.Receiver}>){
            self.ownerVault = _ownerVault
        }

        pub fun createDrop(dropId: UInt64, startDate: UFix64, endDate: UFix64, templates: {UInt64: AnyStruct}){
            pre{
                dropId != nil: "invalid drop id"
                NowWhereContract.allDrops[dropId] == nil: "drop id already exists"
                startDate >= getCurrentBlock().timestamp: "Start Date should be greater or Equal than current time"
                endDate > startDate: "End date should be greater than start date"
                templates != nil: "templates must not be null"
            }

            var areValidTemplates: Bool = true
            for templateId in templates.keys {
                var template = NFTContract.getTemplateById(templateId: templateId)
                if(template == nil){
                    areValidTemplates = false
                    break
                }
            }
            assert(areValidTemplates, message:"templateId is not valid")

            var newDrop = Drop(dropId: dropId,startDate: startDate, endDate: endDate, templates: templates)
            NowWhereContract.allDrops[newDrop.dropId] = newDrop

            emit DropCreated(dropId: dropId, creator: self.owner?.address!, startDate: startDate, endDate: endDate)
        }

        pub fun updateDrop(dropId: UInt64, startDate: UFix64, endDate: UFix64, templates: {UInt64: AnyStruct}) {
            pre{
                dropId != nil: "invalid drop id"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exists"
                startDate >= getCurrentBlock().timestamp: "Start Date should be greater or Equal than current time"
                endDate > startDate: "End date should be greater than start date"
                templates != nil: "templates must not be null"
            }

            var areValidTemplates: Bool = true
            for templateId in templates.keys {
                var template = NFTContract.getTemplateById(templateId: templateId)
                if(template == nil){
                    areValidTemplates = false
                    break
                }
            }
            assert(areValidTemplates, message:"templateId is not valid")
            NowWhereContract.allDrops[dropId]!.updateDrop(startDate: startDate, endDate: endDate, templates: templates)

            emit DropUpdated(dropId: dropId, creator: self.owner!.address, startDate: startDate, endDate: endDate)
        }

        pub fun removeDrop(dropId: UInt64){
            pre {
                dropId != nil : "invalid drop id"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                getCurrentBlock().timestamp < NowWhereContract.allDrops[dropId]!.startDate: "Drop sale is started"
            }

            NowWhereContract.allDrops.remove(key: dropId)
            emit DropRemoved(dropId: dropId)
        }

        pub fun purchaseNFT(dropId: UInt64,templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address){
            pre {
                mintNumbers > 0: "mint number must be greater than zero"
                mintNumbers <= 10: "mint numbers must be less than ten"
                templateId > 0: "template id must be greater than zero"
                dropId != nil : "invalid drop id"
                receiptAddress !=nil: "invalid receipt Address"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowWhereContract.allDrops[dropId]!.startDate <= getCurrentBlock().timestamp: "drop not started yet"
                NowWhereContract.allDrops[dropId]!.endDate > getCurrentBlock().timestamp: "drop already ended"
                NowWhereContract.allDrops[dropId]!.templates[templateId] != nil: "template id does not exist"
                NowWhereContract.allReserved[dropId] != nil: "drop id does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress] != nil: "given address does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address["mintNumber"]! > 0: "mint for this address is not reserved"
            }

            var template = NFTContract.getTemplateById(templateId: templateId)
            assert(template.issuedSupply + mintNumbers <= template.maxSupply, message: "template reached to its max supply") 
            var i: UInt64 = 0
            while i < mintNumbers {
                NowWhereContract.adminRef.borrow()!.mintNFT(templateId: templateId, account: receiptAddress)
                i = i + 1
            }
            NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address.remove(key: "mintNumber")
            NowWhereContract.allReserved[dropId]!.remove(key: receiptAddress)
            let mints = NowWhereContract.reservedMints[dropId]!
            NowWhereContract.reservedMints[dropId] = mints.saturatingSubtract(mintNumbers)
            emit DropPurchased(dropId: dropId,templateId: templateId, mintNumbers: mintNumbers, receiptAddress: receiptAddress)
        }

        pub fun purchaseNFTWithFlow(dropId: UInt64, templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address, price: UFix64, flowPayment: @FungibleToken.Vault) {
            pre{
                price > 0.0: "Price should be greater than zero"
                receiptAddress !=nil: "invalid receipt Address"
                flowPayment.balance == price: "Your vault does not have balance to buy NFT"
                mintNumbers > 0: "mint number must be greater than zero"
                mintNumbers <= 10: "mint numbers must be less than ten"
                templateId > 0: "template id must be greater than zero"
                dropId != nil : "invalid drop id"
                receiptAddress !=nil: "invalid receipt Address"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowWhereContract.allDrops[dropId]!.startDate <= getCurrentBlock().timestamp: "drop not started yet"
                NowWhereContract.allDrops[dropId]!.endDate > getCurrentBlock().timestamp: "drop already ended"
                NowWhereContract.allDrops[dropId]!.templates[templateId] != nil: "template id does not exist"
                NowWhereContract.allReserved[dropId] != nil: "drop id does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress] != nil: "given address does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address["mintNumber"]! > 0: "mint for this address is not reserved"
            }
                
            let vaultRef = self.ownerVault!.borrow()
                ?? panic("Could not borrow reference to owner token vault")
            vaultRef.deposit(from: <-flowPayment)
            var template = NFTContract.getTemplateById(templateId: templateId)
            assert(template.issuedSupply + mintNumbers <= template.maxSupply, message: "template reached to its max supply")
            
            var i: UInt64 = 0
            while i < mintNumbers {
                NowWhereContract.adminRef.borrow()!.mintNFT(templateId: templateId, account: receiptAddress)
                i = i + 1
            }
            NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address.remove(key: "mintNumber")
            NowWhereContract.allReserved[dropId]!.remove(key: receiptAddress)
            let mints = NowWhereContract.reservedMints[dropId]!
            NowWhereContract.reservedMints[dropId] = mints.saturatingSubtract(mintNumbers)
            emit DropPurchasedWithFlow(dropId: dropId, templateId: templateId, mintNumbers: mintNumbers, receiptAddress: receiptAddress,price: price)
        }

        pub fun ReserveUserNFT(dropId: UInt64, templateId: UInt64, receiptAddress: Address, mintNumbers: UInt64) {
             pre {
                mintNumbers > 0: "mint number must be greater than zero"
                mintNumbers <= 10: "mint numbers must be less than ten"
                dropId != nil : "invalid drop id"
                receiptAddress != nil: "invalid receipt Address"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowWhereContract.allDrops[dropId]!.startDate <= getCurrentBlock().timestamp: "drop not started yet"
                NowWhereContract.allDrops[dropId]!.endDate > getCurrentBlock().timestamp: "drop already ended"
            }

            let templateData = NFTContract.getTemplateById(templateId: templateId)
            let mintAvailble = templateData.maxSupply
            let issuedSupply = templateData.issuedSupply
            assert(issuedSupply + mintNumbers <= mintAvailble, message: "mints not available")
            let mintdata =  NowWhereContract.reservedMints[dropId]
            if  mintdata == nil {
                assert(issuedSupply + mintNumbers <= mintAvailble, message: "mints reached")
                NowWhereContract.reservedMints[dropId] = mintNumbers
            }
            else{
                let mints =  NowWhereContract.reservedMints[dropId]!
                assert(issuedSupply + mints <= mintAvailble, message: "mints reached")
                assert(issuedSupply + mints + mintNumbers  <= mintAvailble, message: "mints not available") 
                NowWhereContract.reservedMints[dropId] = mints.saturatingAdd(mintNumbers)
            }
            let userData: {String : UInt64} = {"mintNumber": mintNumbers}
            let data = NowWhereContract.ReserveMints(user_address: userData)
            NowWhereContract.allReserved.insert(key: dropId, {receiptAddress: data})
            emit MintNumberReserved(dropId: dropId, receiptAddress: receiptAddress)
        }

        pub fun removeReservedUserNFT(dropId: UInt64, receiptAddress:Address, mintNumbers: UInt64){
            pre {
                dropId != nil : "invalid drop id"
                receiptAddress !=nil: "invalid receipt Address"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowWhereContract.allReserved[dropId] != nil: "drop id does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress] != nil: "given address does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address["mintNumber"]! > 0: "mint for this address is not reserved"
            }
            NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address.remove(key: "mintNumber")
            NowWhereContract.allReserved[dropId]!.remove(key: receiptAddress)
            let mints = NowWhereContract.reservedMints[dropId]!
            NowWhereContract.reservedMints[dropId] = mints.saturatingSubtract(mintNumbers)
        }

        pub fun getUserMintsByDropId(dropId: UInt64, receiptAddress:Address): Bool{
             pre {
                dropId != nil : "invalid drop id"
                receiptAddress !=nil: "invalid receipt Address"
                NowWhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowWhereContract.allReserved[dropId] != nil: "drop id does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress] != nil: "given address does not exist in reserved"
                NowWhereContract.allReserved[dropId]![receiptAddress]!.user_address["mintNumber"]! > 0: "mint for this address is not reserved"
            }
            let reserveData = NowWhereContract.allReserved[dropId]!
            let userMintData = reserveData[receiptAddress]!.user_address["mintNumber"]
            return userMintData! > 0
        }


        init(){
            self.ownerVault = nil
        }
    }

    // getDropById returns the IDs that the specified Drop id
    // is associated with 
    pub fun getDropById(dropId: UInt64): Drop {
        return self.allDrops[dropId]!
    }

    // getAllDrops returns all the Drops in NowWhereContract
    // Returns: A dictionary of all the Drop that have been created
    pub fun getAllDrops(): {UInt64: Drop} {
        return self.allDrops
    }

    init() {
        // Initialize contract fields
        self.allDrops = {}
        self.allReserved = {}
        self.reservedMints = {}

        self.DropAdminStoragePath = /storage/NowwhereDropAdmin
        // get the private capability to the admin resource interface
        // to call the functions of this interface.
        self.adminRef = self.account.getCapability<&{NFTContract.NFTMethodsCapability}>(NFTContract.NFTMethodsCapabilityPrivatePath)

        // Put the Drop Admin in storage
        self.account.save(<- create DropAdmin(), to: self.DropAdminStoragePath)
        emit ContractInitialized()
    }
}
