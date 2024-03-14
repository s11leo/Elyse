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

document.addEventListener('modalOpened', async (e) => {
    console.log(e.detail);
    if(e.detail.modalId === '#modal2') { 
        try {
            const address = localStorage.getItem('walletAddress');
            console.log('address = localStorage', address);
            if(address) {
                await getTokensBalance(new solanaWeb3.PublicKey(address));
            }
        } catch (err) {
            console.error('Error connecting to Phantom wallet:', err);
        }
    }

    async function getTokensBalance(walletAddress) {
    
        try {
            const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    
            const solBalance = await connection.getBalance(new solanaWeb3.PublicKey(walletAddress));
            const solBalanceInSOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;
    
            console.log('SOL Balance:', solBalanceInSOL);
    
            const solBalanceElement = document.getElementById('sol-balance-value');
                if(solBalanceElement && solBalanceElement.offsetParent !== null) {
                    solBalanceElement.textContent = `${solBalanceInSOL.toFixed(2)} SOL`;
                } else {
                    console.log('Element #sol-balance-value not found or hidden.');
                }
        } 
        catch (err) {
            console.error('Error fetching balance:', err);
        }
    }

    async function updateBalanceWhenModalOpens() {
        const observer = new MutationObserver((mutations, obs) => {
          const solBalanceElement = document.getElementById('sol-balance-value');
          if (solBalanceElement && solBalanceElement.offsetParent !== null) {
            obs.disconnect();
          }
        });
      
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }

});

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