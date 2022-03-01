
import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from 0xf8d6e0586b0a20c7


transaction{
    prepare(account:AuthAccount){
        account.unlink(NFTContract.CollectionPublicPath)
        account.link<&{NFTContract.NFTContractCollectionPublic}>(NFTContract.CollectionPublicPath, target:NFTContract.CollectionStoragePath)
    }
    execute{
    }
}

