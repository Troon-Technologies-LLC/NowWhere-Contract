import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId: UInt64, StartDate: UFix64,EndDate: UFix64,template: {UInt64:AnyStruct}){
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
        self.adminRef.updateNowWhereDrop(dropId: DropId, startDate: StartDate, endDate: EndDate, templates: template)
        
    }
}