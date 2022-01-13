import NowWhereContract from "./NowWhereContract.cdc"

pub fun main(): [UInt64]{
   return  NowWhereContract.getAllDrops().keys
}