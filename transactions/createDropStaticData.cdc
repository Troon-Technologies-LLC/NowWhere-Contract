import NowWhereContract from "../contracts/NowWhereContract.cdc"

transaction(DropId: UInt64/* , StartDate: UFix64,EndDate: UFix64*/){
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
        let template : {UInt64:AnyStruct} = {1:"3"}
        let StartDate : UFix64 = getCurrentBlock().timestamp + 400.0
        let EndDate : UFix64 = getCurrentBlock().timestamp + 900.0
        self.adminRef.createDrop(dropId: DropId, startDate: StartDate, endDate: EndDate, templates: template)
        
        
        log("ok")
    }
}