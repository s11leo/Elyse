document.querySelector('#wallet-connect .button').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected with Public Key:', response.publicKey.toString());
            const address = response.publicKey.toString();
            const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
            document.querySelector('#wallet-connect .button').textContent = formattedAddress;
            
            await getWalletInfo(publicKey);
            
        } catch (err) {
            console.error('Error connecting to Phantom wallet:', err);
        }
    } else {
        alert('Phantom wallet not found! Please install it.');
    }
});

// document.addEventListener('modalFullyLoaded', async (e) => {
//     console.log('Event modalFullyLoaded:', e.detail);
//     if(e.detail.modalId === '#modal2') { 
//         try {
//             const address = localStorage.getItem('walletAddress');
//             if (!address) {
//                 console.error('walletAddress is not found in localStorage');
//                 return;
//             }
//             console.log('address = localStorage', address);
//             setTimeout(async () => {
//                 await getTokensBalance(new solanaWeb3.PublicKey(address));
//             }, 2500);
//         } catch (err) {
//             console.error('Error connecting to Phantom wallet:', err);
//         }
//     }
// });

// async function getTokensBalance(walletAddress) {
//     try {
//         const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
//         const solBalance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
//         const solBalanceInSOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;
//         console.log('SOL Balance:', solBalanceInSOL);
        
        // const solBalanceElement = document.getElementById('#sol-balance-value');
        // if (solBalanceElement) {
        //     solBalanceElement.textContent = `${solBalanceInSOL.toFixed(2)} SOL`;
        // } else {
        //     console.log('Element #sol-balance-value not found.');
        // }
//     } catch (err) {
//         console.error('Error fetching balance:', err);
//     }
// }

// const solBalanceInSOL = await getTokensBalance(new solanaWeb3.PublicKey(address));
// console.log('SOL Balance:', solBalanceInSOL);

document.addEventListener('DOMContentLoaded', () => {
    getWalletInfo().catch(console.error);
});

async function getWalletInfo(publicKey) {
    try {
        const solBalanceInSOL = await getTokensBalance(publicKey);
        console.log('SOL Balance:', solBalanceInSOL);

        const walletEvent = new CustomEvent('walletInfo', {
            detail: {
                address: publicKey.toString(),
                balance: solBalanceInSOL
            }
        });
        document.dispatchEvent(walletEvent);
    } catch (err) {
        console.error('Error fetching wallet info:', err);
    }
}

async function getTokensBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(publicKey);
    return balance / solanaWeb3.LAMPORTS_PER_SOL;
}