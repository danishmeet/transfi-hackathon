const contractAddress = "0x2A4d17b7f31d92A11A825eA8dcE44E9E68d9f201"; // Your deployed TransfiBridge contract

const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "receiver", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "TransferInitiated",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "tokenAddress", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "transferStablecoin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

document.getElementById("connectButton").onclick = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      const address = await signer.getAddress();
      document.getElementById("status").innerText = `✅ Wallet connected: ${address.slice(0, 6)}...${address.slice(-4)}`;
    } catch (error) {
      console.error("Connection error:", error);
      document.getElementById("status").innerText = "❌ Wallet connection failed";
    }
  } else {
    alert("🦊 Please install MetaMask");
  }
};

document.getElementById("sendButton").onclick = async () => {
  const receiver = document.getElementById("receiver").value.trim();
  const amount = document.getElementById("amount").value.trim();

  const usdcAddress = receiver; // Mock USDC token on Sepolia

  const tokenABI = [
    {
      "inputs": [
        { "internalType": "address", "name": "spender", "type": "address" },
        { "internalType": "uint256", "name": "amount", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  if (!contract) {
    alert("Please connect your wallet first!");
    return;
  }

  if (!ethers.isAddress(receiver)) {
    alert("❌ Invalid receiver address");
    return;
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    alert("❌ Enter a valid amount");
    return;
  }

  try {
    const tokenContract = new ethers.Contract(usdcAddress, tokenABI, signer);
    const approveTx = await tokenContract.approve(contractAddress, ethers.parseUnits(amount, 18));
    await approveTx.wait();

    const tx = await contract.transferStablecoin(
      usdcAddress,
      receiver,
      ethers.parseUnits(amount, 18)
    );

    document.getElementById("status").innerText = "⏳ Transaction sent. Waiting for confirmation...";
    await tx.wait();
    document.getElementById("status").innerText = "✅ Stablecoin transferred successfully!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Error sending stablecoin";
  }
};
