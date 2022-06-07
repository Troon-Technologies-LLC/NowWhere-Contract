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
  liza: "Liza",
  micheal: "Micheal",
  nicolas: "Nicolas",
  olivia: "Olivia",
  pamela: "Pamela",
  quinton: "Quinton",
  roman: "Roman",
  sam: "Sam",
  tom: "Tom",
  ursula: "Ursula",
  vin: "Vin",
  william: "William",
  xiumin: "Xiumin",
  yang: "Yang",
  zoe: "Zoe",
};

const contractNames = {
  fungibleToken: "FungibleToken",
  flowToken: "FlowToken",
  nonFungibleToken: "NonFungibleToken",
  nftContract: "NFTContract",
  nowWhereContract: "NowWhereContract",
};

const transactions = {
<<<<<<< HEAD
    mintFT: "mintFT",
    setupAdminAccount: "setupAdminAccount",
    addAdminAccount: "addAdminAccount",
    createBrand: "createBrand",
    createSchema: "createSchema",
    createTemplate: "createTemplate",
    createTemplateStaticData: "createTemplateStaticData",
    removeTemplate: "removeTemplate",
    createUserEmptyCollection: "createUserEmptyCollection",
    mintNFTStaticData: "mintNFTStaticData",
    transferNFT: "transferNFT"
}

const scripts = {
    getUserBalance: "getUserBalance",
    getAllBrands: "getAllBrands",
    getBrandById: "getBrandById",
    getBrandCount: "getBrandCount",
    getBrandName: "getBrandName",
    getallSchema: "getallSchema",
    getSchemaById: "getSchemaById",
    getSchemaCount: "getSchemaCount",
    getAllTemplates: "getAllTemplates",
    getTemplateById: "getTemplateById",
    getTemplateCount: "getTemplateCount",
    getAllNFTIds: "getAllNFTIds",
    getNFTDataById: "getNFTDataById",
    getNFTTemplateData: "getNFTTemplateData"
}
=======
  mintFT: "mintFT",
  setupAdminAccount: "setupAdminAccount",
  addAdminAccount: "addAdminAccount",
  createBrand: "createBrand",
  createSchema: "createSchema",
  createTemplate: "createTemplate",
  createTemplateStaticData: "createTemplateStaticData",
  createTemplateNilMutableData: "createTemplateNilMutableData",
  updateTemplateMutableStaticData: "updateTemplateMutableStaticData",
  createDropStaticData: "createDropStaticData",
  setupAccount: "setupAccount",
  purchaseDrop: "purchaseDrop",
  addOwnerVault: "addOwnerVault",
  purchaseNFTWithFlow: "purchaseNFTWithFlow",
};

const scripts = {
  getUserBalance: "getUserBalance",
  getAllBrands: "getAllBrands",
  getBrandById: "getBrandById",
  getBrandCount: "getBrandCount",
  getBrandName: "getBrandName",
  getallSchema: "getallSchema",
  getSchemaById: "getSchemaById",
  getSchemaCount: "getSchemaCount",
};
>>>>>>> 95a7ae969de85e12c7e7bca375283fcf59bd61ea

const minBalance = 0.0001;
const testingTokenAmount = 100.0;

const flowConfig = {
  emulatorPort: 8080,
  gRPCServerPort: 3569,
  restAPIPort: 8888,
  basePath: "../../..",
};

const timeoutLimit = 100000;

export {
  accountNames,
  contractNames,
  transactions,
  scripts,
  minBalance,
  testingTokenAmount,
  flowConfig,
  timeoutLimit,
};
