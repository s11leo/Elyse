//--------------------------------------------------

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

    // if (contentUrl === "jup_terminal/jup.html") {

    //   fetch(contentUrl)
    //       .then(response => response.text())
    //       .then(html => {
    //           modal.querySelector('.modal-iframe').innerHTML = html;
    //           modal.style.display = 'block';
    //       })
    //       .catch(err => console.error('Ошибка загрузки контента:', err));
    //   return;
    // }

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

document.addEventListener('DOMContentLoaded', function () {
  function setInitialCardSizes() {
      var groups = [
          { id: 'group-1', sizeClass: 'large' },
          { id: 'group-2', sizeClass: 'small' },
          { id: 'group-3', sizeClass: 'large' },
      ];

      groups.forEach(function(group) {
          var cards = document.getElementById(group.id).getElementsByClassName('card');
          for (var i = 0; i < cards.length; i++) {
              cards[i].classList.add(group.sizeClass);
          }
      });
  }

  setInitialCardSizes();

  var groupOptions = {
      group: 'shared',
      animation: 150,
      onAdd: function (event) {
          var newItem = event.item;
          var groupId = event.to.id;
          
          newItem.classList.remove('small', 'large');

          if (groupId === 'group-1') {
              newItem.classList.add('large');
          } else if (groupId === 'group-2') {
              newItem.classList.add('small');
          } else if (groupId === 'group-3') {
              newItem.classList.add('large');
          }
      },
  };

  ['group-1', 'group-2', 'group-3'].forEach(function(groupId) {
      new Sortable(document.getElementById(groupId), groupOptions);
  });
});

//---jup-terminal-----------------------------------

// document.addEventListener('DOMContentLoaded', () => {
//   const jupiterEvent = new CustomEvent('jupiterContentLoad', {
//     detail: {
//       contentUrl: "jup_terminal/jup.html"
//     }
//   });

//   document.querySelectorAll('.card').forEach(card => {
//     card.addEventListener('click', function() {
//       if (this.getAttribute('data-content-url') === jupiterEvent.detail.contentUrl) {
//         document.dispatchEvent(jupiterEvent);
//       }
//     });
//   });

//   document.addEventListener('jupiterContentLoad', (e) => {
//     const { contentUrl } = e.detail;
//     fetch(contentUrl)
//       .then(response => response.text())
//       .then(html => {
//         const jupContent = document.getElementById('jupContent');
//         jupContent.innerHTML = html;

//         const scripts = jupContent.querySelectorAll('script');
//         scripts.forEach((script) => {
//             const newScript = document.createElement('script');
//             if (script.src) {
//                 newScript.src = script.src;
//             } else {
//                 newScript.textContent = script.textContent;
//             }
//             if (script.type === 'module') {
//                 newScript.type = 'module';
//             }
//             document.body.appendChild(newScript);
//             script.parentNode.removeChild(script);
//         });
//         openModal('#jupmodal');
//       })
//       .catch(err => console.error('Ошибка загрузки контента Юпитера:', err));
//   });

//   function openModal(selector) {
//     const modal = document.querySelector(selector);
//     if (!modal) {
//       console.error('Modal not found:', selector);
//       return;
//     }
//     modal.style.display = 'block';
    
//     const closeButton = modal.querySelector('.close-button');
//     if (!closeButton) {
//       console.error('Close button not found in modal:', selector);
//       return;
//     }
    
//     closeButton.addEventListener('click', function() {
//       modal.style.display = 'none';
//     });
//   }
// });
