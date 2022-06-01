import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"


pub fun main(): UInt64 {
    return NFTContract.totalSupply
}