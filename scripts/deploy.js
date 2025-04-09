const hre = require("hardhat");

async function main() {
  const Transfi = await hre.ethers.getContractFactory("Transfi");
  const transfi = await Transfi.deploy(); // you can add { value: ... } here if needed

  await transfi.waitForDeployment(); // ✅ correct for Ethers v6

  console.log("✅ Transfi deployed to:", await transfi.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
