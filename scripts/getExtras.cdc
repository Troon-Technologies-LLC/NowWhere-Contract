import NFTContract from "../contracts/NFTContract.cdc"
pub fun main(): AnyStruct? {
    let extras = NFTContract.getTemplateById(templateId: 13).getImmutableData()["extras"] 
    return  extras
}