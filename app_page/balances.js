document.addEventListener('walletInfo', (e) => {
    const { address, balance } = e.detail;

    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');

    if (addressElement && balanceElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `${balance.toFixed(2)} SOL`;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});