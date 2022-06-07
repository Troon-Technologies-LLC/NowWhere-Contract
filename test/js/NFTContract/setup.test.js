import path from "path";
import {
    init,
    emulator,
    getAccountAddress,
    getFlowBalance,
    mintFlow,
    deployContractByName,
    getContractAddress,
    getTransactionCode,
    sendTransaction,
    getScriptCode,
    executeScript

} from "flow-js-testing";
import { expect } from "@jest/globals";

import {
    accountNames,
    contractNames,
    transactions,
    scripts,
    flowConfig,
    timeoutLimit,
    minBalance,
    testingTokenAmount
} from '../assets/constants';


jest.setTimeout(timeoutLimit);

beforeAll(async () => {
    const basePath = path.resolve(__dirname, flowConfig.basePath);
    const port = flowConfig.emulatorPort;

    await init(basePath, { port });
    await emulator.start(port);
});

afterAll(async () => {
    const port = flowConfig.emulatorPort;
    await emulator.stop(port);
});

describe("NFT Contract Setup", () => {
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

    test("Non-Fungible-Contract Deployment", async () => {
        const contractName = contractNames.nonFungibleToken
        const Alice = await getAccountAddress(accountNames.alice)
        let update = true

        //deploying contract to Alice accouont
        let result = await deployContractByName({
            name: contractName,
            to: Alice,
            update,
        });

        //check if result instance is not null & expception is null
        expect(result[0]).not.toBeNull();
        expect(result[1]).toBeNull();

        //fetch contract address
        let contractAddress = await getContractAddress(contractName)

        expect(contractAddress).toEqual(Alice)
    });

    test("NFT-Contract Deployment", async () => {
        const contractName = contractNames.nftContract
        const Bob = await getAccountAddress(accountNames.bob)
        let update = true

        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken);
        const addressMap = {
            NonFungibleToken,
        };

        //deploying contract to Bob accouont
        let result = await deployContractByName({
            name: contractName,
            to: Bob,
            update,
            addressMap
        });

        //check if result instance is not null & expception is null
        expect(result[0]).not.toBeNull();
        expect(result[1]).toBeNull();

        //fetch contract address
        let contractAddress = await getContractAddress(contractName)

        expect(contractAddress).toEqual(Bob)
    });

    test("Setting Up Admin Account", async () => {
        const setupAdminTransaction = transactions.setupAdminAccount;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)

        // Set transaction signers
        const signers = [Charlie];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContracct, true);
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
    });

    test("Adding Admin Account", async () => {
        const addAdminTransaction = transactions.addAdminAccount;

        // Import participating accounts
        const Bob = await getAccountAddress(accountNames.bob)
        const Charlie = await getAccountAddress(accountNames.charlie)

        // Set transaction signers
        const signers = [Bob];

         //generate addressMap from import statements
         const NFTContract = await getContractAddress(contractNames.nftContracct, true);
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
});
