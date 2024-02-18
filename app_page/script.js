document.addEventListener('click', function(event) {

    var card = event.target.closest('.card');
    if (!card) return;

    var contentUrl = card.getAttribute('data-content-url');
    if (!contentUrl) {
        console.error('Content URL is missing for', card);
        return;
    }

    var modalId = card.getAttribute('data-modal-target');
    if (!modalId) {
        console.error('data-modal-target attribute is missing');
        return;
    }

    var modal = document.querySelector(modalId);
    if (!modal) {
        console.error('No modal found with ID:', modalId);
        return;
    }

    var iframe = modal.querySelector('iframe');
    if (!iframe) {
        console.error('No iframe found inside the modal');
        return;
    }

    iframe.src = contentUrl;
    modal.style.display = 'block';
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