import NFTContract from "./NFTContract.cdc"
import NonFungibleToken from "./NonFungibleToken.cdc"

// This transaction transfers a template to a recipient
// This transaction is how a user would transfer an NFT
// from their account to another account
// The recipient must have a NFTContract Collection object stored
// and a public TransferInterface capability stored at
// `/public/TemplateCollection`

// Parameters:
//
// recipient: The Flow address of the account to receive the NFT.
// withdrawID: The id of the NFT to be transferred
transaction(recipient: Address, withdrawID: UInt64) {
    // local variable for storing the transferred token
    let transferToken: @NonFungibleToken.NFT
    prepare(acct: AuthAccount) {
        let collectionRef =  acct.borrow<&NFTContract.Collection>(from: NFTContract.CollectionStoragePath)
        ??panic("could not borrow a reference to the the stored nft Collection")
        self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
    }

    execute {
        // get the recipient's public account object
        let recipient = getAccount(recipient)
        let receiverRef = recipient.getCapability<&{NFTContract.NFTContractCollectionPublic}>(NFTContract.CollectionPublicPath)
            .borrow()
            ?? panic("Could not borrow receiver reference")
        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-self.transferToken)
    }
}