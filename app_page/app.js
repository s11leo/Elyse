// let walletData = null;

// document.querySelector('#wallet-connect .button').addEventListener('click', async () => {
//     if (window.solana && window.solana.isPhantom) {
//         try {
//             const response = await window.solana.connect({ onlyIfTrusted: false });
//             const publicKey = new solanaWeb3.PublicKey(response.publicKey.toString());
//             console.log('Connected with Public Key:', response.publicKey.toString());
//             const address = response.publicKey.toString();
//             const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
//             document.querySelector('#wallet-connect .button').textContent = formattedAddress;
            
//             await getWalletInfo(publicKey);
            
//         } catch (err) {
//             console.error('Error connecting to Phantom wallet:', err);
//         }
//     } else {
//         alert('Phantom wallet not found! Please install it.');
//     }
// });


// async function getWalletInfo(publicKey) {
//     try {
//         const solBalanceInSOL = await getTokensBalance(publicKey);
//         console.log('SOL Balance:', solBalanceInSOL);
        
//         // Обновляем баланс в сохраненных данных
//         if (walletData) {
//             walletData.balance = solBalanceInSOL.toFixed(2);
//         }

//         // Здесь не отправляем данные, ожидаем активации модального окна
//     } catch (err) {
//         console.error('Error fetching wallet info:', err);
//     }
// }

// async function getTokensBalance(publicKey) {
//     const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
//     const balance = await connection.getBalance(publicKey);
//     return balance / solanaWeb3.LAMPORTS_PER_SOL;
// }

// document.addEventListener('modalFullyLoaded', async (e) => {
//     if (e.detail.modalId === '#modal2' && walletData) {
//         // Передача сохраненных данных о кошельке в модальное окно через postMessage
//         const modalIframe = document.getElementById('modal2');
//         if (modalIframe && modalIframe.contentWindow) {
//             console.log("Отправляемые данные:", walletData);
//             modalIframe.contentWindow.postMessage(walletData, '*');
//         } else {
//             console.error('Modal iframe not found');
//         }
//     }
// });

window.walletData = {};

document.querySelector('#wallet-connect .button').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected with Public Key:', response.publicKey.toString());
            const publicKey = new solanaWeb3.PublicKey(response.publicKey.toString());
            const address = response.publicKey.toString();
            const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
            document.querySelector('#wallet-connect .button').textContent = formattedAddress;

            // Получаем баланс кошелька
            const solBalanceInSOL = await getTokensBalance(publicKey);
            console.log('SOL Balance:', solBalanceInSOL);

            const walletEvent = new CustomEvent('walletInfo', {
                detail: {
                    address: publicKey.toString(),
                    balance: solBalanceInSOL.toFixed(2)
                }
            });
            document.dispatchEvent(walletEvent);
        }
        
        catch (err) {
            console.error('Error connecting to Phantom wallet:', err);
        }

    }
    
    else {
        alert('Phantom wallet not found! Please install it.');
    }
});

async function getWalletInfo(publicKey) {
    try {
        const solBalanceInSOL = await getTokensBalance(publicKey);
        console.log('SOL Balance:', solBalanceInSOL);

        // Обновляем баланс в глобальных данных о кошельке
        window.walletData.balance = solBalanceInSOL.toFixed(2);
    } catch (err) {
        console.error('Error fetching wallet info:', err);
    }
}

async function getTokensBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(publicKey);
    return balance / solanaWeb3.LAMPORTS_PER_SOL;
}
