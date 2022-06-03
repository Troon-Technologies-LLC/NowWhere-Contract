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
    console.log("I am called BeforeAll -> setupTest")
    const port = flowConfig.emulatorPort;
    await emulator.start(port);
});

afterAll(async () => {
    console.log("I am called AfterAll -> setupTest")
    const port = flowConfig.emulatorPort;
    await emulator.stop();
});

beforeEach(async () => {
    console.log("I am called BeforeEach -> flowSetup")
    const basePath = path.resolve(__dirname, flowConfig.basePath);
    const port = flowConfig.emulatorPort;
    await init(basePath, { port });
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

});
