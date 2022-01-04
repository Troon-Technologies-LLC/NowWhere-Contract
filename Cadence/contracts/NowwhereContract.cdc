import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"

pub contract NowwhereContract {

    // -----------------------------------------------------------------------
    // Nowwhere contract Event definitions
    // -----------------------------------------------------------------------
    pub event ContractInitialized()
    // Emitted when a new Drop is created
    pub event DropCreated(dropId:UInt64,creator:Address,startDate:UFix64, endDate:UFix64)
    // Emitted when a Drop is purchased
    pub event DropPurchased(dropId:UInt64,templateId:UInt64,mintNumbers:UInt64, receiptAddress:Address)
    // Emitted when a Drop is removed
    pub event DropRemoved(dropId:UInt64)

    // Contract level paths for storing resources
    pub let DropAdminStoragePath: StoragePath
    // The capability that is used for calling the admin functions 
    access(contract) let adminRef : Capability<&{NFTContract.NFTMethodsCapability}>
    // Variable size dictionary of Drop structs
    access(self) var allDrops :{UInt64:Drop}

    // -----------------------------------------------------------------------
    // Nowwhere contract-level Composite Type definitions
    // -----------------------------------------------------------------------
    // These are just *definitions* for Types that this contract
    // and other accounts can use. These definitions do not contain
    // actual stored values, but an instance (or object) of one of these Types
    // can be created by this contract that contains stored values.
    // --

    // Drop is a struct 
    pub struct Drop {
        pub let dropId:UInt64
        pub let creator:Address
        pub let startDate:UFix64
        pub let endDate:UFix64
        pub let templates :{UInt64:AnyStruct}

        init(dropId:UInt64, creator:Address, startDate:UFix64, endDate:UFix64,templates:{UInt64:AnyStruct}){

            self.dropId = dropId
            self.creator = creator
            self.startDate = startDate
            self.endDate = endDate
            self.templates = templates
        }
        
    }


    // DropAdmin
    //
    // This is the main resource to manage the NFTs that they are creating and purchasing.
    pub resource DropAdmin {

        pub fun createDrop(dropId:UInt64,creator:Address,startDate:UFix64, endDate:UFix64,templates:{UInt64:AnyStruct}){
            pre{
                dropId != nil : "invalid drop id"
                NowwhereContract.allDrops[dropId] ==nil : "drop id already exists"
                startDate >= getCurrentBlock().timestamp:"Start Date should be greater or Equal than current time"
                endDate > startDate: "End date should be greater than start date"
                templates != nil: "templates must not be null"
            }            
            var areValidTemplates : Bool = true
            for templateId in templates.keys {
                var template = NFTContract.getTemplateById(templateId: templateId)
                if(template ==nil){
                    areValidTemplates = false
                    break
                }
            }
            assert(areValidTemplates, message: "templateId is not valid")
            var newDrop = Drop(dropId:dropId,creator:creator,startDate:startDate, endDate:endDate,templates:templates)
            NowwhereContract.allDrops[newDrop.dropId] = newDrop
            emit DropCreated(dropId:dropId,creator:creator,startDate:startDate, endDate:endDate)

        }
        pub fun removeDrop(dropId:UInt64){
            pre {
                dropId != nil : "invalid drop id"
                NowwhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowwhereContract.allDrops[dropId]!.endDate > getCurrentBlock().timestamp : "Drop is not ended yet"
            }
            NowwhereContract.allDrops.remove(key: dropId)
            emit DropRemoved(dropId:dropId)
        }

        pub fun purchaseNFT(dropId:UInt64,templateId:UInt64,mintNumbers:UInt64, receiptAddress:Address){
            pre {
                mintNumbers > 0: "mint number must be greater than zero"
                templateId > 0: "template id must be greater than zero"
                dropId != nil : "invalid drop id"
                templateId !=nil :"invalid template id"
                receiptAddress !=nil :"invalid receipt Address"
                NowwhereContract.allDrops[dropId] != nil: "drop id does not exist"
                NowwhereContract.allDrops[dropId]!.startDate >= getCurrentBlock().timestamp:"drop not started yet"
                NowwhereContract.allDrops[dropId]!.endDate >= getCurrentBlock().timestamp: "drop already ended"
                NowwhereContract.allDrops[dropId]!.templates[templateId] != nil: "template id does not exist"
            }

            var template =  NFTContract.getTemplateById(templateId: templateId)
            assert(template.issuedSupply + mintNumbers <= template.maxSupply, message: "template reached to its max supply")
            
            var i: UInt64 = 0
            while i < mintNumbers {
                NowwhereContract.adminRef.borrow()!.mintNFT(templateId: templateId, account: receiptAddress)
                i = i + 1
            }    
            
            emit DropPurchased(dropId:dropId,templateId:templateId,mintNumbers:mintNumbers, receiptAddress:receiptAddress)
        }

    }
        // getDropById returns the IDs that the specified Drop id
        //              is associated with.    

        pub fun getDropById(dropId:UInt64):Drop{
            return self.allDrops[dropId]!    
        }
        // getAllDrops returns all the Drops in NowwhereContract
        //
        // Returns: A dictionary of all the Drop that have been created

        pub fun getAllDrops():{UInt64:Drop}{
            return self.allDrops
        }

    init(){
        // Initialize contract fields
        self.allDrops = {}

        self.DropAdminStoragePath = /storage/DropAdmin
        // get the private capability to the admin resource interface
        // to call the functions of this interface.
        var adminPrivateCap =  self.account.getCapability
            <&{NFTContract.NFTMethodsCapability}>(/private/NFTMethodsCapability)

        self.adminRef = adminPrivateCap

        // Put the Drop Admin in storage
        self.account.save(<- create DropAdmin(), to: self.DropAdminStoragePath)
        emit ContractInitialized()
    }


}
