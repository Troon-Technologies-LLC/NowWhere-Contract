import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"
pub fun main(): NFTContract.Schema {
    return NFTContract.getSchemaById(schemaId: 1)
}