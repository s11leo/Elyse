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

        const event = new CustomEvent('modalOpened', {
            detail: { modalId: modalSelector }
          });
          document.dispatchEvent(event);
        //   document.dispatchEvent(new CustomEvent('modalFullyLoaded', { detail: { modalId: '#modal2' }}));
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

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.btn-nav');
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var mainMenu = document.querySelector('.main-menu');
    var btnNav = document.querySelector('.btn-nav');

mainMenu.addEventListener('mouseenter', function() {
    if (mainMenu.offsetWidth === 60) {
        btnNav.style.left = '180px';
        btnNav.style.width = 'calc(100% - 180px)';
    }
});

mainMenu.addEventListener('mouseleave', function() {
    btnNav.style.left = '60px';
    btnNav.style.width = 'calc(100% - 60px)';
    });
});

// Cards interactive ////////////////////////////////

const cards = document.querySelectorAll('.card');
let draggedItem = null;

for (let i = 0; i < cards.length; i++) {
  const card = cards[i];

  card.addEventListener('dragstart', function() {
    draggedItem = card;
    setTimeout(() => card.classList.add('dragging'), 0);
  });

  card.addEventListener('dragend', function() {
    setTimeout(() => {
      card.classList.remove('dragging');
      draggedItem = null;
    }, 0);
  });

  card.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  card.addEventListener('dragenter', function(e) {
    e.preventDefault();
    this.classList.add('over');
  });

  card.addEventListener('dragleave', function(e) {
    this.classList.remove('over');
  });

  card.addEventListener('drop', function(e) {
    this.classList.remove('over');
    if (this !== draggedItem) {
      let allCards = document.querySelectorAll('.card');
      const draggedIdx = Array.from(allCards).indexOf(draggedItem);
      const droppedIdx = Array.from(allCards).indexOf(this);
      if (draggedIdx < droppedIdx) {
        this.parentNode.insertBefore(draggedItem, this.nextSibling);
      } else {
        this.parentNode.insertBefore(draggedItem, this);
      }
    }
  });
}
