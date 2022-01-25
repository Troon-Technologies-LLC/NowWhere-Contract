import NowWhereContract from 0xf8d6e0586b0a20c7
import FungibleToken from 0xee82856bf20e2aa6
import FlowToken from 0x0ae53cb6e3f42a79  

transaction(DropId: UInt64,TemplateId: UInt64,MintNumber: UInt64,receiptAddress: Address, Price: UFix64) {
    //it holds the reference to the owner
    let adminRef: &NowWhereContract.DropAdmin
    // Temporary Vault object that holds the balance that is being transferred
    var temporaryVault: @FungibleToken.Vault

    prepare(acct: AuthAccount, acct1:AuthAccount) {
        self.adminRef = acct.borrow<&NowWhereContract.DropAdmin>(from:NowWhereContract.DropAdminStoragePath)
        ??panic("could not borrow admin reference")
 
         let vaultRef = acct1.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
                ?? panic("Could not borrow buyer vault reference")
        self.temporaryVault <- vaultRef.withdraw(amount: 10.0)
    }
  
    execute{
      
      let dropResponse = self.adminRef.purchaseDropByFlow(dropId: DropId, templateId: TemplateId, mintNumbers: MintNumber, receiptAddress: receiptAddress, price:Price,flowPayment: <- self.temporaryVault)
      
      log(dropResponse)
    }
}
