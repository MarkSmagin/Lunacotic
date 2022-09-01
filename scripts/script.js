$(document).ready(function(){
    // Слайдер карточек товара
    $('.slider').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      dotsClass: 'slick__dots',
    });
    // Слайдер лучших предложений
    $('.best_offer__body').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      prevArrow:"<img class='best_offer__item__prev slick-prev' src='images/left.svg'>",
      nextArrow:"<img class='best_offer__item__next slick-next' src='images/right.svg'>"
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
})