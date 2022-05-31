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




});
