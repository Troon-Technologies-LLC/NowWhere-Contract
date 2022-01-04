import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"
pub fun main(): NFTContract.Template {
    return NFTContract.getTemplateById(templateId: 1)
}