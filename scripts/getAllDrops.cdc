import NowWhereContract from "../contracts/NowWhereContract.cdc"
pub fun main():{UInt64:NowWhereContract.Drop}{
    return  NowWhereContract.getAllDrops()
    
}