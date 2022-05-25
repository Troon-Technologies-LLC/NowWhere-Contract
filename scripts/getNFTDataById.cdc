import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"

pub fun main(nftId: UInt64) : AnyStruct{    
    var nftData = NFTContract.getNFTDataById(nftId: nftId)
    return nftData
}