const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                // Проверка, что добавленный узел - это ваше модальное окно
                if (node.id === 'modal2') {
                    // Обновление данных
                    const { address, balance } = window.walletData;
                    document.querySelector('#wallet-address').textContent = address || 'Loading address...';
                    document.querySelector('#wallet-balance').textContent = `${balance} SOL` || 'Loading balance...';
                    // Отключение наблюдателя после обновления данных
                    observer.disconnect();
                }
            });
        }
    });
});