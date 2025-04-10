require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // ✅ this loads the .env file

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log("✅ RPC URL:", SEPOLIA_RPC_URL);
console.log("✅ Private Key:", PRIVATE_KEY);

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
