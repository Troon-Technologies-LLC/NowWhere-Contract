import NFTContract from "../contracts/NFTContract.cdc"
transaction(templateId: UInt64, status: Bool) {
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ?? 
            panic("could not borrow a reference to the NFTMethodsCapability interface")
     
        actorResource.lockTemplateById(templateId: templateId, status: status)
        log("ok")
    }
}