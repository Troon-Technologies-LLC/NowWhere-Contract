import NFTContract from "../contracts/NFTContract.cdc"

pub fun main(templateId: UInt64): Bool {
    return NFTContract.isTemplateLocked(templateId: templateId)
}