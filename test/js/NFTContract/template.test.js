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

describe("Flow for Template", () => {
    test("Account Creation", async () => {
        //creating 2 accounts
        const Alice = await getAccountAddress(accountNames.alice);
        const Bob = await getAccountAddress(accountNames.bob);

        //check if accounts are created successfully
        expect(Alice).not.toBeNull()
        expect(Bob).not.toBeNull()

    });

    test("Contract Deployment", async () => {
        const contractName = contractNames.nonFungibleToken
        const Alice = await getAccountAddress(accountNames.alice)
        let update = true

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
        let contractAddress = await getContractAddress(contractName)

        expect(contractAddress).toEqual(Alice)
    });
    

    test("NFT-Contract Deployment", async () => {
        const contractName = contractNames.nftContracct
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
        const FungibleToken = await getContractAddress(contractNames.fungibleToken, true);
        const FlowToken = await getContractAddress(contractNames.flowToken, true);

        const addressMap = {
            FungibleToken,
            FlowToken,
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

    test("Creating Brand", async () => {
        const createBrand = transactions.createBrand;

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
            name: createBrand,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = ["BreakOut", {"Shoe":"ShoeZ-1"}];

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Creating Schema", async () => {
        const createSchema = transactions.createSchema;

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
            name: createSchema,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = ["firstSchema"];

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Creating first Template", async () => {
        const createTemplate = transactions.createTemplateStaticData;

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, 1, 700/*, {"artist":"Nasir And Sham"}, {"artistEmail":"sham&nasir@gmai.com"}*/];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Creating second Template", async () => {
        const createTemplate = transactions.createTemplateStaticData;

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, 1, 500/*, {"artist":"Nasir And Sham"}, {"artistEmail":"sham&nasir@gmai.com"}*/];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Removing Template", async () => {
        const removeTemplate = transactions.removeTemplate;

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
            name: removeTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1];  

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


describe("Template's script for", () => {

    test("getting all templates", async () => {
        
        const GetAllTemplates = scripts.getAllTemplates
    
        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContracct, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllTemplates,
            addressMap,
        });

        code = code
            .toString()
            .replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
            const accounts = {
                "0x01": Alice,
                "0x02": Bob,
            };
            const name = accounts[match];
            return `getAccount(${name})`;
      });

        const result = await executeScript({
            code,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
        console.log("result", result);
    });

    test("getting template by Id", async () => {
        
        const GetTemplateById = scripts.getTemplateById
    
        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContracct, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetTemplateById,
            addressMap,
        });

        code = code
            .toString()
            .replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
            const accounts = {
                "0x01": Alice,
                "0x02": Bob,
            };
            const name = accounts[match];
            return `getAccount(${name})`;
      });

        const args = [2];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
        console.log("result", result);
    });

    test("getting template count", async () => {
        
        const GetTemplateCount = scripts.getTemplateCount
    
        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContracct, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetTemplateCount,
            addressMap,
        });

        code = code
            .toString()
            .replace(/(?:getAccount\(\s*)(0x.*)(?:\s*\))/g, (_, match) => {
            const accounts = {
                "0x01": Alice,
                "0x02": Bob,
            };
            const name = accounts[match];
            return `getAccount(${name})`;
      });

        const result = await executeScript({
            code,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
        console.log("result", result);
    });

});

