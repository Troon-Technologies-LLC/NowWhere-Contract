import path from "path";

import {
  init,
  emulator,
  getAccountAddress,
  getFlowBalance,
  mintFlow,
  deployContract,
  getContractAddress,
  getTransactionCode,
  sendTransaction,
  executeScript,
  getScriptCode,
  deployContractByName,
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

describe("Flow For Drop", () => {
  describe("Contract Deployment", () => {
    test("NonFungibleToken Deployment", async () => {
      const contractName = contractNames.nonFungibleToken;
      const Alice = await getAccountAddress(accountNames.alice);
      let update = true;

      //deploying contract to Alice account
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

      let nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken
      );

      let addressMap = {
        nonFungibleToken,
      };
      //deploying contract to bob account
      let result = await deployContractByName({
        name: contractName,
        to: Bob,
        update,
        addressMap,
      });

      //check if balance is not null & expception is null
      expect(result[0]).not.toBeNull();
      expect(result[1]).toBeNull();

      //fetch contract address
      let contractAddress = await getContractAddress(contractName);

      expect(contractAddress).toEqual(Bob);
    });

    test("NowWhere-Contract Deployment", async () => {
      const contractName = contractNames.nowWhereContract;
      const charlie = await getAccountAddress(accountNames.charlie);
      let update = true;

      let nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken
      );

      let nftContract = await getContractAddress(contractNames.nftContract);

      let addressMap = {
        nonFungibleToken,
        nftContract,
      };
      //deploying contract to bob account
      let result = await deployContractByName({
        name: contractName,
        to: charlie,
        update,
      });

      //check if balance is not null & expception is null
      expect(result[0]).not.toBeNull();
      expect(result[1]).toBeNull();

      //fetch contract address
      let contractAddress = await getContractAddress(contractName);

      expect(contractAddress).toEqual(charlie);
    });
  });

  describe("transactions", () => {
    test("setup account", async () => {
      const setupAdminAccount = transactions.setupAdminAccount;

      // Import participating accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );

      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: setupAdminAccount,
        addressMap,
      });

      expect(code).not.toBeNull();

      const txResult = await sendTransaction({
        code,
        signers,
      });

      // check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("add admin account", async () => {
      const addAdminAccount = transactions.addAdminAccount;

      // Import participant accounts
      const Bob = await getAccountAddress(accountNames.bob);
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Bob];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: addAdminAccount,
        addressMap,
      });

      expect(code).not.toBeNull();

      // set transaction arguments
      const args = [Charlie];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("create brand", async () => {
      const createBrand = transactions.createBrand;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: createBrand,
        addressMap,
      });

      expect(code).not.toBeNull();

      // set transaction arguments
      const args = ["Honda", { name: "Alice" }];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("create schema", async () => {
      const createSchema = transactions.createSchema;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: createSchema,
        addressMap,
      });

      expect(code).not.toBeNull();

      // set transaction arguments
      const args = ["nft-series"];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("create template", async () => {
      const createTemplate = transactions.createTemplateStaticData;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: createTemplate,
        addressMap,
      });

      expect(code).not.toBeNull();

      // set transaction arguments
      const args = [1, 1, 100];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("create Drop", async () => {
      const createDrop = transactions.createDropStaticData;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );
      const nowWhereContract = await getContractAddress(
        contractNames.nowWhereContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
        nowWhereContract,
      };

      const code = await getTransactionCode({
        name: createDrop,
        addressMap,
      });

      expect(code).not.toBeNull();

      const currentTimeInSeconds = Math.floor(Date.now() / 1000); //unix timestamp in seconds
      // set transaction arguments
      const args = [1, currentTimeInSeconds, currentTimeInSeconds + 20000000.0];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("setup receiver account", async () => {
      const setupAccount = transactions.setupAccount;

      // Import participant accounts
      const Donald = await getAccountAddress(accountNames.donald);

      //set transaction singer account
      const signers = [Donald];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: setupAccount,
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

    test("add owner vault", async () => {
      const addOwnerVault = transactions.addOwnerVault;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );
      const nowWhereContract = await getContractAddress(
        contractNames.nowWhereContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
        nowWhereContract,
      };

      const code = await getTransactionCode({
        name: addOwnerVault,
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
    test("purchase Drop", async () => {
      const purchaseDrop = transactions.purchaseDrop;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);
      const Donald = await getAccountAddress(accountNames.donald);

      //set transaction singer account
      const signers = [Charlie];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );
      const nowWhereContract = await getContractAddress(
        contractNames.nowWhereContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
        nowWhereContract,
      };

      const code = await getTransactionCode({
        name: purchaseDrop,
        addressMap,
      });

      expect(code).not.toBeNull();

      // set transaction arguments
      const args = [1, 1, 1, Donald];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });

    test("setup receiver account", async () => {
      const setupAccount = transactions.setupAccount;

      // Import participant accounts
      const Emma = await getAccountAddress(accountNames.emma);

      //set transaction singer account
      const signers = [Emma];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
      };

      const code = await getTransactionCode({
        name: setupAccount,
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
    test("Transfer Flow Tokens to Emma", async () => {
      const Emma = await getAccountAddress(accountNames.emma);

      //fetching Alice current balance
      let emmaBalanceOld = await getFlowBalance(Emma);

      //check if balance is not null & expception is null
      expect(emmaBalanceOld[0]).not.toBeNull();
      expect(emmaBalanceOld[1]).toBeNull();

      //mint flow tokens to Bob account
      await mintFlow(Emma, testingTokenAmount);

      //fetching new Bob balance
      let emmaBalanceNew = await getFlowBalance(Emma);

      //check if balance is not null & expception is null
      expect(emmaBalanceNew[0]).not.toBeNull();
      expect(emmaBalanceNew[1]).toBeNull();

      //check if old balance is less than new balance
      expect(+emmaBalanceOld[0]).toBeLessThan(+emmaBalanceNew[0]);

      //check if new balance increased as expected
      expect(+emmaBalanceOld[0] + testingTokenAmount).toEqual(
        +emmaBalanceNew[0]
      );
    });
    test("purchase Drop with flow", async () => {
      const purchaseNFTWithFlow = transactions.purchaseNFTWithFlow;

      // Import participant accounts
      const Charlie = await getAccountAddress(accountNames.charlie);
      const Emma = await getAccountAddress(accountNames.emma);

      //set transaction singer account
      const signers = [Charlie, Emma];

      //generate addressMap from import statements
      const nonFungibleToken = await getContractAddress(
        contractNames.nonFungibleToken,
        true
      );
      const nftContract = await getContractAddress(
        contractNames.nftContract,
        true
      );
      const nowWhereContract = await getContractAddress(
        contractNames.nowWhereContract,
        true
      );

      const addressMap = {
        nonFungibleToken,
        nftContract,
        nowWhereContract,
      };

      const code = await getTransactionCode({
        name: purchaseNFTWithFlow,
        addressMap,
      });

      expect(code).not.toBeNull();

      const emmaBalance = await getFlowBalance(Emma);
      console.log("bob balance", emmaBalance);
      // set transaction arguments
      const args = [1, 1, 1, Emma, 10.0];

      const txResult = await sendTransaction({
        code,
        args,
        signers,
      });

      console.log("purchase drop with flow", txResult);
      //check if result instance is not null & expception is null
      expect(txResult[0]).not.toBeNull();
      expect(txResult[1]).toBeNull();
    });
  });
});
