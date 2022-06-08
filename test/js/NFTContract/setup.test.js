import path from "path";
import {
    init,
    emulator,
    getAccountAddress,
    deployContractByName,
    getContractAddress,
    getTransactionCode,
    sendTransaction,

} from "flow-js-testing";
import { expect } from "@jest/globals";

import {
    accountNames,
    contractNames,
    transactions,
    flowConfig,
    timeoutLimit,
} from '../assets/constants';


jest.setTimeout(timeoutLimit);

beforeAll(async () => {
    const port = flowConfig.emulatorPort;
    await emulator.start(port);
});

afterAll(async () => {
    const port = flowConfig.emulatorPort;
    await emulator.stop(port);
});

beforeEach(async () => {
    const basePath = path.resolve(__dirname, flowConfig.basePath);
    const port = flowConfig.emulatorPort;
    await init(basePath, { port });
});

describe(`${contractNames.nftContract} Setup`, () => {
    test("Account creation", async () => {
        //creating accounts
        const Alice = await getAccountAddress(accountNames.alice);
        const Bob = await getAccountAddress(accountNames.bob);
        const Charlie = await getAccountAddress(accountNames.charlie);

        //check if accounts are created successfully
        expect(Alice).not.toBeNull()
        expect(Bob).not.toBeNull()
        expect(Charlie).not.toBeNull()
    });

    test("Contract Deployment", async () => {
        const contractName = contractNames.nonFungibleToken;
        const Alice = await getAccountAddress(accountNames.alice);
        let update = true;
    
        //deploying contract to Alice accouont
        let result = await deployContractByName({
          name: contractName,
          to: Alice,
          update,
        });
    
        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull();
        expect(result[1]).toBeNull();
    
        //fetch contract address
        let contractAddress = await getContractAddress(contractName);
    
        expect(contractAddress).toEqual(Alice);
      });
    
      test("NFT-Contract Deployment", async () => {
        const contractName = contractNames.nftContract;
        const Bob = await getAccountAddress(accountNames.bob);
        let update = true;
    
        const NonFungibleToken = await getContractAddress(
          contractNames.nonFungibleToken
        );
        const addressMap = {
          NonFungibleToken,
        };
    
        //deploying contract to Bob accouont
        let result = await deployContractByName({
          name: contractName,
          to: Bob,
          update,
          addressMap,
        });
    
        //check if result instance is not null & expception is null
        expect(result[0]).not.toBeNull();
        expect(result[1]).toBeNull();
    
        //fetch contract address
        let contractAddress = await getContractAddress(contractName);
    
        expect(contractAddress).toEqual(Bob);
      });

    test("Admin Account Setup", async () => {
        const setupAdminTransaction = transactions.setupAdminAccount;

        // Create new account for Admin
        const Charlie = await getAccountAddress(accountNames.charlie)

        // Set transaction signers
        const signers = [Charlie];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);

        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: setupAdminTransaction,
            addressMap,
        });

        expect(code).not.toBeNull()

        const txResult = await sendTransaction({
            code,
            signers
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()


        //Need to check if setup-admin transaction done its job or not ?
    });

    test("Adding Admin Account", async () => {
        const addAdminTransaction = transactions.addAdminAccount;

        // Import participating accounts
        const Bob = await getAccountAddress(accountNames.bob)
        const Charlie = await getAccountAddress(accountNames.charlie)

        // Set transaction signers
        const signers = [Bob];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);

        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: addAdminTransaction,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [Charlie];

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Negative TestCase => Adding incorrect Admin Account", async () => {
        const addAdminTransaction = transactions.addAdminAccount;

        // Import participating accounts
        const Bob = await getAccountAddress(accountNames.bob);
        const Donald = await getAccountAddress(accountNames.donald);

        // Set transaction signers
        const signers = [Bob];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(
            contractNames.nftContract,
            true
        );
        const NonFungibleToken = await getContractAddress(
            contractNames.nonFungibleToken,
            true
        );

        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };
        const code = await getTransactionCode({
            name: addAdminTransaction,
            addressMap,
        });

        expect(code).not.toBeNull();

        const args = [Donald];

        const txResult = await sendTransaction({
            code,
            signers,
            args,
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull();
        expect(txResult[0]).toBeNull();
      });

      test("Negative TestCase => Adding Admin Account via incorrect super Admin", async () => {
        const addAdminTransaction = transactions.addAdminAccount;
    
        // Import participating accounts
        const Bob = await getAccountAddress(accountNames.bob);
        const Charlie = await getAccountAddress(accountNames.charlie);
    
        // Set transaction signers
        const signers = [Charlie];
    
        //generate addressMap from import statements
        const NFTContract = await getContractAddress(
          contractNames.nftContract,
          true
        );
        const NonFungibleToken = await getContractAddress(
          contractNames.nonFungibleToken,
          true
        );
    
        const addressMap = {
          NFTContract,
          NonFungibleToken,
        };
        const code = await getTransactionCode({
          name: addAdminTransaction,
          addressMap,
        });
    
        expect(code).not.toBeNull();
    
        const args = [Bob];
    
        const txResult = await sendTransaction({
          code,
          signers,
          args,
        });
    
        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull();
        expect(txResult[0]).toBeNull();
      });

});


