export async function handle(state, action) {
    const input = action.input;
  
    // Initialize state
    if (!state.transfers) state.transfers = [];
    if (!state.alerts) state.alerts = [];
  
    const { sender, receiver, amount, timestamp, txHash } = input;
  
    // Log the transfer
    state.transfers.push({ sender, receiver, amount, timestamp, txHash });
  
    // Rule: flag if amount > 10000
    if (parseFloat(amount) > 10000) {
      state.alerts.push({
        reason: "High amount transfer",
        sender,
        receiver,
        amount,
        timestamp,
        txHash
      });
    }
  
    return { state };
  }
  