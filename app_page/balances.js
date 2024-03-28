document.addEventListener('walletInfo', (e) => {
    const { address, solBalance, splTokenBalances } = e.detail;

    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    const tokenBalancesElement = document.getElementById('wallet-token-balance');

    if (addressElement && balanceElement && tokenBalancesElement) {
        addressElement.textContent = `${address.slice(0, 4)}...${address.slice(-4)}`;
        balanceElement.textContent = `${solBalance} SOL`;
        const tokenBalancesString = splTokenBalances.map(token => `${token.balance}`).join(', ');
        tokenBalancesElement.textContent = `${tokenBalancesString} ELYSE`;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});