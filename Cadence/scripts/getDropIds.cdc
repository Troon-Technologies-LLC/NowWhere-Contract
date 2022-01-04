import NowwhereContract from "../contracts/NowwhereContract.cdc"

pub fun main(): [UInt64]{
   return  NowwhereContract.getAllDrops().keys
}