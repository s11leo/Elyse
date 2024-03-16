document.addEventListener('walletInfo', (e) => {
    const { address, balance, tokenBalances } = e.detail;

    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    const tokenBalancesElement = document.getElementById('wallet-token-balance');

    if (addressElement && balanceElement && tokenBalancesElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `${balance.toFixed(2)} SOL`;
        tokenBalancesElement.textContent = tokenBalances;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});