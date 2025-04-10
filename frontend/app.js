// ✅ Your deployed Sepolia contract address
const contractAddress = "0x2A4d17b7f31d92A11A825eA8dcE44E9E68d9f201";

// ✅ ABI of the Transfi contract
const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "fiatCurrency",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "sendPayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "fiatCurrency",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

// ✅ Send payment via MetaMask
async function sendPayment() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  try {
    // ✅ Ask MetaMask to connect and return accounts
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const sender = await signer.getAddress(); // ⬅️ Authenticated sender
    console.log("🔐 Sender address:", sender);

    const contract = new ethers.Contract(contractAddress, abi, signer);

    const receiver = document.getElementById("receiver").value;
    console.log("📨 Receiver entered:", receiver);
    const amount = document.getElementById("amount").value;
    const currency = document.getElementById("currency").value;
    const message = document.getElementById("message").value;

    const tx = await contract.sendPayment(
      receiver,
      currency,
      message,
      { value: ethers.utils.parseEther(amount) }
    );

    await tx.wait();

    alert(`✅ Transaction sent from ${sender} to ${receiver}`);
  } catch (error) {
    console.error("❌ Transaction failed:", error);
    alert("❌ Payment failed. Check the console for details.");
  }
}
