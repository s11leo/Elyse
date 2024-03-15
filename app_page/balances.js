// document.addEventListener('walletInfo', (e) => {
//     console.log('Событие walletInfo сработало:', e.detail);

//     const { address, balance } = e.detail;
    
//     const addressElement = document.getElementById('wallet-address');
//     const balanceElement = document.getElementById('wallet-balance');
    
//     if (addressElement && balanceElement) {
//         addressElement.textContent = address;
//         balanceElement.textContent = `${balance.toFixed(2)} SOL`;
//     } else {
//         console.error('Elements for displaying wallet info not found.');
//     }
// });

window.addEventListener('message', (event) => {
    // Проверка источника сообщения
    // if (event.origin !== "Ожидаемый домен") return;
    
    const { address, balance } = event.data;
    
    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    
    if (addressElement && balanceElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `${balance} SOL`;
    }
});