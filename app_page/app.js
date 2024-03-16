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

document.addEventListener('DOMContentLoaded', () => {
    getWalletInfo().catch(console.error);
});

// async function getWalletInfo() {
//     const address = localStorage.getItem('walletAddress');
//     if (!address) {
//         console.error('Wallet address is not found in localStorage');
//         return;
//     }

//     try {
//         const solBalanceInSOL = await getTokensBalance(new solanaWeb3.PublicKey(address));
//         console.log('SOL Balance:', solBalanceInSOL);

//         const walletEvent = new CustomEvent('walletInfo', {
//             detail: {
//                 address: address,
//                 balance: solBalanceInSOL
//             }
//         });
//         document.dispatchEvent(walletEvent);
//     } catch (err) {
//         console.error('Error fetching wallet info:', err);
//     }
// }

// async function getTokensBalance(publicKey) {
//     const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
//     const balance = await connection.getBalance(publicKey);
//     return balance / solanaWeb3.LAMPORTS_PER_SOL;
// }

async function getWalletInfo() {
    const address = localStorage.getItem('walletAddress');
    if (!address) {
        console.error('Wallet address is not found in localStorage');
        return;
    }

    try {
        const publicKey = new solanaWeb3.PublicKey(address);
        const solBalanceInSOL = await getTokensBalance(publicKey);
        console.log('SOL Balance:', SOL.balance);

        const tokenBalances = await getTokensBalance(publicKey);
        console.log('Token Balances:', SPLTokens);

        const walletEvent = new CustomEvent('walletInfo', {
            detail: {
                address: address,
                balance: solBalanceInSOL,
                tokenBalances: tokenBalances
            }
        });
        document.dispatchEvent(walletEvent);
    } catch (err) {
        console.error('Error fetching wallet info:', err);
    }
}

async function getTokenMetadata(connection, mintAddress) {
    const METADATA_PROGRAM_ID = new solanaWeb3.PublicKey('metaqbxxUerdq28cj1RbAWkYQm3yDJaYD2LuQrMdTB8');
    const [metadataPublicKey] = await solanaWeb3.PublicKey.findProgramAddress(
        [
            Buffer.from('metadata'),
            METADATA_PROGRAM_ID.toBuffer(),
            new solanaWeb3.PublicKey(mintAddress).toBuffer(),
        ],
        METADATA_PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(metadataPublicKey);
    if (accountInfo === null) return null;

    const metadata = decodeMetadata(accountInfo.data);

    return metadata;
}

// Функция для декодирования данных метаданных, полученных от Solana
function decodeMetadata(buffer) {
    const METADATA_SCHEMA = new Map([
        // Здесь должна быть структура данных метаданных
        // В качестве примера, оставим это как псевдокод
    ]);

    // Декодирование с использованием, например, библиотеки borsh.js
    // return borsh.deserializeUnchecked(METADATA_SCHEMA, Metadata, buffer);
    // Пример возврата без использования декодирования
    return { name: "Token Name", symbol: "SYMBOL" };
}

async function getTokensBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const solBalance = await connection.getBalance(publicKey);
    const solBalanceInSOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { 
        programId: new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') 
    });

    let splTokenBalances = [];

    // for (const { account } of tokenAccounts.value) {
    //     const tokenAddress = account.data.parsed.info.mint;
    //     const balance = account.data.parsed.info.tokenAmount.uiAmount;
    //     const metadata = await getTokenMetadata(tokenAddress); 
    //     const tokenInfo = { 
    //         tokenAddress, 
    //         balance, 
    //         symbol: metadata.symbol
    //     };
    //     splTokenBalances.push(tokenInfo);
    // }

    for (const { account } of tokenAccounts.value) {
        const tokenAddress = account.data.parsed.info.mint;
        const balance = account.data.parsed.info.tokenAmount.uiAmount;
    
        // Получаем метаданные токена
        const metadata = await getTokenMetadata(connection, tokenAddress);
    
        const tokenInfo = {
            tokenAddress,
            balance,
            symbol: metadata ? metadata.symbol : "Unknown", // Используем символ из метаданных, если он доступен
        };
        splTokenBalances.push(tokenInfo);
    }

    return {
        SOL: { balance: solBalanceInSOL, symbol: 'SOL' },
        SPLTokens: splTokenBalances,
    };
}

// async function getTokenMetadata(mintAddress) {
//     try {
//         const url = `https://api.devnet.solana.com/token/meta?tokenAddress=${encodeURIComponent(mintAddress)}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Network response was not ok, status: ${response.status}`);
//         }
//         const metadata = await response.json();
//         return metadata;
//     } catch (error) {
//         console.error('Error fetching token metadata:', error);
//         throw error;
//     }
// }


// async function getTokenMetadata(mintAddress) {
//     const response = await fetch(`https://api.devnet.solana.com/token/meta?tokenAddress=${mintAddress}`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch token metadata');
//     }
//     const metadata = await response.json();
//     return metadata;
// }