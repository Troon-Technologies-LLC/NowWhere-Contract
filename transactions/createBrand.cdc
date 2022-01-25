import NFTContract from 0xf8d6e0586b0a20c7

transaction (brandName: String, data: {String:String}){
    prepare(acct: AuthAccount) {
    
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ?? 
            panic("could not borrow a reference to the NFTMethodsCapability interface")

        actorResource.createNewBrand(
         brandName: brandName,
        data: data)
        log("ok")
    }
}