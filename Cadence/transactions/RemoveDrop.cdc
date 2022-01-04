import NowwhereContract from "../contracts/NowwhereContract.cdc"

transaction(DropId:UInt64){
    let adminRef: &NowwhereContract.DropAdmin
   prepare(acct: AuthAccount) {
      self.adminRef = acct.borrow<&NowwhereContract.DropAdmin>(from:/storage/DropAdmin)
      ??panic("could not borrow ref")
      
   }
   execute{
    self.adminRef.removeDrop(dropId: DropId)
   }
}