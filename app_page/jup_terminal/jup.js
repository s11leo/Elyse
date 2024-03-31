// document.addEventListener('DOMContentLoaded', () => {
//   initializeJupiter();
// });

// function initializeJupiter() {
//   window.Jupiter.init({
//       enableWalletPassthrough: true,
//   }).then(() => {
//       console.log("Jupiter Terminal is initialized.");
//       syncWallet();
//   }).catch((error) => {
//       console.error("Error initializing Jupiter Terminal:", error);
//   });
// }

// function syncWallet() {
//   const address = localStorage.getItem('walletAddress');
//   if (!address || !window.Jupiter || !window.Jupiter.syncProps) {
//       console.log("Wallet is not connected or Jupiter is not ready.");
//       return;
//   }
  
//   const passthroughWalletContextState = {
//       publicKey: address,
//       connected: true,
//   };
  
//   window.Jupiter.syncProps({ passthroughWalletContextState });
// }

window.Jupiter.init({
  displayMode: "integrated",
  integratedTargetId: "integrated-terminal",
  endpoint: "https://api.devnet.solana.com",
});