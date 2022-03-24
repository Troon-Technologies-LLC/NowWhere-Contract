import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction (DropId: UInt64, Creator: Address, mintNumbers: UInt64){
   let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
            ??panic("could not borrow admin reference")
    }

    execute {
        self.adminRef.removeReservedUserNFT(dropId: DropId, receiptAddress: Creator, mintNumbers: mintNumbers)
    }
}
