import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"
// Print the NFTs owned by accounts 0x01 and 0x02.
pub fun main(address: Address) : &NFTContract.NFT?  {
    // Get both public account objects
    let account1 = getAccount(address)
    // Find the public Receiver capability for their Collections
    let acct1Capability =  account1.getCapability(NFTContract.CollectionPublicPath)
                .borrow<&{NFTContract.NFTContractCollectionPublic}>()
                ?? panic("Could not get receiver reference to the NFT Collection")
                            
    return  acct1Capability.borrowNFTContract(id:8)
}