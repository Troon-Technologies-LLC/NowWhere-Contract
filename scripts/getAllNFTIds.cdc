import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"

pub fun main(address: Address):[UInt64]{
    let account1 = getAccount(address)
    let acct1Capability =  account1.getCapability(NFTContract.CollectionPublicPath)
                           .borrow<&{NFTContract.NFTContractCollectionPublic}>()
                            ??panic("could not borrow receiver Reference ")
    return acct1Capability.getIDs()
}