import NFTContract from "../contracts/NFTContract.cdc"

pub fun main(templateId:UInt64): {String:AnyStruct} {

    return NFTContract.getImmutableData(templateId: templateId)
}