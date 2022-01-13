import NowWhereContract from "./NowWhereContract.cdc"

transaction(DropId: UInt64, StartDate: UFix64,EndDate: UFix64,Template: {UInt64:AnyStruct}){
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
        self.adminRef.createDrop(dropId: DropId, startDate: StartDate, endDate: EndDate, templates: Template)
    }
}
