document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('walletInfo', (event) => {
        const { address, balance } = event.detail;
        document.querySelector('#wallet-address').textContent = address;
        document.querySelector('#wallet-balance').textContent = `${balance} SOL`;
    });
});