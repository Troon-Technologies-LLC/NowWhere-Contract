//Saad kindly update this

## Technical Summary and Code Documentation

## Instructions for creating Brand, Schema, Template and Mint Templates

A common order of creating NFT would be

- Create Admin Account with `transaction/setupAdminAccount.cdc`.
- Owner then create that account Admin, and gives that account ability to create Drop, Purchase Drop and Remove Drop with `transactions/AddAdminCapability`
- Create new Drop with `transactions/createDrop.cdc` using Admin Account.
- Create NFT Receiver with `transaction/setupAccount` to recieve NFT .
- Purcahse Drop and send to any address with `transactions/purchaseDrop.cdc` using Admin Account.
- Remove Drop `transactions/RemoveDrop.cdc` using Admin Account.
  You can also see the scripts in `transactions/scripts` to see how information
  can be read from the NowWhereContract.

### Nowwhere Events

- Contract Initialized ->
  ` pub event ContractInitialized()`
  This event is emitted when the `Nowwhere` will be initialized.

- Event for Creation of Drop ->
  `pub event DropCreated(dropId:UInt64,creator:Address,startDate:UFix64, endDate:UFix64)`
  Emitted when a new Drop will be created and added to the smart Contract.

- Event for purchase Drop ->
  `pub event DropPurchased(dropId:UInt64,templateId:UInt64,mintNumbers:UInt64, receiptAddress:Address)`
  Emitted when a Drop will be Purchased.

- Event for Remove Drop ->
  `pub event DropRemoved(dropId:UInt64)`
  Emitted when a Drop will be Removed.

## Nowwhere Addresses

`NowWhereContract.cdc`

| Network | Contract Address     |
| ------- | -------------------- |
| Testnet | `0xb1295645abe1f315` |

## Drop Structure

In drops we have the following Information:

- dropId:UInt64
- creator:Address
- startDate:UFix64
- endDate:UFix64
- templates :{UInt64:AnyStruct}

## Instruction of Create Drops

To Create a drop of specific Template, we have to give arguments shown above, after that our function will check that start and end time should be grater than present time, template must not be null, drop Ids should be unique.

## Instruction of Purchase NFT

To Purchase NFT with any Drop we have to give the following fields:

- dropId
- templateId
- mintNumber(Mint Number of Template)
- receiptAddress(Address which will recieve NFT)
  Only Whitelisted Address can create Drops and Purchase NFTs with Drops.

## Instruction of Remove Drop

We can remove old drops using this function. Those drops date should be ended and we can't delete active drops. To delete drop we have to give the following fields:

- dropId

### Deployment Contract on Emulator

- Run `flow project deploy --network emulator`
  - All contracts are deployed to the emulator.

After the contracts have been deployed, you can run the sample transactions
to interact with the contracts. The sample transactions are meant to be used
in an automated context, so they use transaction arguments and string template
fields. These make it easier for a program to use and interact with them.
If you are running these transactions manually in the Flow Playground or
vscode extension, you will need to remove the transaction arguments and
hard code the values that they are used for.
