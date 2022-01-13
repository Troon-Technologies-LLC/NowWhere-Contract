
import NowWhereContract from "./NowWhereContract.cdc"
pub fun main():Int{
    return  NowWhereContract.getAllDrops().length
}