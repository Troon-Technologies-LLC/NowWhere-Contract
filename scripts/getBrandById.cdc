import NFTContract from "./NFTContract.cdc"
pub fun main(brandId:UInt64): AnyStruct{
    return NFTContract.getBrandById(brandId: brandId)
}