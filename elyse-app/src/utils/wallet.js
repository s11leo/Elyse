import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export const connectWallet = async () => {
  if (window.solana && window.solana.isPhantom) {
    try {
      const response = await window.solana.connect({ onlyIfTrusted: false });
      console.log('Connected with Public Key:', response.publicKey.toString());
      const address = response.publicKey.toString();
      const formattedAddress = `${address.slice(0, 4)}...${address.slice(-4)}`;
      document.querySelector('#wallet-connect .button').textContent = formattedAddress;
      
      localStorage.setItem('walletAddress', address);

      return address;
    } catch (err) {
      console.error('Error connecting to Phantom wallet:', err);
    }
  } else {
    alert('Phantom wallet not found! Please install it.');
  }
};

export const getSolBalance = async (publicKey) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const solBalance = await connection.getBalance(publicKey);
  const solBalanceInSOL = solBalance / PublicKey.LAMPORTS_PER_SOL;
  return solBalanceInSOL;
};

export const getSPLTokenBalances = async (publicKey) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { 
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') 
  });

  let splTokenBalances = [];

  for (const { account } of tokenAccounts.value) {
      const balance = account.data.parsed.info.tokenAmount.uiAmount;
      splTokenBalances.push({ balance });
  }

  return splTokenBalances;
};

export const getWalletInfo = async () => {
  const address = localStorage.getItem('walletAddress');
  if (!address) {
    console.error('Wallet address is not found in localStorage');
    return null;
  }

  try {
    const publicKey = new PublicKey(address);
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

    return {
      address,
      solBalance: solBalanceInSOL,
      splTokenBalances
    };
  } catch (err) {
    console.error('Error fetching wallet info:', err);
    return null;
  }
};
