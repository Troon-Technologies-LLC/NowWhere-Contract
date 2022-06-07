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

beforeEach(async () => {
    const basePath = path.resolve(__dirname, flowConfig.basePath);
    const port = flowConfig.emulatorPort;
    await init(basePath, { port });
  });

describe("Flow for NFTs", () => {
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

    test("Creating Brand", async () => {
        const createBrand = transactions.createBrand;

        // Import participating accounts
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
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
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

    test("Creating Template", async () => {
        const createTemplate = transactions.createTemplateStaticData;

        // Import participating accounts
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


    test("Creating first user's empty collection", async () => {
        const createUserEmptyCollection = transactions.createUserEmptyCollection;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)

        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const FungibleToken = await getContractAddress(contractNames.fungibleToken, true);
        const FlowToken = await getContractAddress(contractNames.flowToken, true);

        const addressMap = {
            FungibleToken,
            FlowToken,
        };

        const code = await getTransactionCode({
            name: createUserEmptyCollection,
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

    test("Creating second user's empty collection", async () => {
        const createUserEmptyCollection = transactions.createUserEmptyCollection;

        // Import participating accounts
        const Emma = await getAccountAddress(accountNames.emma)

        // Set transaction signers
        const signers = [Emma];

        //generate addressMap from import statements
        const FungibleToken = await getContractAddress(contractNames.fungibleToken, true);
        const FlowToken = await getContractAddress(contractNames.flowToken, true);

        const addressMap = {
            FungibleToken,
            FlowToken,
        };

        const code = await getTransactionCode({
            name: createUserEmptyCollection,
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


    test("Minting NFT", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)
        const Donald = await getAccountAddress(accountNames.donald)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, Donald];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("Minting NFT", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)
        const Donald = await getAccountAddress(accountNames.donald)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, Donald];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });


    test("Minting NFT", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)
        const Donald = await getAccountAddress(accountNames.donald)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, Donald];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("getting all NFTs of an account", async () => {
        
        const GetAllNFTIds = scripts.getAllNFTIds

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Donald];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });


    test("Minting NFT by invalid signer", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Bob = await getAccountAddress(accountNames.bob)
        const Donald = await getAccountAddress(accountNames.donald)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, Donald];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("Minting NFT with invalid template Id", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)
        const Donald = await getAccountAddress(accountNames.donald)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [6, Donald];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("Minting NFT for user with no collection", async () => {
        const createTemplate = transactions.mintNFTStaticData;

        // Import participating accounts
        const Charlie = await getAccountAddress(accountNames.charlie)
        const Harry = await getAccountAddress(accountNames.harry)

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
            name: createTemplate,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [1, Harry];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });


    test("Transfering NFT", async () => {

        const transferNFT = transactions.transferNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
        const Emma = await getAccountAddress(accountNames.emma)

        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: transferNFT,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [Emma, 1];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("getting all NFTs of an account", async () => {
        
        const GetAllNFTIds = scripts.getAllNFTIds

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Donald];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });

    test("getting all NFTs of an account", async () => {
        
        const GetAllNFTIds = scripts.getAllNFTIds

        // Import participating accounts
        const Emma = await getAccountAddress(accountNames.emma)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Emma];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });


    test("Transfering nonexistent NFT", async () => {

        const transferNFT = transactions.transferNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
        const Emma = await getAccountAddress(accountNames.emma)

        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: transferNFT,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [Emma, 6];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("Transfering NFT to user with no collection", async () => {

        const transferNFT = transactions.transferNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
        const Ian = await getAccountAddress(accountNames.ian)

        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: transferNFT,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [Ian, 6];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("Destroying NFT", async () => {

        const destroyNFT = transactions.destroyNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
    
        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: destroyNFT,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [2];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

    });

    test("getting all NFTs of an account", async () => {
        
        const GetAllNFTIds = scripts.getAllNFTIds

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Donald];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });


    test("Destroying non existent NFT", async () => {

        const destroyNFT = transactions.destroyNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
    
        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: destroyNFT,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [6];  

        const txResult = await sendTransaction({
            code,
            signers,
            args
        });

        //check if result instance is not null & expception is null
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("Destroying an unowned NFT", async () => {

        const destroyNFT = transactions.destroyNFT;

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)
    
        // Set transaction signers
        const signers = [Donald];

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        const code = await getTransactionCode({
            name: destroyNFT,
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
        expect(txResult[1]).not.toBeNull()
        expect(txResult[0]).toBeNull()

    });

    test("getting NFTs of user with no collection", async () => {
        
        const GetAllNFTIds = scripts.getAllNFTIds

        // Import participating accounts
        const John = await getAccountAddress(accountNames.john)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [John];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[1]).not.toBeNull()
        expect(result[0]).toBeNull()
    });

    test("getting NFT data", async () => {
        
        const GetNFTDataById = scripts.getNFTDataById

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetNFTDataById,
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

      const args = [1];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });

    test("getting NFT data of destroyed NFT", async () => {
        
        const GetNFTDataById = scripts.getNFTDataById

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetNFTDataById,
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
    });

    test("getting NFT data", async () => {
        
        const GetNFTDataById = scripts.getNFTDataById

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetNFTDataById,
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

      const args = [3];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });

    test("getting data of nonexistent NFT", async () => {
        
        const GetNFTDataById = scripts.getNFTDataById

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetNFTDataById,
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

      const args = [6];

        const result = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(result[1]).not.toBeNull()
        expect(result[0]).toBeNull()
    });

    test("getting NFT template data", async () => {
        
        const GetAllNFTIds = scripts.getNFTTemplateData

        // Import participating accounts
        const Donald = await getAccountAddress(accountNames.donald)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Donald];

        const result = await executeScript({
            code,
            args,
        });

    
        //check if balance is not null & expception is null
        expect(result[0]).not.toBeNull()
        expect(result[1]).toBeNull()
    });

    test("getting NFT template data of user with no collection", async () => {
        
        const GetAllNFTIds = scripts.getNFTTemplateData

        // Import participating accounts
        const Keanu = await getAccountAddress(accountNames.keanu)

        //generate addressMap from import statements
        const NFTContract = await getContractAddress(contractNames.nftContract, true);
        const NonFungibleToken = await getContractAddress(contractNames.nonFungibleToken, true);
 
        const addressMap = {
            NFTContract,
            NonFungibleToken,
        };

        let code = await getScriptCode({
            name: GetAllNFTIds,
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

      const args = [Keanu];

        const result = await executeScript({
            code,
            args,
        });

    
        //check if balance is not null & expception is null
        expect(result[1]).not.toBeNull()
        expect(result[0]).toBeNull()
    });


});

