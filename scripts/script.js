$(document).ready(function(){
  // Слайдер карточек товара
  $('.stocks').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: 'slick__dots',
  });
  // Слайдер лучших предложений
  $('.product_slider__body').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000000,
    prevArrow:"<img class='product_slider__item__prev slick-prev' src='images/left.svg'>",
    nextArrow:"<img class='product_slider__item__next slick-next' src='images/right.svg'>"
  });
  // Слайдер брэндов
  $('.brand__body').slick({
    autoplay: false,
    dots: true,
    arrows: false,
    customPaging : function(slider, i) {
      let thumb = $(slider.$slides[i]).data('thumb');
      return '<a><img src="'+thumb+'"></a>';
    },
  });
  // Аккордион блок Вопрос-ответ
  $('.questions__body').accordion({
    heightStyle: 'content',
    header: '> .questions__item > .question__text'
  });
  // Карта
  ymaps.ready(init);
  function init(){
      let myMap = new ymaps.Map("map", {
          center: [55.795798, 49.222449],
          zoom: 15,
          controls: ['zoomControl']
      },
      {
          suppressMapOpenBlock: true
      }
      );
      let myPlacemark = new ymaps.Placemark([55.795798, 49.222449], {
        hintContent: 'Казань, Мамадышский тракт 4',
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'images/map__marker.svg',
          iconImageSize: [48, 48],
    });
    myMap.geoObjects.add(myPlacemark);
  }
  // Боковые кнопки
  $(window).scroll(function() {
    if($(this).scrollTop() >= 500) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
    });
    $('#toTop').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });

  // Кнопка Like
  $('.product_slider__like img').hover(
    function() {
      $(this).attr('src', 'images/like__active.svg');
    }, function() {
      if(!$(this).hasClass('active')){
      $(this).attr('src', 'images/like.svg');
      }
    }
  )
  $('.product_slider__like img').on('click', function() {
    if($(this).hasClass('active')){
      console.log('имеет')
      $(this).removeClass('active');
      $(this).attr('src', 'images/like.svg');
    } else {
      console.log('не имеет')
      $(this).addClass('active');
      $(this).attr('src', 'images/like__active.svg');
    }
  })
  // Горизонтальная прокрутка
  const swiper = new Swiper('.swiper', {
    slidesPerView: 12,
    spaceBetween: 10,
    freeMode: true,
  });
})