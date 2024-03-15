document.querySelector('#wallet-connect .button').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: false });
            console.log('Connected with Public Key:', response.publicKey.toString());
            const address = response.publicKey.toString();
            const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
            document.querySelector('#wallet-connect .button').textContent = formattedAddress;
            
            localStorage.setItem('walletAddress', address);
            
        } catch (err) {
            console.error('Error connecting to Phantom wallet:', err);
        }
    } else {
        alert('Phantom wallet not found! Please install it.');
    }
});

document.addEventListener('modalFullyLoaded', async (e) => {
    console.log('Event modalFullyLoaded:', e.detail);
    if(e.detail.modalId === '#modal2') { 
        try {
            const address = localStorage.getItem('walletAddress');
            if (!address) {
                console.error('walletAddress is not found in localStorage');
                return;
            }
            console.log('address = localStorage', address);
            setTimeout(async () => {
                await getTokensBalance(new solanaWeb3.PublicKey(address));
            }, 2500);
        } catch (err) {
            console.error('Error connecting to Phantom wallet:', err);
        }
    }
});

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

async function getWalletInfo() {
    // Предположим, что адрес уже сохранен в localStorage под ключом 'walletAddress'
    const address = localStorage.getItem('walletAddress');
    if (!address) {
        console.error('Wallet address is not found in localStorage');
        return;
    }

    try {
        const solBalanceInSOL = await getTokensBalance(new solanaWeb3.PublicKey(address));
        console.log('SOL Balance:', solBalanceInSOL);

        // Создание и отправка события с данными о балансе и адресе
        const walletEvent = new CustomEvent('walletInfo', {
            detail: {
                address: address,
                balance: solBalanceInSOL
            }
        });
        document.dispatchEvent(walletEvent);
    } catch (err) {
        console.error('Error fetching wallet info:', err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getWalletInfo().catch(console.error);
});

            // function waitForElement(selector, delay = 50, tries = 20) {
            //     return new Promise((resolve, reject) => {
            //         const attemptToFindElement = function(triesLeft) {
            //             const element = document.querySelector(selector);
            //             if (element) {
            //                 resolve(element);
            //             } else if (triesLeft - 1 > 0) {
            //                 setTimeout(() => attemptToFindElement(triesLeft - 1), delay);
            //             } else {
            //                 reject(new Error(`Element ${selector} not found within the specified time.`));
            //             }
            //         };
            //         attemptToFindElement(tries);
            //     });
            // }

            // document.addEventListener('modalFullyLoaded', async (e) => {
            //     if(e.detail.modalId === '#modal2') { 
            //         const address = localStorage.getItem('walletAddress');
            //         if (!address) {
            //             console.error('walletAddress is not found in localStorage');
            //             return;
            //         }
            //         console.log('address = localStorage', address);
                    
            //         try {
            //             const solBalanceInSOL = await getTokensBalance(new solanaWeb3.PublicKey(address));
            //             waitForElement('sol-balance-value', 500, 50) // Проверяем каждые 100 мс, всего 50 попыток
            //                 .then((element) => {
            //                     element.textContent = `${solBalanceInSOL.toFixed(2)} SOL`;
            //                 })
            //                 .catch((error) => {
            //                     console.error(error.message);
            //                 });
            //         } catch (err) {
            //             console.error('Error fetching balance:', err);
            //         }
            //     }
            // });

            // async function getTokensBalance(walletAddress) {
            //     try {
            //         const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
            //         const solBalance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
            //         return solBalance / solanaWeb3.LAMPORTS_PER_SOL;
            //     } catch (err) {
            //         console.error('Error fetching balance:', err);
            //         throw err;
            //     }
            // }

// async function updateBalanceWhenModalOpens() {
//     const observer = new MutationObserver((mutations, obs) => {
//       const solBalanceElement = document.getElementById('sol-balance-value');
//       if (solBalanceElement && solBalanceElement.offsetParent !== null) {
//         obs.disconnect();
//       }
//     });
  
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true
//     });
// }


// async function getTokensBalance(walletAddress) {
    
//     try {
//         const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

//         const solBalance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
//         const solBalanceInSOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;

//         console.log('SOL Balance:', solBalanceInSOL);

//         const solBalanceElement = document.getElementById('sol-balance-value');
//         if(solBalanceElement) {
//             solBalanceElement.textContent = `${solBalanceInSOL.toFixed(2)} SOL`;
//         }
//     } catch (err) {
//         console.error('Error fetching balance:', err);
//     }

    // // prepare token list
    // const tokensListElement = document.getElementById('tokens-list');
    // tokensListElement.innerHTML = '';

    // // adding information about the SOL balance
    // const solBalanceElement = document.createElement('div');
    // solBalanceElement.textContent = `SOL Balance: ${solBalanceInSOL.toFixed(2)} SOL`;
    // tokensListElement.appendChild(solBalanceElement);

    // // get all token accounts by owner
    // const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
    //     programId: new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
    // });

    // // displaying information for each token on the page
    // tokenAccounts.value.forEach(({ account }) => {
    //     const tokenAmount = account.data.parsed.info.tokenAmount;
    //     const tokenInfo = document.createElement('div');
    //     tokenInfo.textContent = `Token: ${account.data.parsed.info.mint}, Balance: ${tokenAmount.uiAmount}`;
    //     tokensListElement.appendChild(tokenInfo);
    // });

    // if (tokenAccounts.value.length === 0) {
    //     const noTokensElement = document.createElement('div');
    //     noTokensElement.textContent = 'No tokens found.';
    //     tokensListElement.appendChild(noTokensElement);
    // }
// }