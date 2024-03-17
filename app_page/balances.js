document.addEventListener('walletInfo', (e) => {
    const { address, solBalance, splTokenBalances } = e.detail;

    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    const tokenBalancesElement = document.getElementById('wallet-token-balance');

    if (addressElement && balanceElement && tokenBalancesElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `SOL Balance: ${solBalance}`;
        const tokenBalancesString = splTokenBalances.map(token => `${token.balance}`).join(', ');
        tokenBalancesElement.textContent = `Token Balances: ${tokenBalancesString}`;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});