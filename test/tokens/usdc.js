const { tokens, constants } = require("hardlydifficult-eth");
const BigNumber = require("bignumber.js");

let minEstimate = new BigNumber(constants.MAX_UINT);
let maxEstimate = new BigNumber(0);
let minUsed = new BigNumber(constants.MAX_UINT);
let maxUsed = new BigNumber(0);
let minDelta = new BigNumber(constants.MAX_UINT);
let maxDelta = new BigNumber(0);

async function estimate(tx, options) {
  const gas = await tx.estimateGas(options);
  if (minEstimate.isGreaterThan(gas)) {
    minEstimate = new BigNumber(gas);
  }
  if (maxEstimate.isLessThan(gas)) {
    maxEstimate = new BigNumber(gas);
  }
  options.gas = gas;

  const result = await tx.send(options);
  if (minUsed.isGreaterThan(result.gasUsed)) {
    minUsed = new BigNumber(result.gasUsed);
  }
  if (maxUsed.isLessThan(result.gasUsed)) {
    maxUsed = new BigNumber(result.gasUsed);
  }

  const delta = new BigNumber(gas).minus(result.gasUsed);
  if (minDelta.isGreaterThan(delta)) {
    minDelta = new BigNumber(delta);
  }
  if (maxDelta.isLessThan(delta)) {
    maxDelta = new BigNumber(delta);
  }

  console.log(
    `estimateGas == ${gas}; gasUsed == ${
      result.gasUsed
    }; delta == ${delta.toFormat()}`
  );
}

contract("USDC", (accounts) => {
  const [
    tokenOwner,
    proxyOwner,
    richAccount,
    poorAccount,
    otherAccount,
  ] = accounts;
  let usdc;

  beforeEach(async () => {
    usdc = await tokens.usdc.deploy(web3, proxyOwner, tokenOwner);
    await usdc.mint(
      richAccount,
      "11579208923731619542357098500868790785326998466564056403945758400791312963993",
      { from: tokenOwner }
    );
    await usdc.mint(poorAccount, "10", { from: tokenOwner });
  });

  after(async () => {
    console.log(
      `minEstimate: ${minEstimate.toFormat()}; maxEstimate: ${maxEstimate.toFormat()}; minUsed: ${minUsed.toFormat()}; maxUsed: ${maxUsed.toFormat()}; minDelta: ${minDelta.toFormat()}; maxDelta: ${maxDelta.toFormat()}`
    );
  });

  it("poor account partial transfer to fresh account", async () => {
    await estimate(usdc.contract.methods.transfer(otherAccount, 1), {
      from: poorAccount,
    });
  });

  it("poor account full transfer to fresh account", async () => {
    await estimate(
      usdc.contract.methods.transfer(
        otherAccount,
        (await usdc.balanceOf(poorAccount)).toString()
      ),
      {
        from: poorAccount,
      }
    );
  });

  it("rich account partial transfer to fresh account", async () => {
    await estimate(usdc.contract.methods.transfer(otherAccount, 1), {
      from: richAccount,
    });
  });

  it("rich account full transfer to fresh account", async () => {
    await estimate(
      usdc.contract.methods.transfer(
        otherAccount,
        (await usdc.balanceOf(richAccount)).toString()
      ),
      {
        from: richAccount,
      }
    );
  });

  describe("when the destination is not a fresh account", () => {
    beforeEach(async () => {
      await usdc.mint(otherAccount, "10", { from: tokenOwner });
    });

    it("poor account partial transfer to existing account", async () => {
      await estimate(usdc.contract.methods.transfer(otherAccount, 1), {
        from: poorAccount,
      });
    });

    it("poor account full transfer to existing account", async () => {
      await estimate(
        usdc.contract.methods.transfer(
          otherAccount,
          (await usdc.balanceOf(poorAccount)).toString()
        ),
        {
          from: poorAccount,
        }
      );
    });

    it("rich account partial transfer to existing account", async () => {
      await estimate(usdc.contract.methods.transfer(otherAccount, 1), {
        from: richAccount,
      });
    });

    it("rich account full transfer to existing account", async () => {
      await estimate(
        usdc.contract.methods.transfer(
          otherAccount,
          (await usdc.balanceOf(richAccount)).toString()
        ),
        {
          from: richAccount,
        }
      );
    });
  });
});
