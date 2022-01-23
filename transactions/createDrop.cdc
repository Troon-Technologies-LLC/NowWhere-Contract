import NowWhereContract from 0xf8d6e0586b0a20c7

transaction{
    let adminRef: &NowWhereContract.DropAdmin
    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from: NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
    }
    execute{
     let template : {UInt64:AnyStruct} ={1:"3"}
        self.adminRef.createDrop(dropId: 1, startDate: 1.0, endDate: 1.0, templates: template)
        log("ok")
    }
}