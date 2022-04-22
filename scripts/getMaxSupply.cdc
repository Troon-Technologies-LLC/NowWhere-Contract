import NFTContract from "../contracts/NFTContract.cdc"
import NowWhereContract from "../contracts/NowWhereContract.cdc"

pub fun main(dropId: UInt64):{String:UInt64}{

    let outdropId = NowWhereContract.getDropById(dropId: dropId)
    let templateid = outdropId.getDropTemplates().keys

    let getTemplate = NFTContract.getTemplateById(templateId: templateid[0])
    let issuedSupply = getTemplate.issuedSupply

    let maxSupply = getTemplate.maxSupply


    var dropMetaData: {String:UInt64}= {}
    
        dropMetaData["IssuedSupply"] = getTemplate.issuedSupply
        dropMetaData["MaxSupply"] =  getTemplate.maxSupply


    return  dropMetaData

}