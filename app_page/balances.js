document.addEventListener('walletInfo', (e) => {
    const { address, solBalance, splTokenBalances } = e.detail;

    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    const tokenBalancesElement = document.getElementById('wallet-token-balance');

    if (addressElement && balanceElement && tokenBalancesElement) {
        addressElement.textContent = address;
        balanceElement.textContent = solBalance;
        tokenBalancesElement.textContent = splTokenBalances;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});