import NFTContract from "../contracts/NFTContract.cdc"
<<<<<<< HEAD
transaction(brandId: UInt64, schemaId: UInt64, maxSupply: UInt64, immutableData:{String: AnyStruct}, mutableData:{String: AnyStruct}?) {
=======
transaction(brandId: UInt64, schemaId: UInt64, maxSupply: UInt64, immutableData:{String: AnyStruct}, mutableData: {String: AnyStruct}?) {
>>>>>>> 95a7ae969de85e12c7e7bca375283fcf59bd61ea
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ?? 
            panic("could not borrow a reference to the NFTMethodsCapability interface")
<<<<<<< HEAD
           
=======
            
>>>>>>> 95a7ae969de85e12c7e7bca375283fcf59bd61ea
        actorResource.createTemplate(brandId: brandId, schemaId: schemaId, maxSupply: maxSupply, immutableData: immutableData, mutableData: mutableData)
        log("ok")
    }
}