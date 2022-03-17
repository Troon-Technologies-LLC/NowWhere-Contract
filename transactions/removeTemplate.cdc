import NFTContract from 0x43862bd2c9f32864
transaction(templateId: UInt64) {
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ?? 
            panic("could not borrow a reference to the NFTMethodsCapability interface")
     
        actorResource.removeTemplateById(templateId: templateId)
        log("ok")
    }
}