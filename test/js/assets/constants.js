const accountNames = {
    alice: "Alice",
    bob: "Bob",
    charlie: "Charlie",
    donald: "Donald",
    emma: "Emma",
    frank: "Frank",
    george: "George",
    harry: "Harry",
    ian: "Ian",
    john: "John",
    keanu: "Keanu",

}

const contractNames = {
    fungibleToken: "FungibleToken",
    flowToken: "FlowToken",
    nonFungibleToken: "NonFungibleToken",
    nftContracct: "NFTContract"
}

const transactions = {
    mintFT: "mintFT",
}

const scripts = {
    getUserBalance: "getUserBalance"
}

const minBalance = 0.0001
const testingTokenAmount = 100.0

const flowConfig = {
    emulatorPort: 8080,
    gRPCServerPort: 3569,
    restAPIPort: 8888,
    basePath:"../.."

}

const timeoutLimit = 100000

export {
    accountNames,
    contractNames,
    transactions,
    scripts,
    minBalance,
    testingTokenAmount,
    flowConfig,
    timeoutLimit
}

