import NowWhereContract from "./NowWhereContract.cdc"

pub fun main(dropId: UInt64):NowWhereContract.Drop {
    return  NowWhereContract.getDropById(dropId: dropId)
    
}
