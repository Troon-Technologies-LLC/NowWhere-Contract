import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId: UInt64, StartDate: UFix64?,EndDate: UFix64?){
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
        let template : {UInt64:AnyStruct} = {3:"3"}
        //let template : {UInt64:AnyStruct} = {}
        self.adminRef.updateDrop(dropId: DropId, startDate: StartDate, endDate: EndDate, templates: template)
        
    }
}
