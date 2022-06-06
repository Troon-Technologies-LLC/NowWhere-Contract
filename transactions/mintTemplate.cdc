import NFTContract from "../contracts/NFTContract.cdc"
transaction(templateId: UInt64, account: Address, immutableData:{String:AnyStruct}?){
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
        <&{NFTContract.NFTMethodsCapability}>
        (NFTContract.NFTMethodsCapabilityPrivatePath)
        .borrow() ?? 
        panic("could not borrow a reference to the NFTMethodsCapability interface")
        actorResource.mintNFT(templateId: templateId, account: account, immutableData: immutableData) 
    }
}