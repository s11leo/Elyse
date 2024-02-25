async function connectWallet() {
  /* Connect to Solana network: */
  let network_url = await SOLPay.connectNetwork("https://api.testnet.solana.com", "confirmed");
  console.log(network_url); // "https://solana-api.projectserum.com"
  
  /* Connect to user wallet: */
  let wallet = await SOLPay.connectWallet(SOLPay.adapters.PHANTOM);
  console.log(wallet.address); // the address of the connected wallet
}

async function buyItem() {
  let address = "SELLER_ADDRESS_HERE" // replace with the Solana address of the seller
  let lamports = 10000;
  let payment_details = await SOLPay.sendSolanaLamports(address, lamports);
  // IMPORTANT: Send payment_details.signature to the backend for verification
  let raw_result = await fetch("/verify.php?txid=" + encodeURIComponent(payment_details.signature));
  let parsed_result = await raw_result.json();
  // Use parsed_result to either return success message or error message to user
}