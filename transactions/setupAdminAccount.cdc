import NFTContract from 0x9d23081cde9dd45b
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction() {
    prepare(signer: AuthAccount) {
        // save the resource to the signer's account storage
        if signer.getLinkTarget(NFTContract.NFTMethodsCapabilityPrivatePath) == nil {
            let adminResouce <- NFTContract.createAdminResource()
            signer.save(<- adminResouce, to: NFTContract.AdminResourceStoragePath)
            // link the UnlockedCapability in private storage
            signer.link<&{NFTContract.NFTMethodsCapability}>(
                NFTContract.NFTMethodsCapabilityPrivatePath,
                target: NFTContract.AdminResourceStoragePath
            )
        }

        signer.link<&{NFTContract.UserSpecialCapability}>(
            /public/UserSpecialCapability,
            target: NFTContract.AdminResourceStoragePath
        )

        let collection  <- NFTContract.createEmptyCollection()
        // store the empty NFT Collection in account storage
        signer.save( <- collection, to: NFTContract.CollectionStoragePath)
        // create a public capability for the Collection
        signer.link<&{NFTContract.NFTContractCollectionPublic}>(NFTContract.CollectionPublicPath, target:NFTContract.CollectionStoragePath)
        log("ok")
    }
}