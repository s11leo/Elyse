const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { Connection, Keypair, PublicKey, Transaction } = require('@solana/web3.js');
const { sendAndConfirmTransaction } = require('@solana/web3.js');
const { getOrCreateAssociatedTokenAccount, createTransferInstruction, getAccountInfo } = require('@solana/spl-token');
const https = require('https');
const app = express();
const cors = require('cors');
const fs = require('fs');
// const moment = require('moment');

app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://hackathon-test-project.space',
};

app.use(cors(corsOptions));

const serverOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/hackathon-test-project.space/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/hackathon-test-project.space/fullchain.pem')
};

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
const mintAddress = new PublicKey('FTixSmrSyvKJMYzJHkwkqtDUYHEaQwoyeg5m5PVroJ4Z');
const senderPublicKey = new PublicKey('7q6nqQAg4zsWxvury8oW8N162SkkbMsoopw27hSyiAVX');

async function faucetClaim(req, res) {
    const recipientPublicKeyString = req.body.walletAddress;
    console.log("recipient Public Key:", recipientPublicKeyString);
    if (!recipientPublicKeyString) {
        return res.status(400).send('walletAddress is required');
    }

    const secretResponse = await fetch('https://hackathon-test-project.space:3000/api/secret');

    if (!secretResponse.ok) {
        console.error('Error when requesting API to get secret:', secretResponse.statusText);
        return res.status(500).send('Server error when requesting API to get secret');
    }
    
    const secretData = await secretResponse.json();
    const privateKeyUint8Array = new Uint8Array(secretData);
    const sender = Keypair.fromSecretKey(privateKeyUint8Array);
    const connection = new Connection("https://api.devnet.solana.com", 'confirmed');
    const recipientPublicKey = new PublicKey(recipientPublicKeyString);

    let senderTokenAccount;
    try {
        senderTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            sender,
            mintAddress,
            senderPublicKey,
        );
        // console.log("sender Token Account:", senderTokenAccount.address.toString());
    } catch (error) {
        console.error("Failed to find or create sender token account:", error);
        return res.status(500).send("Could not find or create sender token account");
    }

    let recipientTokenAccount;
    try {
        recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            sender,
            mintAddress,
            recipientPublicKey,
        );
        // console.log("recipient Token Account:", recipientTokenAccount.address.toString());
    } catch (error) {
        console.error("Не удалось найти или создать токеновый аккаунт получателя:", error);
        return res.status(500).send("Не удалось найти или создать токеновый аккаунт получателя");
    }
    
    let amount = 50000000000;

    const transferInstruction = createTransferInstruction(
        senderTokenAccount.address,
        recipientTokenAccount.address,
        sender.publicKey,
        amount,
        [],
        TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(transferInstruction);

    try {
        const signature = await sendAndConfirmTransaction(
            connection,
            transaction,
            [sender],
            {
                commitment: 'confirmed',
            }
        );
    
    console.log('The transaction is signed and sent. Transaction ID:', signature);
    res.json({ success: true, transactionId: signature });
    } catch (error) {
        console.error("Error sending transaction:", error);
        res.status(500).json({ success: false, message: "Error sending transaction" });
    }
}

app.post('/request-tokens', faucetClaim);

https.createServer(serverOptions, app).listen(3001, () => {
    console.log('Server listening on https://localhost:3001');
});

// function logToFile(message) {
//     const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
//     const logMessage = `${timestamp}: ${message}\n`;
//     fs.appendFile('server.log', logMessage, (err) => {
//         if (err) {
//             console.error('Error writing logfile:', err);
//         }
//     });
// }
