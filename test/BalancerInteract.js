const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("BalancerInteract", function () {
  let BalancerInteract;
  let balancerInteract;
  let balancerPool;
  let dai;
  let weth;
  let owner;
  let user;

  before(async function () {
    [owner, user] = await ethers.getSigners();

    BalancerInteract = await ethers.getContractFactory("BalancerInteract");
    balancerPool = "<INSERT_BALANCER_POOL_ADDRESS>";
    dai = "<INSERT_DAI_ADDRESS>";
    weth = "<INSERT_WETH_ADDRESS>";

    balancerInteract = await BalancerInteract.deploy(balancerPool, dai, weth);
    await balancerInteract.deployed();
  });

  describe("swapEthForDai", function () {
    it("should swap ETH for DAI", async function () {
      const daiAmount = ethers.utils.parseUnits("1000", 18);
      const price = await balancerInteract.getSpotPrice();

      const wethAmount = price.mul(daiAmount).div(ethers.constants.WeiPerEther);

      await expect(() =>
        owner.sendTransaction({
          to: balancerInteract.address,
          value: wethAmount,
        })
      ).to.changeTokenBalance(dai, user, daiAmount);
    });
  });

  describe("getSpotPrice", function () {
    it("should return the spot price of WETH to DAI", async function () {
      const spotPrice = await balancerInteract.getSpotPrice();
      expect(spotPrice).to.be.gt(0);
    });
  });
});
