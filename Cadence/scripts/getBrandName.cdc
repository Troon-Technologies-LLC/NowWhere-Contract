import NFTContract from "../contracts/NFTContract.cdc"

pub fun main(brandId:UInt64): String? {
    return NFTContract.getBrandById(brandId: brandId).data["brandName"]

}