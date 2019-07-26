const ContractArtifact = artifacts.require("Type_uint");

contract("Type_uint", accounts => {
  let contract;

  before(async () => {
    contract = await ContractArtifact.new();
  });

  it("acceptParam_uint8(0)", async () => {
    await contract.acceptParam_uint8(0);
  });

  it("acceptParam_uint8(1)", async () => {
    await contract.acceptParam_uint8(1);
  });

  it("acceptParam_uint8(max)", async () => {
    await contract.acceptParam_uint8(255);
  });
  
  it("acceptParam_uint256(0)", async () => {
    await contract.acceptParam_uint256(0);
  });

  it("acceptParam_uint256(1)", async () => {
    await contract.acceptParam_uint256(1);
  });

  it("acceptParam_uint256(max_uint8)", async () => {
    await contract.acceptParam_uint256(255);
  });

  it("acceptParam_uint256(max)", async () => {
    await contract.acceptParam_uint256(-1);
  });

  it("increment_uint8 from 0", async () => {
    await contract.increment_uint8();
  })

  it("increment_uint8 from 1", async () => {
    await contract.increment_uint8();
  })  

  it("increment_uint256 from 0", async () => {
    await contract.increment_uint256();
  })

  it("increment_uint256 from 1", async () => {
    await contract.increment_uint256();
  })  
});