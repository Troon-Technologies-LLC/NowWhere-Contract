import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"


pub fun main(nftId: UInt64) : AnyStruct{    
    var nftData = NFTContract.getNFTDataById(nftId: nftId)
    return nftData
}