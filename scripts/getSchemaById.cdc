import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"


pub fun main(schemaId: UInt64): NFTContract.Schema {
    return NFTContract.getSchemaById(schemaId: schemaId)
}