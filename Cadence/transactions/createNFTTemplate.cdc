import NFTContract from 0xd4221a1979538992

transaction() {

     prepare(acct: AuthAccount) {

        let actorResource = acct.getCapability
        <&{NFTContract.NFTMethodsCapability}>
        (/private/NFTMethodsCapability)
        .borrow() ?? 
        panic("could not borrow a reference to the NFTMethodsCapability interface")

        let extra : {String: AnyStruct} = {
                "name":"nasir&irfan" // string
        }
        let immutableData : {String: AnyStruct} = {
            "nftContent" : "Image",
            "contentType"  : "https://troontechnologies.com",
            "title":"first NFT",
            "about":  "this is the first music nft",
            "nftCover": "https://troontechnologies.com"       
        }
        actorResource.createTemplate(brandId: 1, schemaId: 1, maxSupply: 100, immutableData: immutableData)
        log("Template created")
    }
}