import NowWhereContract from "./NowWhereContract.cdc"
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868



transaction() {
//DropId: UInt64,TemplateId: UInt64,MintNumber: UInt64,Creator: Address
    let adminRef: &NowWhereContract.DropAdmin
    // Temporary Vault object that holds the balance that is being transferred
    var temporaryVault: @FungibleToken.Vault

    prepare(acct: AuthAccount, acct1:AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from:NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
        
        let vaultRef = acct1.borrow<&MyFungibleToken.Vault>(from: /storage/Vault)
        ?? panic("Could not borrow a reference to the owner's vault")
      
    self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
    //self.adminRef.purchaseNFT(dropId: DropId, templateId: TemplateId, mintNumbers: MintNumber, receiptAddress: Creator)
    
    }

    execute{

      let dropResponse = self.adminRef.purchaseDropByFlow(dropId: 1, templateId: 1, mintNumbers: 5, receiptAddress: 0x179b6b1cb6755e31, from: <- self.temporaryVault)
      log(dropResponse)
    }
}
