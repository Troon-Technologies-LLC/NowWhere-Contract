import NFTContract from "./NFTContract.cdc"
import NowwhereContract from "../contracts/NowwhereContract.cdc"

pub fun main():{String:UInt64}{

    let outdropId = NowwhereContract.getDropById(dropId: 1)
    let templateid = outdropId.templates.keys

    let getTemplate = NFTContract.getTemplateById(templateId: templateid[0])
    let issuedSupply = getTemplate.issuedSupply

    let maxSupply = getTemplate.maxSupply


    var dropMetaData: {String:UInt64}= {}

        dropMetaData["IssuedSupply"] = getTemplate.issuedSupply
        dropMetaData["MaxSupply"] =  getTemplate.maxSupply


    return  dropMetaData

}