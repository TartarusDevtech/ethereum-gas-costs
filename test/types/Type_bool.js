const ContractArtifact = artifacts.require("Type_bool");

contract("Type_bool", (accounts) => {
  let contract;

  beforeEach(async () => {
    contract = await ContractArtifact.new();
  });

  it("acceptParam(true)", async () => {
    await contract.acceptParam(true);
  });

  it("acceptParam(false)", async () => {
    await contract.acceptParam(false);
  });

  describe("with value false", () => {
    beforeEach(async () => {
      await contract.setFalse();
    });

    it("Set False", async () => {
      await contract.setFalse();
    });

    it("Set True", async () => {
      await contract.setTrue();
    });
  });

  describe("with value true", () => {
    beforeEach(async () => {
      await contract.setTrue();
    });

    it("Set False", async () => {
      await contract.setFalse();
    });

    it("Set True", async () => {
      await contract.setTrue();
    });
  });
});
