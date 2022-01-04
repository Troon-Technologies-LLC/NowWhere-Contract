import NowwhereContract from "../contracts/NowwhereContract.cdc"
pub fun main():NowwhereContract.Drop{
    return  NowwhereContract.getDropById(dropId: 1)
    
}