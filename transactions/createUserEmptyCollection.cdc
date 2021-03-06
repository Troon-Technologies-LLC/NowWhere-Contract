import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from 0xf8d6e0586b0a20c7
transaction {
    prepare(acct: AuthAccount) {

        let collection  <- NFTContract.createEmptyCollection()
        // store the empty NFT Collection in account storage
        acct.save( <- collection, to:NFTContract.CollectionStoragePath)
        log("Collection created for account".concat(acct.address.toString()))
        // create a public capability for the Collection
        acct.link<&{NonFungibleToken.CollectionPublic}>(NFTContract.CollectionPublicPath, target:NFTContract.CollectionStoragePath)
        log("Capability created")

    }
}
