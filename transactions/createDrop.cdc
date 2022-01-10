import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId:UInt64, StartDate:UFix64,EndDate:UFix64,Template :{UInt64:AnyStruct}){
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from:NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
        //dropId: 1, creator: 0x04, startDate: 1948287676.0, endDate: 1988287676.0, templates: template)
        self.adminRef.createDrop(dropId: DropId, startDate: StartDate, endDate: EndDate, templates: Template)
    }
}
