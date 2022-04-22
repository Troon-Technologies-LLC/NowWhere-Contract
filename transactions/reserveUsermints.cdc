import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction (DropId: UInt64,TemplateId: UInt64, Creator: Address,MintNumber: UInt64){
   let adminRef: &NowWhereContract.DropAdmin
  prepare(acct: AuthAccount) {
    self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
  }

  execute {
    self.adminRef.ReserveUserNFT(dropId: DropId, templateId:TemplateId, receiptAddress: Creator, mintNumbers: MintNumber)
  }
}
