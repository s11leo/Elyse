window.addEventListener('message', (event) => {
    // Проверяем тип сообщения
    if (event.data.type === 'walletData') {
        const { address, balance } = event.data;

        const addressElement = document.getElementById('wallet-address');
        const balanceElement = document.getElementById('wallet-balance');

        if (addressElement && balanceElement) {
            addressElement.textContent = address;
            balanceElement.textContent = `${balance} SOL`;
        } else {
            console.error('Elements for displaying wallet info not found.');
        }
    }
});
