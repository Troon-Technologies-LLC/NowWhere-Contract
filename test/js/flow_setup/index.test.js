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
    console.log("I am called BeforeAll -> flowSetup")
    const port = flowConfig.emulatorPort;
    await emulator.start(port);
});

afterAll(async () => {
    console.log("I am called AfterAll -> flowSetup")
    const port = flowConfig.emulatorPort;
    await emulator.stop(port);
});

beforeEach(async () => {
    console.log("I am called BeforeEach -> flowSetup")
    const basePath = path.resolve(__dirname, flowConfig.basePath);
    const port = flowConfig.emulatorPort;
    await init(basePath, { port });
});

describe("Flow Setup", () => {
    test("Account creation", async () => {
        //creating 2 accounts
        const Alice = await getAccountAddress(accountNames.alice);
        const Bob = await getAccountAddress(accountNames.bob);

        //check if accounts are created successfully
        expect(Alice).not.toBeNull()
        expect(Bob).not.toBeNull()

    });

    test("Balace Check", async () => {
        const Alice = await getAccountAddress(accountNames.alice);

        let aliceBalance = await getFlowBalance(Alice);

        //check if balance instance is not null
        expect(aliceBalance).not.toBeNull();

        //check if balance is an array
        expect(aliceBalance instanceof Array).toBe(true)

        //check if balance is not null & expception is null
        expect(aliceBalance[0]).not.toBeNull()
        expect(aliceBalance[1]).toBeNull()

        //check if balance is equal or greater than default balance
        expect(+aliceBalance[0]).toBeGreaterThanOrEqual(minBalance)

    });

    test("Transfer Flow Tokens", async () => {
        const Alice = await getAccountAddress(accountNames.alice);

        //fetching Alice current balance
        let aliceBalanceOld = await getFlowBalance(Alice);

        //check if balance is not null & expception is null
        expect(aliceBalanceOld[0]).not.toBeNull()
        expect(aliceBalanceOld[1]).toBeNull()


        //mint flow tokens to Alice account
        await mintFlow(Alice, testingTokenAmount);

        //fetching new Alice balance
        let aliceBalanceNew = await getFlowBalance(Alice);

        //check if balance is not null & expception is null
        expect(aliceBalanceNew[0]).not.toBeNull()
        expect(aliceBalanceNew[1]).toBeNull()

        //check if old balance is less than new balance
        expect(+aliceBalanceOld[0]).toBeLessThan(+aliceBalanceNew[0])

        //check if new balance increased as expected
        expect(+aliceBalanceOld[0] + testingTokenAmount).toEqual(+aliceBalanceNew[0])

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

        //check if result instance is not null & expception is null
        expect(result[0]).not.toBeNull();
        expect(result[1]).toBeNull();

        //fetch contract address
        let contractAddress = await getContractAddress(contractName)

        //check if contract-address is same as Alice address
        expect(contractAddress).toEqual(Alice)
    });

    test("Transaction execution", async () => {
        //get mintFT transaction
        const mintTransaction = transactions.mintFT;

        //get Alice account
        const Alice = await getAccountAddress(accountNames.alice);

        //generate addressMap from import statements
        const FungibleToken = await getContractAddress(contractNames.fungibleToken, true);
        const FlowToken = await getContractAddress(contractNames.flowToken, true);

        const addressMap = {
            FungibleToken,
            FlowToken,
        };

        const code = await getTransactionCode({
            name: mintTransaction,
            addressMap,
        });

        expect(code).not.toBeNull()

        const args = [Alice, testingTokenAmount];

        //fetching Alice current balance
        const aliceBalanceOld = await getFlowBalance(Alice);

        //check if balance is not null & expception is null
        expect(aliceBalanceOld[0]).not.toBeNull()
        expect(aliceBalanceOld[1]).toBeNull()


        const txResult = await sendTransaction({
            code,
            args
        });


        expect(txResult[0]).not.toBeNull()
        expect(txResult[1]).toBeNull()

        //fetching new Alice current balance
        const aliceBalanceNew = await getFlowBalance(Alice);

        //check if balance is not null & expception is null
        expect(aliceBalanceNew[0]).not.toBeNull()
        expect(aliceBalanceNew[1]).toBeNull()


        //check if balance increased as expected
        expect(+aliceBalanceOld[0] + testingTokenAmount).toEqual(+aliceBalanceNew[0])

    });

    test("Script Execution", async () => {
        const getBalanceScript = scripts.getUserBalance
        const Alice = await getAccountAddress(accountNames.alice)

        //generate addressMap from import statements
        const FungibleToken = await getContractAddress(contractNames.fungibleToken, true);
        const FlowToken = await getContractAddress(contractNames.flowToken, true);

        const addressMap = {
            FungibleToken,
            FlowToken,
        };

        let code = await getScriptCode({
            name: getBalanceScript,
            addressMap,
        });

        const args = [Alice];

        const aliceBalance = await executeScript({
            code,
            args,
        });

        //check if balance is not null & expception is null
        expect(aliceBalance[0]).not.toBeNull()
        expect(aliceBalance[1]).toBeNull()

        //checking if balance is equal or greater 
        expect(+aliceBalance[0]).toBeGreaterThanOrEqual(minBalance)
    });


});
