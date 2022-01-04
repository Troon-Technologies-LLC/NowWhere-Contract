import NFTContract from 0xd4221a1979538992

transaction (){

   prepare(acct: AuthAccount) {

         let actorResource = acct.getCapability
               <&{NFTContract.NFTMethodsCapability}>
               (/private/NFTMethodsCapability)
               .borrow() ?? 
               panic("could not borrow a reference to the NFTMethodsCapability interface")


         let format : {String: NFTContract.SchemaType} = {
            "image" : NFTContract.SchemaType.String,
            "title"  :  NFTContract.SchemaType.String,
            "startDate":NFTContract.SchemaType.Fix64,
            "endDate":  NFTContract.SchemaType.Fix64,
            "cost":  NFTContract.SchemaType.Fix64,
            "artistName":  NFTContract.SchemaType.String,
            "artistDescription":  NFTContract.SchemaType.String,
            "nftTemplates":  NFTContract.SchemaType.Array
            }

         actorResource.createSchema(schemaName: "jukebox-series-", format: format, author: 0x04)
         log("schema created")
   }
}