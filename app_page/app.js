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

async function getSolBalance(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const solBalance = await connection.getBalance(publicKey);
    const solBalanceInSOL = solBalance / solanaWeb3.LAMPORTS_PER_SOL;
    return solBalanceInSOL;
}

async function getSPLTokenBalances(publicKey) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { 
        programId: new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') 
    });

    let splTokenBalances = [];

    for (const { account } of tokenAccounts.value) {
        const balance = account.data.parsed.info.tokenAmount.uiAmount;
        splTokenBalances.push({ balance });
    }

    return splTokenBalances;
}

async function getWalletInfo() {
    const address = localStorage.getItem('walletAddress');
    if (!address) {
        console.error('Wallet address is not found in localStorage');
        return;
    }

    try {
        const publicKey = new solanaWeb3.PublicKey(address);
        const solBalanceInSOL = await getSolBalance(publicKey);
        console.log('SOL Balance:', solBalanceInSOL);

        const splTokenBalances = await getSPLTokenBalances(publicKey);
        if (splTokenBalances.length > 0) {
            console.log('Token Balances:');
            splTokenBalances.forEach((token) => {
                console.log(token.balance);
            });
        } else {
            console.log('No SPL tokens found.');
        }

        const walletEvent = new CustomEvent('walletInfo', {
            detail: {
                address: address,
                solBalance: solBalanceInSOL,
                splTokenBalances: splTokenBalances
            }
        });
        document.dispatchEvent(walletEvent);
    } catch (err) {
        console.error('Error fetching wallet info:', err);
    }
}

// document.addEventListener('DOMContentLoaded', function () {
//     const recipientPublicKeyStr = localStorage.getItem('walletAddress');
//     if (recipientPublicKeyStr) {
//         console.log('User wallet address from localStorage:', recipientPublicKeyStr);

//         sendToken(recipientPublicKeyStr, 50000000);
//     } else {
//         console.log('User wallet address not found in localStorage');
//     }
// });

// async function sendToken(recipientPublicKeyStr, amount) {
//     const senderSeed = process.env.SEED_PHRASE;
//     const senderTokenAccountStr = "AiDZwVWgWRYGNAV39XBzMKV5GqSaBG8zgtAnCYTrqsHU";
//     const tokenMintAddressStr = "FTixSmrSyvKJMYzJHkwkqtDUYHEaQwoyeg5m5PVroJ4Z";

//     const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

//     const senderKeypair = web3.Keypair.fromSeed(senderSeed);
//     const senderPublicKey = senderKeypair.publicKey;
//     const senderTokenAccount = new web3.PublicKey(senderTokenAccountStr);
//     const tokenMintAddress = new web3.PublicKey(tokenMintAddressStr);
//     const recipientPublicKey = new web3.PublicKey(recipientPublicKeyStr);

//     const recipientTokenAccount = await splToken.getOrCreateAssociatedTokenAccount(
//         connection,
//         senderKeypair,
//         tokenMintAddress,
//         recipientPublicKey
//     );

//     const transaction = new web3.Transaction().add(
//         splToken.createTransferInstruction(
//             senderTokenAccount,
//             recipientTokenAccount.address,
//             senderPublicKey,
//             amount,
//             [],
//             splToken.TOKEN_PROGRAM_ID
//         )
//     );

//     const signature = await web3.sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [senderKeypair]
//     );

//     console.log("Transaction signature", signature);
// }

// async function faucetClaim() {
//     let connection = new web3.Connection(
//         web3.clusterApiUrl('devnet'),
//         'confirmed',
//     );

//     let sender = web3.Keypair.fromSecretKey(
//         new Uint8Array([...]) // Ваш приватный ключ как массив Uint8Array
//     );

//     let recipientPublicKeyString  = localStorage.getItem('walletAddress');
//     if (!recipientPublicKeyString) {
//         console.error('Публичный ключ получателя не найден в localStorage');
//         return;
//     }
//     let recipientPublicKey = new web3.PublicKey(recipientPublicKeyString);

//     let faucetProgramId = new web3.PublicKey('FHeKWXkA6YkFoMjFibnvG3qrZ9Mada7ENpk1V4WwXK9H');

//     let transaction = new web3.Transaction();

//     transaction.add(new web3.TransactionInstruction({
//         programId: faucetProgramId,
//         keys: [
//             { pubkey: sender.publicKey, isSigner: true, isWritable: false },
//             { pubkey: new web3.PublicKey('AiDZwVWgWRYGNAV39XBzMKV5GqSaBG8zgtAnCYTrqsHU'), isSigner: false, isWritable: true },
//             { pubkey: recipientPublicKey, isSigner: false, isWritable: true },
//             { pubkey: splToken.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
//         ],
//         data: Buffer.from([]),
//     }));

//     let signature = await web3.sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [sender],
//     );

//     console.log('Транзакция подписана и отправлена. ID транзакции:', signature);
// }

// faucetClaim().catch(err => console.log(err));

fetch('http://176.117.185.56:3000/api/secret')
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    console.log(data);
    // Здесь вы можете обрабатывать полученные секреты, например, отображать их в интерфейсе.
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });