window.addEventListener('message', (event) => {
    console.log("Полученные данные:", event.data); // Для проверки получаемых данных

    const { address, balance } = event.data;
    
    const addressElement = document.getElementById('wallet-address');
    const balanceElement = document.getElementById('wallet-balance');
    
    if (addressElement && balanceElement) {
        addressElement.textContent = address;
        balanceElement.textContent = `${balance} SOL`;
    } else {
        console.error('Elements for displaying wallet info not found.');
    }
});