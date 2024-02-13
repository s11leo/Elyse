// Используем делегирование событий, если возможно, для улучшения производительности
document.addEventListener('click', function(event) {
    // Проверяем, является ли элемент, по которому был совершен клик, или его родитель, карточкой
    var card = event.target.closest('.card');
    if (!card) return; // Если клик был не по карточке, прекращаем выполнение

    var contentUrl = card.getAttribute('data-content-url');
    if (!contentUrl) {
        console.error('Content URL is missing for', card);
        return; // Прекращаем выполнение, если URL контента отсутствует
    }

    // Предполагаем, что у каждой карточки должен быть атрибут data-modal-target
    var modalId = card.getAttribute('data-modal-target');
    if (!modalId) {
        console.error('data-modal-target attribute is missing');
        return; // Прервать выполнение, если modalId не определён
    }

    var modal = document.querySelector(modalId);
    if (!modal) {
        console.error('No modal found with ID:', modalId);
        return; // Прерываем выполнение, если модальное окно не найдено
    }

    var iframe = modal.querySelector('iframe');
    if (!iframe) {
        console.error('No iframe found inside the modal');
        return; // Прерываем выполнение, если iframe внутри модального окна не найден
    }

    // Устанавливаем URL для iframe и отображаем модальное окно
    iframe.src = contentUrl;
    modal.style.display = 'block';
});

// Обработчик для закрытия модального окна
document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
        var modal = this.closest('.modal');
        if (!modal) {
            console.error('Close button is not inside a modal');
            return; // Прерываем выполнение, если кнопка закрытия не внутри модального окна
        }

        modal.style.display = 'none';
        var iframe = modal.querySelector('iframe');
        if (iframe) {
            iframe.src = ''; // Очищаем src, чтобы остановить воспроизведение видео или обновить контент
        }
    });
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        var iframe = event.target.querySelector('iframe');
        if (iframe) {
            iframe.src = ''; // Очищаем src здесь тоже
        }
    }
});
