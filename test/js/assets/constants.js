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
  RemoveDrop: "RemoveDrop",
  updateDropStatic: "updateDropStatic",
  updateDropStaticForTemplate: "updateDropStaticForTemplate",
  removeTemplate: "removeTemplate",
  createUserEmptyCollection: "createUserEmptyCollection",
  mintNFTStaticData: "mintNFTStaticData",
  transferNFT: "transferNFT",
};

const scripts = {
  getBrandName: "getBrandName",
  getallSchema: "getallSchema",
  getSchemaById: "getSchemaById",
  getSchemaCount: "getSchemaCount",
  getSchemaCount: "getSchemaCount",
  getAllTemplates: "getAllTemplates",
  getTemplateById: "getTemplateById",
  getTemplateCount: "getTemplateCount",
  getAllNFTIds: "getAllNFTIds",
  getNFTDataById: "getNFTDataById",
  getNFTTemplateData: "getNFTTemplateData",
  getUserBalance: "getUserBalance",
  getAllBrands: "getAllBrands",
  getBrandById: "getBrandById",
  getBrandCount: "getBrandCount",
  getBrandName: "getBrandName",
  getallSchema: "getallSchema",
  getSchemaById: "getSchemaById",
  getSchemaCount: "getSchemaCount",
};

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
