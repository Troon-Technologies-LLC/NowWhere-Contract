## How to Deploy and Test the NFT&NowWhere Contract in VSCode

The initial step to use any smart-contract is to deploy that contract to any network e.g: mainnet, testnet or emulator.
In our case we will deploy our contract to emulator.
First you need to install vs-code extension to your VS Code, you can see [vscode extension instructions](https://docs.onflow.org/vscode-extension/) for further instructions

Once extension is installed now you need to follow bellow steps:

1.  Start the emulator with the `flow emulator` vscode command.
2.  Open the `NonFungibleToken.cdc` file from the [flow-nft repo](https://github.com/onflow/flow-nft/blob/master/contracts/NonFungibleToken.cdc), the `NFTContract.cdc` and `NowWhere.cdc` file.
3.  To deploy `NonFungibleToken.cdc` using Flow CLI, run `flow accounts add-contract NonFungibleToken ./NonFungibleToken.cdc`.
4.  To deploy `NFTContract.cdc` using Flow CLI, make sure it imports `NonFungibleToken` from
    the account you deployed it to, then run `flow accounts add-contract NFTContract ./NFTContract.cdc`.
5.  To deploy `NowWhere.cdc` using Flow CLI, make sure it imports `NonFungibleToken`, `NFTContract` from
    the account you deployed it to, then run `flow accounts add-contract NowWhere ./NowWhere.cdc`.

The above steps deploy the contract code and it will initlialize the
contract storage variables.

After the contracts have been deployed, you can run the sample transactions
to interact with the contracts. The sample transactions are meant to be used
in an automated context, so they use transaction arguments and string template
fields. These make it easier for a program to use and interact with them.
If you are running these transactions manually in the Flow Playground or
vscode extension, you will need to remove the transaction arguments and
hard code the values that they are used for.

## NFTContract Addresses

`NFTContract.cdc`: This is the main NFTContract smart contract that defines
the core functionality of the NFT.

| Network | Contract Address     |
| ------- | -------------------- |
| Testnet | `0xf93e36240366a450` |
| Mainnet | `0x1e075b24abe6eca6` |

## NowWhere Addresses

`NowWhere.cdc`: This is the main NowWhere smart contract that defines
the core functionality of the Drop.

| Network | Contract Address     |
| ------- | -------------------- |
| Testnet | `0x1673bd60de19daa6` |
| Mainnet | `0x1272fc57f20604b9` |

## Start with Flow CLI

### Creating the contract and minting a token

`flow project start-emulator`

`flow project deploy`

`flow keys generate`

## Create Brand

`flow transactions send transactions/createBrand.cdc --arg String:"test" --args-json "[{\"type\":\"String\",\"value\":\"test\"},{\"type\":\"String\",\"value\":\"abc\"}]" --network testnet --signer testnet-account`

## Create Schema

`flow transactions send transactions/createSchema.cdc --arg String:"test" --network testnet --signer testnet-account`

## Create Template

`flow transactions send transactions/createTemplate.cdc --arg UInt64:1 UInt64:1 UInt64:100 --args-json "[{\"type\":\"String\",\"value\":\"test\"},{\"type\":\"String\",\"value\":\"abc\"}]" --network testnet --signer testnet-account`

## Mint NFT

`flow transactions send transactions/mintNFT.cdc --arg UInt64:1 Address:0x01 --network testnet --signer testnet-account`

## Setup Reciver Account

`flow transactions send transactions/setupAccount.cdc --network testnet --signer testnet-account`

## Lock Template

`flow transactions send transactions/lockTemplate.cdc --arg UInt64:1 Bool:true --network testnet --signer testnet-account`
