const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
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

async function sendPayment() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, abi, signer);

  const receiver = document.getElementById("receiver").value;
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
  alert("✅ Transaction successful!");
}
