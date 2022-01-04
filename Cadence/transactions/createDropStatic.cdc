import NowwhereContract from "../contracts/NowwhereContract.cdc"
transaction(DropId:UInt64, Creator:Address,StartDate:UFix64,EndDate:UFix64){

    let adminRef: &NowwhereContract.DropAdmin
    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&NowwhereContract.DropAdmin>(from:/storage/DropAdmin)
        ??panic("could not borrow admin reference")
    }



    execute{
        let template : {UInt64:AnyStruct} ={1:"3"}
        self.adminRef.createDrop(dropId: DropId, creator: Creator, startDate: StartDate, endDate: EndDate, templates: template)
    }
}
