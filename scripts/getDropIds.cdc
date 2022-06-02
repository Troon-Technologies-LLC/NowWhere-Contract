import NowWhereContract from "../contracts/NowWhereContract.cdc"


pub fun main(): [UInt64]{
   return  NowWhereContract.getAllDrops().keys
}