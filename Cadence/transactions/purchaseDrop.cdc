import NowwhereContract from "../contracts/NowwhereContract.cdc"
transaction(DropId:UInt64,TemplateId:UInt64,MintNumber:UInt64,Creator:Address){
    let adminRef: &NowwhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowwhereContract.DropAdmin>(from:/storage/DropAdmin)
        ??panic("could not borrow admin referenc")
    self.adminRef.purchaseNFT(dropId:DropId, templateId: TemplateId, mintNumbers: MintNumber, receiptAddress: Creator)
  //  self.adminRef.purchaseNFT(dropId: 1, templateId: 1, mintNumbers: 5, receiptAddress: 0xf3fcd2c1a78f5eee)
    }


}