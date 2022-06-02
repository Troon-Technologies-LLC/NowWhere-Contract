import NowWhereContract from "../contracts/NowWhereContract.cdc"
pub fun main():Int{
    return  NowWhereContract.getAllDrops().length
}