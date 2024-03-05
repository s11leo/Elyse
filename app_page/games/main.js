var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70
    },
    spaceBetween: 60,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    // Находим кнопку под слайдером
    const openModalButton = document.querySelector('.button');

    if (openModalButton) {
      openModalButton.addEventListener('click', function() {
        // Найти активный слайд
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (!activeSlide) {
          console.error('No active slide found');
          return;
        }
  
        // Извлечь данные для модального окна из активного слайда
        const modalId = activeSlide.getAttribute('data-modal-target');
        const contentUrl = activeSlide.getAttribute('data-content-url');
  
        if (!modalId || !contentUrl) {
          console.error('Data attributes are missing from the active slide');
          return;
        }
  
        // Найти модальное окно и iframe внутри него
        const modal = document.querySelector(modalId);
        const iframe = modal ? modal.querySelector('iframe') : null;
        
        if (modal && iframe) {
          // Установить URL и показать модальное окно
          iframe.src = contentUrl;
          modal.style.display = 'block';
        } else {
          console.error('Modal or iframe not found');
        }
      });
    }
  });

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        var iframe = event.target.querySelector('iframe');
        if (iframe) {
            iframe.src = '';
        }
    }
});

let currentMaxZIndex = 7;
document.querySelectorAll('[data-modal-target]').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal-target');
        const modal = document.querySelector(modalId);
        if (modal) {
            currentMaxZIndex++;
            modal.style.zIndex = currentMaxZIndex.toString();
            modal.style.display = 'block';
        }
    });
});

document.querySelector('.main-menu .fa-home').parentNode.addEventListener('click', function(event) {
    event.preventDefault();
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        modal.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modalLinks = document.querySelectorAll('a[data-modal-target]');
    modalLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const modalSelector = this.getAttribute('data-modal-target');
        const modal = document.querySelector(modalSelector);
        const iframe = modal.querySelector('.modal-iframe');
        iframe.src = this.getAttribute('href');
        modal.style.display = 'block';
      });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });
});