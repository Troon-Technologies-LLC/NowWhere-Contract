import NFTContract from 0x43862bd2c9f32864
transaction (schemaName:String){
   prepare(acct: AuthAccount) {
      let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ?? 
            panic("could not borrow a reference to the NFTMethodsCapability interface")

         let format : {String: NFTContract.SchemaType} = {
            "artist" : NFTContract.SchemaType.String,
            "artistEmail"  :  NFTContract.SchemaType.String,
            "title":NFTContract.SchemaType.String,
            "mintType":  NFTContract.SchemaType.String,
            "nftType":  NFTContract.SchemaType.String,
            "rarity":  NFTContract.SchemaType.String,
            "contectType":  NFTContract.SchemaType.String,
            "contectValue":  NFTContract.SchemaType.String,
            "extras": NFTContract.SchemaType.Any
            }
         actorResource.createSchema(schemaName: "nft-series", format: format)
         log("ok")
   }
}