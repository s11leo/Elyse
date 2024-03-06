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

document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('btn');
  var modal = document.getElementById('myModal');
  var modalIframe = document.querySelector('.modal-iframe');
  var backButton = document.querySelector('.back-button');

  btn.addEventListener('click', function() {
    var activeSlide = document.querySelector('.swiper-slide-active');
    var contentUrl = activeSlide.getAttribute('data-content-url');

    modalIframe.src = contentUrl;
    modal.style.display = "block";
    backButton.style.display = "block";
  });

  backButton.addEventListener('click', function() {
    modal.style.display = "none";
    modalIframe.src = 'about:blank';
    this.style.display = 'none';
  });
});
