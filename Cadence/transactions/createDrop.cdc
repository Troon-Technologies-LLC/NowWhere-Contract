import NowwhereContract from "../contracts/NowwhereContract.cdc"
transaction(DropId:UInt64, Creator:Address,StartDate:UFix64,EndDate:UFix64,Template :{UInt64:AnyStruct}){

    let adminRef: &NowwhereContract.DropAdmin
    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&NowwhereContract.DropAdmin>(from:/storage/DropAdmin)
        ??panic("could not borrow admin reference")
    }



    execute{

        self.adminRef.createDrop(dropId: DropId, creator: Creator, startDate: StartDate, endDate: EndDate, templates: Template)
            //dropId: 1, creator: 0x04, startDate: 1948287676.0, endDate: 1988287676.0, templates: template)
    }
}
