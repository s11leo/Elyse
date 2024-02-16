document.getElementById('wallet-connect').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
      try {
        const response = await window.solana.connect();
        console.log('Connected with Public Key:', response.publicKey.toString());
        alert('Кошелек успешно подключен: ' + response.publicKey.toString());
      } catch (err) {
        console.error('Ошибка подключения', err);
        alert('Ошибка при подключении: ' + err.message);
      }
    } else {
      alert('Кошелек Phantom не найден. Пожалуйста, установите его.');
    }
});
