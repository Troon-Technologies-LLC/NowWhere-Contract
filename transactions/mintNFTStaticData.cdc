import NFTContract from "../contracts/NFTContract.cdc"

transaction(templateId: UInt64, account:Address){

    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
        <&{NFTContract.NFTMethodsCapability}>
        (NFTContract.NFTMethodsCapabilityPrivatePath)
        .borrow() ?? 
        panic("could not borrow a reference to the NFTMethodsCapability interface")

        let immutableData: {String: AnyStruct}? = {
            "NFTType" : "Nature"
        }

        actorResource.mintNFT(templateId: templateId, account: account, immutableData:immutableData) 
    }
}