window.Jupiter.init({
  displayMode: "integrated",
  integratedTargetId: "integrated-terminal",
  endpoint: "https://api.devnet.solana.com",
});

window.addEventListener('message', (event) => {
  if (event.origin === window.location.origin && event.data.type === 'WALLET_CONNECTED') {
    const publicKey = event.data.publicKey;

    if (window.Jupiter) {
      window.Jupiter.syncProps({
        passthroughWalletContextState: {
          publicKey: publicKey,
          connected: true,
        }
      }).then(() => {
        console.log("Кошелек успешно синхронизирован с Jupiter Terminal.");
      }).catch((error) => {
        console.error("Ошибка синхронизации с Jupiter Terminal:", error);
      });
    }
  }
});

// document.addEventListener('walletConnected', (event) => {
//   const response = new solanaWeb3.PublicKey(address);

//   if (window.parent && window.parent.Jupiter) {
//     window.parent.Jupiter.syncProps({
//       passthroughWalletContextState: { 
//         publicKey: response.publicKey.toString(),
//         connected: true,
//       }
//     });
//   }
// });

//-------------------------------------------------

// window.addEventListener('message', (event) => {
//   if (event.origin === window.location.origin) {
//       const data = event.data;
//       if (data.type === 'WALLET_CONNECTED') {
//           if (window.Jupiter) {
//               window.Jupiter.init({
//                 displayMode: "integrated",
//                 integratedTargetId: "integrated-terminal",
//                 endpoint: "https://api.devnet.solana.com",
//               }).then(() => {
//                 window.Jupiter.syncProps({
//                   passthroughWalletContextState: { 
//                     publicKey: data.publicKey,
//                     connected: true,
//                   }
//                 });
//               });
//           }
//       }
//   }
// });
