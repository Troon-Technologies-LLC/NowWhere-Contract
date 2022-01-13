import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId: UInt64,TemplateId: UInt64,MintNumber: UInt64,Creator: Address) {
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from:NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    
    //  self.adminRef.purchaseNFT(dropId: 1, templateId: 1, mintNumbers: 5, receiptAddress: 0xf3fcd2c1a78f5eee)
    self.adminRef.purchaseNFT(dropId: DropId, templateId: TemplateId, mintNumbers: MintNumber, receiptAddress: Creator)
    }
}