const { ethers } = require("hardhat");

async function main() {
  const BalancerInteract = await ethers.getContractFactory("BalancerInteract");
  const balancerPool = "<INSERT_BALANCER_POOL_ADDRESS>";
  const dai = "<INSERT_DAI_ADDRESS>";
  const weth = "<INSERT_WETH_ADDRESS>";

  const balancerInteract = await BalancerInteract.deploy(
    balancerPool,
    dai,
    weth
  );
  console.log("BalancerInteract deployed to:", balancerInteract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
