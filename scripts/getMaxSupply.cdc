import NFTContract from "./NFTContract.cdc"
import NowWhereContract from "./NowWhereContract.cdc"

pub fun main(dropId: UInt64):{String:UInt64}{

    let outdropId = NowWhereContract.getDropById(dropId: dropId)
    let templateid = outdropId.templates.keys

    let getTemplate = NFTContract.getTemplateById(templateId: templateid[0])
    let issuedSupply = getTemplate.issuedSupply

    let maxSupply = getTemplate.maxSupply


    var dropMetaData: {String:UInt64}= {}
    
        dropMetaData["IssuedSupply"] = getTemplate.issuedSupply
        dropMetaData["MaxSupply"] =  getTemplate.maxSupply


    return  dropMetaData

}