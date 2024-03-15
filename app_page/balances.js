document.addEventListener('walletInfo', (e) => {
    const { address, balance } = e.detail;
    
    // Найти элементы в модальном окне для отображения адреса и баланса
    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    
    // Обновление текстового содержимого элементов
    if (addressElement && balanceElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `${balance.toFixed(2)} SOL`;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});