import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId: UInt64){
   let adminRef: &NowWhereContract.DropAdmin
   prepare(acct: AuthAccount) {
      self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
      ??panic("could not borrow refrence")
   }
   
   execute{
      self.adminRef.removeDrop(dropId: DropId)
   }
}