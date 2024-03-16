document.addEventListener('walletInfo', (event) => {
    const { address, balance } = event.detail;
    
    // Обновление элементов на странице с полученными данными
    document.querySelector('#wallet-address').textContent = address;
    document.querySelector('#wallet-balance').textContent = `${balance} SOL`;
});