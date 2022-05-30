import NFTContract from "../contracts/NFTContract.cdc"
import NonFungibleToken from "../contracts/NonFungibleToken.cdc"


transaction (templateId:UInt64){
  prepare(acct: AuthAccount) {

     let actorResource = acct.getCapability
              <&{NFTContract.NFTMethodsCapability}>
              (NFTContract.NFTMethodsCapabilityPrivatePath)
              .borrow() ?? 
              panic("could not borrow a reference to the NFTMethodsCapability interface")

             let mutableData : {String: AnyStruct} = {   //}
                "Keyboard" : "Qwerty",
                "InputType" : "AlphaNumeric"
              
             }

    actorResource.updateCompleteTemplateMutableData(templateId: templateId,newMutableData: mutableData)

  }
}