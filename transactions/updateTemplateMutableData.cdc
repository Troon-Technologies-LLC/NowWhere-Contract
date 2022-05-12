import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"


transaction (templateId:UInt64){
  prepare(acct: AuthAccount) {

     let actorResource = acct.getCapability
              <&{NFTContract.NFTMethodsCapability}>
              (NFTContract.NFTMethodsCapabilityPrivatePath)
              .borrow() ?? 
              panic("could not borrow a reference to the NFTMethodsCapability interface")

              let key:String = "four"
              let value:AnyStruct = "4"

    actorResource.updateTemplateMutableData(templateId: templateId,key: key,value:value)

  }
}