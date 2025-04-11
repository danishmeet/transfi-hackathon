const Arweave = require('arweave');
const fs = require('fs');
const path = require('path');

// Load key
const key = JSON.parse(fs.readFileSync(path.join(__dirname, '../arweave/arweave-key.json'), 'utf-8'));

// Init Arweave
const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

// Upload function
async function uploadReceipt(receiptData) {
  const tx = await arweave.createTransaction({
    data: JSON.stringify(receiptData)
  }, key);

  tx.addTag('App-Name', 'Transfi');
  tx.addTag('Content-Type', 'application/json');

  await arweave.transactions.sign(tx, key);
  const response = await arweave.transactions.post(tx);

  console.log('✅ Uploaded to Arweave: https://arweave.net/' + tx.id);
  return tx.id;
}

// Example: run this manually
// (remove this from final if using it from frontend)
if (require.main === module) {
  uploadReceipt({
    sender: '0x123...',
    receiver: '0xabc...',
    amount: '5',
    timestamp: new Date().toISOString(),
    txHash: '0x789...'
  });
}

module.exports = { uploadReceipt };
