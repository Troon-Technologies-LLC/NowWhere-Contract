import NowwhereContract from "../contracts/NowwhereContract.cdc"
pub fun main():{UInt64:NowwhereContract.Drop}{
    return  NowwhereContract.getAllDrops()
    
}