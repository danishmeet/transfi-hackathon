const hre = require("hardhat");

async function main() {
  const [sender, receiver] = await hre.ethers.getSigners();

  const Transfi = await hre.ethers.getContractFactory("Transfi");
  const transfi = await Transfi.deploy(); // Automatically deploys in Ethers v6+
  console.log(`🔗 Contract deployed at: ${transfi.target}`);

  console.log(`💸 Sending 1 ETH from ${sender.address} to ${receiver.address}`);

  const tx = await transfi.connect(sender).sendPayment(
    receiver.address,
    "USD",
    "Test transfer",
    { value: hre.ethers.parseEther("0.001") }
  );

  await tx.wait();

  const balance = await hre.ethers.provider.getBalance(receiver.address);
  console.log(`✅ Receiver balance: ${hre.ethers.formatEther(balance)} ETH`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
