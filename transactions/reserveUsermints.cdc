import NowWhereContract from "../contracts/NowWhereContract.cdc"
transaction(DropId: UInt64,TemplateId: UInt64,MintNumber: UInt64, Creator: Address){
   let adminRef: &NowWhereContract.DropAdmin
  prepare(acct: AuthAccount) {
    self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
  }

  execute {
    self.adminRef.ReserveUserNFT(dropId: DropId, templateId:TemplateId, receiptAddress: Creator, mintNumbers: MintNumber)
  }
}
