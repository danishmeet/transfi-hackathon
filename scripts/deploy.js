const hre = require("hardhat");

async function main() {
  const Bridge = await hre.ethers.getContractFactory("TransfiBridge");
  const bridge = await Bridge.deploy();
  await bridge.waitForDeployment();

  console.log(`✅ TransfiBridge deployed at: ${bridge.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
