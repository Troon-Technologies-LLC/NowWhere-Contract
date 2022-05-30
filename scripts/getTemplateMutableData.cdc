import NFTContract from "../contracts/NFTContract.cdc"

pub fun main(templateId:UInt64): {String:AnyStruct}? {
    let MutableData= NFTContract.getTemplateById(templateId: templateId)

    return MutableData.mutableData
}