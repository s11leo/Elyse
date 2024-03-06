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
  var btn = document.getElementById('btn');
  var modal = document.getElementById('myModal');
  var modalIframe = document.querySelector('.modal-iframe');

  btn.addEventListener('click', function() {
    var activeSlide = document.querySelector('.swiper-slide-active');
    var contentUrl = activeSlide.getAttribute('data-content-url');

    modalIframe.src = contentUrl;
    modal.style.display = "block";
  });

  window.addEventListener('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalIframe.src = '';
    }
  });
});

// let previousUrl = null;

// document.getElementById('btn').addEventListener('click', function() {
//   const iframe = document.querySelector('.modal-iframe');
//   const activeSlide = document.querySelector('.swiper-slide-active');
//   const newUrl = activeSlide.getAttribute('data-content-url');

//   // Проверяем, нужно ли обновлять URL (предотвращение повторного нажатия)
//   if (iframe.src !== newUrl) {
//     previousUrl = iframe.src; // Сохраняем текущий URL
//     iframe.src = newUrl; // Загружаем новый URL

//     // Показываем кнопку возврата, если совершается переход
//     document.querySelector('.back-button').style.display = 'block';
//   }
// });

// // Обработчик для кнопки возврата
// document.querySelector('.back-button').addEventListener('click', function() {
//   const iframe = document.querySelector('.modal-iframe');
//   if (previousUrl) {
//     iframe.src = previousUrl; // Возврат к предыдущему URL
//     // Скрываем кнопку возврата после возвращения
//     this.style.display = 'none';
//   }
// });
////////////////////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', function() {
//   var btn = document.getElementById('btn');
//   var modal = document.getElementById('myModal');
//   var modalIframe = document.querySelector('.modal-iframe');
//   var backButton = document.querySelector('.back-button'); // Ссылка на кнопку возврата
//   let previousUrl = ''; // Хранение предыдущего URL

//   // Обработчик клика для открытия и загрузки содержимого
//   btn.addEventListener('click', function() {
//     var activeSlide = document.querySelector('.swiper-slide-active');
//     var contentUrl = activeSlide.getAttribute('data-content-url');

//     // Логика сохранения предыдущего URL и показа кнопки возврата
//     if (modalIframe.src && modalIframe.src !== contentUrl) {
//       previousUrl = modalIframe.src;
//       backButton.style.display = "block"; // Показываем кнопку возврата
//     }

//     modalIframe.src = contentUrl;
//     modal.style.display = "block";
//   });

//   // Обработчик для кнопки возврата
//   backButton.addEventListener('click', function() {
//     if (previousUrl) {
//       modalIframe.src = previousUrl; // Возврат к предыдущему URL
//       this.style.display = 'none'; // Скрываем кнопку возврата
//       previousUrl = ''; // Очищаем предыдущий URL
//     }
//   });

//   // Обработчик закрытия модального окна
//   // window.addEventListener('click', function(event) {
//   //   if (event.target == modal) {
//   //     modal.style.display = "none";
//   //     modalIframe.src = '';
//   //     backButton.style.display = "none"; // Убедитесь, что кнопка возврата также скрыта
//   //     previousUrl = ''; // Сброс предыдущего URL при закрытии
//   //   }
//   // });
// });
////////////////////////////////////////////////////////////////////////////

// document.addEventListener('DOMContentLoaded', function() {
//   var btn = document.getElementById('btn');
//   var modal = document.getElementById('myModal');
//   var modalIframe = document.querySelector('.modal-iframe');
//   var backButton = document.querySelector('.back-button'); // Убедитесь, что эта кнопка уже существует в HTML
//   let previousUrl = ''; // Инициализируем переменную для хранения предыдущего URL

//   // Обработчик клика для кнопки, который открывает модальное окно и загружает в него контент
//   btn.addEventListener('click', function() {
//       var activeSlide = document.querySelector('.swiper-slide-active');
//       var contentUrl = activeSlide.getAttribute('data-content-url');

//       // Проверка и обновление URL, если это необходимо
//       if (modalIframe.src !== window.location.href + contentUrl) {
//           previousUrl = modalIframe.src; // Сохраняем текущий URL, прежде чем обновить его
//           modalIframe.src = contentUrl; // Загружаем новый URL в iframe
//           modal.style.display = "block"; // Показываем модальное окно

//           // Показываем кнопку возврата, если предыдущий URL был изменен
//           if (previousUrl && previousUrl !== '') {
//               backButton.style.display = "block";
//           }
//       }
//   });

//   // Обработчик клика для кнопки возврата
//   backButton.addEventListener('click', function() {
//       if (previousUrl && previousUrl !== '') {
//           modalIframe.src = previousUrl; // Возврат к предыдущему URL
//           this.style.display = 'none'; // Скрываем кнопку возврата
//           // Сбрасываем previousUrl, поскольку мы уже вернулись назад
//           previousUrl = '';
//       }
//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btn');
  var modal = document.getElementById('myModal');
  var modalIframe = document.querySelector('.modal-iframe');
  var backButton = document.querySelector('.back-button');

  // Обработчик клика для открытия модального окна и загрузки содержимого
  btn.addEventListener('click', function() {
    var activeSlide = document.querySelector('.swiper-slide-active');
    var contentUrl = activeSlide.getAttribute('data-content-url');

    modalIframe.src = contentUrl; // Загружаем URL в iframe
    modal.style.display = "block"; // Показываем модальное окно
    backButton.style.display = "block"; // Показываем кнопку возврата, т.к. модальное окно активно
  });

  // Обработчик клика для кнопки возврата
  backButton.addEventListener('click', function() {
    modal.style.display = "none"; // Просто закрываем модальное окно
    modalIframe.src = 'about:blank'; // Очищаем src iframe, если это необходимо для вашей логики
    this.style.display = 'none'; // Скрываем кнопку возврата после закрытия модального окна
  });
});
