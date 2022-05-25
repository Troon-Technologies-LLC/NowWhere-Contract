## Technical Summary and Code Documentation

## Instructions for creating Brand, Schema, Template and Mint Templates

A common order of creating Drop would be

- Create Admin Account with `transaction/setupAdminAccount`.
- The owner then makes this account Admin and gives that accountability to create its Brand, Schema, Template, Drop
  and purchase Drop with `transactions/addAdminAccount`
- Create new Brand with `transactions/createBrand` using Admin Account.
- Create new Schema with `transactions/createSchema` using Admin Account.
- Create new Template with `transactions/createTemplate` using Admin Account.
- Remove Template with `transactions/removeTemplate` using Admin Account.
- Create NFT Receiver with `transaction/setupAccount` .
- Create new Drop with `transactions/createDrop` using Admin Account.
- update Drop with `transactions/updateDrop.cdc` using Admin Account.
- Purchase NFT and send to any address with `transactions/purchaseDrop` using Admin Account.
- Purchase NFT with flow and send to any address with `transactions/purchaseNFTWithFlow` using Admin Account and User Account.
- Remove Drop `transactions/RemoveDrop.cdc` using Admin Account.

### Nowwhere Events

- Contract Initialized ->
  ` pub event ContractInitialized()`
  This event is emitted when the `Nowwhere` will be initialized.

- Event for Creation of Drop ->
  `pub event DropCreated(dropId: UInt64, creator: Address, startDate: UFix64, endDate: UFix64)`
  Emitted when a new Drop will be created and added to the smart Contract.

- Event for update of Drop ->
  `pub event DropUpdated(dropId: UInt64, startDate: UFix64, endDate: UFix64)`
  Emitted when a Drop will be Updated.

- Event for purchase Drop ->
  `pub event DropPurchased(dropId: UInt64, templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address)`
  Emitted when a Drop will be Purchased.

- Event for purchase Drop with flow->
  `pub event DropPurchasedWithFlow(dropId: UInt64, templateId: UInt64, mintNumbers: UInt64, receiptAddress: Address, price: UFix64)`
  Emitted when a Drop will be Purchased using flow.

- Event for Remove Drop ->
  `pub event DropRemoved(dropId:UInt64)`
  Emitted when a Drop will be Removed.

## Nowwhere Addresses

`NowWhereContract.cdc`

| Network | Contract Address     |
| ------- | -------------------- |
| Testnet | `0x1673bd60de19daa6` |
| Mainnet | `0x1272fc57f20604b9` |

## Drop Structure

In drops we have the following Information:

- dropId: UInt64
- startDate: UFix64
- endDate: UFix64
- templates: {UInt64: AnyStruct}

## Instructions for Create Drops

To Create a drop of specific Template/s, we have to give arguments shown above, after that our function will check that start and end time should be greater than present time, template must not be null, drop Ids should be unique. Our drop is also suporting multiple templates and you can add any details to template which can be entertain in future e.g: price, supply etc


## Instruction of Update Drops

To update a drop, Admin need to provide drop-id and the attributes that Admin want to update e.g: start-date, end-date or templates. Drop will be updated on following situations:
1. If drop is not active (start-date is not passed), than Admin can update all details of a drop e.g: start-date, end-date and template
2. If drop is active than, Admin can only update the end-date of drop


## Instructions for Purchase Drop

To Purchase NFT with any Drop we have to give the following fields:

- dropId
- templateId
- mintNumber(Mint Number of Template)
- receiptAddress(Address which Addresswill recieve NFT)
  Only Whitelisted Address can create Drops and Purchase NFTs with Drops.

## Instructions for Purchase Drop With Flow

To Purchase NFT with any Drop using flow we have to give the following fields:

- dropId
- templateId
- mintNumber(Mint Number of Template)
- receiptAddress(Address which will recieve NFT)
- price(price of drop)
- flowPayment(flow payment vault)

## Instructions for Remove Drop

We can remove old drops using this function. Those drops date should be less then public sale date and we can't delete active drops. To delete drop we have to give the following fields:

- dropId

### Deployment Contract on Emulator

- Run `flow project deploy --network emulator`
  - All contracts are deployed to the emulator.

After the contracts have been deployed, you can run the sample transactions
to interact with the contracts. The sample transactions are meant to be used
in an automated context, so they use transaction arguments and string template
fields. These make it easier for a program to use and interact with them.
