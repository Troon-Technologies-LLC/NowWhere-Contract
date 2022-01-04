import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"

pub fun main():[UInt64]{
    
    let account1 = getAccount(0x03)
    let acct1Capability =  account1.getCapability(NFTContract.CollectionPublicPath)
                           .borrow<&{NonFungibleToken.CollectionPublic}>()
                            ??panic("could not borrow receiver Reference ")
    return  acct1Capability.getIDs()


}