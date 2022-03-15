import NFTContract from 0x43862bd2c9f32864

transaction () {
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ??
            panic("could not borrow a reference to the NFTMethodsCapability interface")
        actorResource.createNewBrand(
        brandName: "NowWhere",
        data: {
            "name":"NowWhere",
            "description":"A two-sided blockchain-backed intelligent NFT marketplace with a 'NETFLIX-style' recommend engine - indexing / scoring and ranking assets - connecting Collectors with Creators and vice versa",
            "url":"https://troontechnologies.com/"
        })
        log("ok")
    }
}