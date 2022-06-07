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
  executeScript,
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
  testingTokenAmount,
} from "../assets/constants";

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

describe("NFT Brand", () => {
  test("Account Creation", async () => {
    //creating 2 accounts
    const Alice = await getAccountAddress(accountNames.alice);
    const Bob = await getAccountAddress(accountNames.bob);

    //check if accounts are created successfully
    expect(Alice).not.toBeNull()
    expect(Bob).not.toBeNull()

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

  test("Setting Up Admin Account", async () => {
    const setupAdminTransaction = transactions.setupAdminAccount;

    // Import participating accounts
    const Charlie = await getAccountAddress(accountNames.charlie);

    // Set transaction signers
    const signers = [Charlie];

    //generate addressMap from import statements
    const FungibleToken = await getContractAddress(
      contractNames.fungibleToken,
      true
    );
    const FlowToken = await getContractAddress(contractNames.flowToken, true);

    const addressMap = {
      FungibleToken,
      FlowToken,
    };

    const code = await getTransactionCode({
      name: setupAdminTransaction,
      addressMap,
    });

    expect(code).not.toBeNull();

    const txResult = await sendTransaction({
      code,
      signers,
    });

    //check if result instance is not null & expception is null
    expect(txResult[0]).not.toBeNull();
    expect(txResult[1]).toBeNull();
  });

  test("Adding Admin Account", async () => {
    const addAdminTransaction = transactions.addAdminAccount;

    // Import participating accounts
    const Bob = await getAccountAddress(accountNames.bob);
    const Charlie = await getAccountAddress(accountNames.charlie);

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

    const args = [Charlie];

    const txResult = await sendTransaction({
      code,
      signers,
      args,
    });

    //check if result instance is not null & expception is null
    expect(txResult[0]).not.toBeNull();
    expect(txResult[1]).toBeNull();
  });

  test("Adding Admin Account via incorrect super Admin", async () => {
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

  test("Creating Brand", async () => {
    const createBrand = transactions.createBrand;

    // Import participating accounts
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
      name: createBrand,
      addressMap,
    });

    expect(code).not.toBeNull();

    const args = ["BreakOut", { Shoe: "ShoeZ-1" }];

    const txResult = await sendTransaction({
      code,
      signers,
      args,
    });

    //check if result instance is not null & expception is null
    expect(txResult[0]).not.toBeNull();
    expect(txResult[1]).toBeNull();
  });

  test("Creating Brand by incorect data", async () => {
    const createBrand = transactions.createBrand;

    // Import participating accounts
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
      name: createBrand,
      addressMap,
    });

    expect(code).not.toBeNull();

    const args = [5, { Shoe: "ShoeZ-1" }];

    const txResult = await sendTransaction({
      code,
      signers,
      args,
    });

    //check if result instance is not null & expception is null
    expect(txResult[1]).not.toBeNull();
    expect(txResult[0]).toBeNull();
  });

  test("Creating Brand by incorect signer", async () => {
    const createBrand = transactions.createBrand;

    // Import participating accounts
    const Bob = await getAccountAddress(accountNames.bob);

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
      name: createBrand,
      addressMap,
    });

    expect(code).not.toBeNull();

    const args = ["Breakout", { Shoe: "ShoeZ-1" }];

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

describe("Brand's script for", () => {
  test("getting all brands", async () => {
    const GetAllBrands = scripts.getAllBrands;

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

    let code = await getScriptCode({
      name: GetAllBrands,
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
    expect(result[0]).not.toBeNull();
    expect(result[1]).toBeNull();
  });


  test("getting brand by Id", async () => {
    const GetBrandById = scripts.getBrandById;

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

    let code = await getScriptCode({
      name: GetBrandById,
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
    expect(result[0]).not.toBeNull();
    expect(result[1]).toBeNull();
  });

  test("getting brand by an invalid Id", async () => {
    const GetBrandById = scripts.getBrandById;

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

    let code = await getScriptCode({
      name: GetBrandById,
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
    expect(result[1]).not.toBeNull();
    expect(result[0]).toBeNull();
  });

  test("getting brand name", async () => {
    const GetBrandName = scripts.getBrandName;

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

    let code = await getScriptCode({
      name: GetBrandName,
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
    expect(result[0]).not.toBeNull();
    expect(result[1]).toBeNull();
  });

  test("getting brand name at invalid Id", async () => {
    const GetBrandName = scripts.getBrandName;

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

    let code = await getScriptCode({
      name: GetBrandName,
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
    expect(result[1]).not.toBeNull();
    expect(result[0]).toBeNull();
  });

  test("getting brands count", async () => {
    const GetBrandCount = scripts.getBrandCount;

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

    let code = await getScriptCode({
      name: GetBrandCount,
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
    expect(result[0]).not.toBeNull();
    expect(result[1]).toBeNull();
  });
});
