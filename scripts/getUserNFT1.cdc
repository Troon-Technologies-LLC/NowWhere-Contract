import NFTContract from 0xc3efbc9926eb00eb
import NonFungibleToken from 0x631e88ae7f1d7c20
// Print the NFTs owned by accounts 0x01 and 0x02.
pub fun main() : [UInt64] {
    // Get both public account objects
    let account1 = getAccount(0xf3e107721f7302e7)
    // Find the public Receiver capability for their Collections
    let acct1Capability =  account1.getCapability(NFTContract.CollectionPublicPath)
                .borrow<&{NonFungibleToken.CollectionPublic}>()
                ?? panic("Could not get receiver reference to the NFT Collection")
    return  acct1Capability.getIDs()
}