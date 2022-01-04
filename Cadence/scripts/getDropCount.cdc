
import NowwhereContract from "../contracts/NowwhereContract.cdc"
pub fun main():Int{
    return  NowwhereContract.getAllDrops().length
}