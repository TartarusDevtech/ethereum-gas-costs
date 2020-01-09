const ContractArtifact = artifacts.require("Type_mapOfMap");

contract("Type_mapOfMap", accounts => {
  let contract;

  before(async () => {
    contract = await ContractArtifact.new();
  });

  it("1st write", async () => {
    await contract.write(1, 1);
  });

  it("2nd write", async () => {
    await contract.write(1, 1);
  });

  it("3rd write", async () => {
    await contract.write(1, 1);
  });

  it("testReadCost 0", async () => {
    await contract.testReadCost(0, 0);
  });

  it("testReadCost 1", async () => {
    await contract.testReadCost(1, 1);
  });

  it("testCountCost", async () => {
    await contract.testCountCost();
  });
});
