import NFTContract from "../contracts/NFTContract.cdc"

transaction () {
    prepare(acct: AuthAccount) {
        let actorResource = acct.getCapability
            <&{NFTContract.NFTMethodsCapability}>
            (NFTContract.NFTMethodsCapabilityPrivatePath)
            .borrow() ??
            panic("could not borrow a reference to the NFTMethodsCapability interface")
        actorResource.createNewBrand(
        brandName: "NFTContract",
        data: {
            "name":"NFTContract",
            "description":"A two-sided blockchain-backed intelligent NFT marketplace with a 'NETFLIX-style' recommend engine - indexing / scoring and ranking assets - connecting Collectors with Creators and vice versa",
            "url":"https://troontechnologies.com/"
        })
        log("ok")
    }
}