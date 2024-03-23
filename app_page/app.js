
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

document.addEventListener('DOMContentLoaded', (event) => {
    const faucetButton = document.getElementById('faucet');

    faucetButton.addEventListener('click', function() {
      fetch('https://hackathon-test-project.space:3000/api/secret')
        .then(response => response.json())
        .then(data => {
        //   console.log('Received data:', data);
          const privateKeyUint8Array = new Uint8Array(data);
        //   console.log('Received privateKeyUint8Array:', privateKeyUint8Array);
          faucetClaim(privateKeyUint8Array).catch(err => console.log(err));
        })
        .catch(error => console.error('Error receiving Key:', error));
    });
});

// import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
const TOKEN_PROGRAM_ID = new solanaWeb3.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const mintAddress = new solanaWeb3.PublicKey('FTixSmrSyvKJMYzJHkwkqtDUYHEaQwoyeg5m5PVroJ4Z');
const faucetProgramId = new solanaWeb3.PublicKey('FHeKWXkA6YkFoMjFibnvG3qrZ9Mada7ENpk1V4WwXK9H');

async function faucetClaim(privateKeyUint8Array) {
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

    const sender = solanaWeb3.Keypair.fromSecretKey(privateKeyUint8Array);

    const recipientPublicKeyString = localStorage.getItem('walletAddress');
    if (!recipientPublicKeyString) {
        console.error('recipientPublicKey not found in localStorage');
        return;
    }
    const recipientPublicKey = new solanaWeb3.PublicKey(recipientPublicKeyString);

    let recipientTokenAccount;
    try {
        recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          sender,
          mintAddress,
          recipientPublicKey,
        );
    } catch (error) {
        console.error("Не удалось найти или создать токеновый аккаунт получателя:", error);
        return;
    }
    
    let amount = 50000000000;

    const transferInstruction = createTransferInstruction(
        recipientTokenAccount.address, // Исходный (отправитель) ассоциированный токеновый аккаунт
        recipientPublicKey, // Адрес получателя
        sender.publicKey, // Аккаунт, подписывающий транзакцию
        amount,
        [],
        TOKEN_PROGRAM_ID
    );

    const transaction = new solanaWeb3.Transaction().add(transferInstruction);

    try {
        const signature = await solanaWeb3.sendAndConfirmTransaction(
            connection,
            transaction,
            [sender],
        );

        console.log('Транзакция подписана и отправлена. ID транзакции:', signature);
    } catch (error) {
        console.error("Ошибка при отправке транзакции:", error);
    }
}