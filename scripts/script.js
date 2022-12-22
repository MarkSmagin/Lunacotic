$(document).ready(function(){
  // Слайдер в карточке товара
  if($('.swiper').length){
    let swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesProgress: true,
    });
    let swiper2 = new Swiper(".mySwiper2", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
  }
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

  // Слайдер на странице акций
  if($('.stocks__banner').length){
    var swiper = new Swiper(".stocks__banner .mySwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }
  // Аккордион блок Вопрос-ответ
  $('.questions__body').accordion({
    heightStyle: 'content',
    header: '> .questions__item > .question__text'
  });

   // Аккордион фильтров
  $('.products__filters').accordion({
    heightStyle: 'content',
    active: true,
    header: '> .filter__accordion > .filter__name',
    collapsible: true,
    beforeActivate: function(event, ui) {
      if (ui.newHeader[0]) {
        var currHeader  = ui.newHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      } else {
        var currHeader  = ui.oldHeader;
        var currContent = currHeader.next('.ui-accordion-content');
      }
      var isPanelSelected = currHeader.attr('aria-selected') == 'true';
      currHeader.toggleClass('ui-corner-all',isPanelSelected).toggleClass('accordion-header-active ui-state-active ui-corner-top',!isPanelSelected).attr('aria-selected',((!isPanelSelected).toString()));
      currHeader.children('.ui-icon').toggleClass('ui-icon-triangle-1-e',isPanelSelected).toggleClass('ui-icon-triangle-1-s',!isPanelSelected);
      currContent.toggleClass('accordion-content-active',!isPanelSelected)    
      if (isPanelSelected) { currContent.slideUp(); }  else { currContent.slideDown(); }
      return false;
    },
    animate: {
      duration: 100
    }
  });

  // Карта
  if($('#map').length){
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
      $(this).removeClass('active');
      $(this).attr('src', 'images/like.svg');
    } else {
      $(this).addClass('active');
      $(this).attr('src', 'images/like__active.svg');
    }
  })

    // Горизонтальная прокрутка
  if($('.product__list__swiper').length){
    const swiper = new Swiper('.product__list__swiper', {
      slidesPerView: 12,
      spaceBetween: 10,
      freeMode: true,
    }); 
  }

  // Горизонтальная прокрутка на странице О нас "Поставщики и партнеры"
  if($('.about__suppliers__swiper').length){
    const swiper = new Swiper('.about__suppliers__swiper', {
      slidesPerView: 6,
      spaceBetween: 10,
      freeMode: true,
    }); 
  }

// Горизонтальная прокрутка на странице О нас "Комьюнити"
if($('.about__community__swiper').length){
  const swiper = new Swiper('.about__community__swiper', {
    slidesPerView: 3,
    spaceBetween: 10,
    freeMode: true,
    slidesPerView: 'auto'
  }); 
}

  // Ползунок фильтр цен
  $(".polzunok-5").slider({
    min: 0,
    max: 18000,
    values: [0, 18000],
    range: true,
    animate: "fast",
    slide : function(event, ui) {    
        $(".polzunok-input-5-left").val(ui.values[ 0 ]);   
        $(".polzunok-input-5-right").val(ui.values[ 1 ]);  
    }    
  });
  $('.polzunok-input-wrap input').focus(function(){
    $(this).val('');
  });

  $(".polzunok-input-5-left").val($(".polzunok-5").slider("values", 0));
  $(".polzunok-input-5-right").val($(".polzunok-5").slider("values", 1));
  $(".polzunok-container-5 input").change(function() {
    var input_left = $(".polzunok-input-5-left").val().replace(/[^0-9]/g, ''),    
    opt_left = $(".polzunok-5").slider("option", "min"),
    where_right = $(".polzunok-5").slider("values", 1),
    input_right = $(".polzunok-input-5-right").val().replace(/[^0-9]/g, ''),    
    opt_right = $(".polzunok-5").slider("option", "max"),
    where_left = $(".polzunok-5").slider("values", 0); 
    if (input_left > where_right) { 
        input_left = where_right; 
    }
    if (input_left < opt_left) {
        input_left = opt_left; 
    }
    if (input_left == "") {
    input_left = 0;    
    }        
    if (input_right < where_left) { 
        input_right = where_left; 
    }
    if (input_right > opt_right) {
        input_right = opt_right; 
    }
    if (input_right == "") {
    input_right = 0;    
    }    
    $(".polzunok-input-5-left").val(input_left); 
    $(".polzunok-input-5-right").val(input_right); 
    if (input_left != where_left) {
        $(".polzunok-5").slider("values", 0, input_left);
    }
    if (input_right != where_right) {
        $(".polzunok-5").slider("values", 1, input_right);
    }
  });

  // Смена вида расположения товаров в каталоге
  $('.products__appearance span').click(function(){
    $('.products__appearance span').removeClass('active');
    $('.products__body').addClass('hidden');
    if($(this).hasClass('tile')){
      $('.tile').removeClass('hidden');
    } else if($(this).hasClass('list')){
      $('.list').removeClass('hidden');
    }
    $(this).addClass('active');
    let currentView = $(this).attr('class');
  })

  // Смена вида расположения товаров в поиске
  $('.search__appearance span').click(function(){
    $('.search__appearance span').removeClass('active');
    $('.search__body').addClass('hidden');
    if($(this).hasClass('tile')){
      $('.tile').removeClass('hidden');
    } else if($(this).hasClass('list')){
      $('.list').removeClass('hidden');
    }
    $(this).addClass('active');
    let currentView = $(this).attr('class');
  })

  // Выбор веса товара
  $('.weight__item').click(function(){
    $('.weight__item').removeClass('weight__item__active');
    $(this).addClass('weight__item__active');
    if($(this).hasClass('by__weight')){
      $('.ordering__clarification').removeClass('hidden');
      $('.price__for__one .weight').html('за 100 г');
    } else{
      $('.ordering__clarification').addClass('hidden');
      $('.price__for__one .weight').html('за шт');
    }
  })

  // Счетчик в картчоке товара
  if($('.product__card__ordering').length){
    let counter = $('#buttonCountNumber').val();
    let price = $('#price').html().replace(/\s+/g, "");
    let maxCount = $('#availability__count').html();
    $('#buttonCountPlus').click(function(){
      if(counter < maxCount){
        counter++;
        $('#buttonCountNumber').val(counter);
        $('#calculation').html(new Intl.NumberFormat('ru-RU').format(counter * price));
      }
    })
  
    $('#buttonCountMinus').click(function(){
      if(counter >= 2){
        counter--;
        $('#buttonCountNumber').val(counter);
        $('#calculation').html(new Intl.NumberFormat('ru-RU').format(counter * price));
      }
    })
  }
  
  // Описание товара
  $('.description__title').click(function(){
    $('.description__title').removeClass('description__title__active');
    $('.description__text').addClass('hidden');
    $(this).addClass('description__title__active');
    changeText($(this).data('text'));
  })

  function changeText(textID){
    $('.description__text[data-text="'+ textID +'"]').removeClass('hidden');
  }

  // Персональные предложения
  $('.personal__offers__title').click(function(){
    $('.personal__offers__title').removeClass('personal__offers__active');
    $('.personal__offers__item').addClass('hidden');
    $(this).addClass('personal__offers__active');
    changeOffer($(this).data('text'));
  })

  function changeOffer(textID){
    $('.personal__offers__item[data-text="'+ textID +'"]').removeClass('hidden');
  }

  // Отключение возможности добавления в корзину при отсутствии товара
  $('.disabled button').attr('disabled', 'disabled');
  $('.disabled #price').html(0);
  $('.ordering__wrap #calculation').html(0);

  // Скрытие/раскрытие текста
  $('.reviews__text__wrap').each(function(){
    if($(this).height() > 130){
      $(this).css('max-height', '125px  ');
      console.log($(this).closest('.reviews__massage').find('.show__more__text'))
      $(this).children('.text__shadow').removeClass('hidden');
      $(this).closest('.reviews__massage').find('.show__more__text').removeClass('hidden');
    }
  })

  $('.show__more__text').on('click', function(){
    $(this).prev('.reviews__text__wrap').children('.text__shadow').toggleClass('hidden');
    $(this).prev('.reviews__text__wrap').toggleClass('opened');
    $(this).prev('.reviews__text__wrap').css('max-height', 'unset')

    if($(this).prev().hasClass('opened')){
      $(this).text('Свернуть');
      $(this).prev('.reviews__text__wrap').css('max-height', 'unset')
    }else{
      $(this).text('Развернуть');
      $(this).prev('.reviews__text__wrap').css('max-height', '125px')
    }
  })

  // Навигация в личном кабинете
  $('.account__nav__button').click(function(){
    $('.account__nav__button').removeClass('account__nav__button__active');
    $(this).addClass('account__nav__button__active');
    $('.account__wrap').load(`${$(this).attr('data-name')}.html`, function(response, status, xhr){
      adressMaps();
    });
  })

  // Таблица в личном кабинете
  $(document).on('click', '.order__history__item', function(){
    $(this).children('.more__info').slideToggle(200);
    if($(this).hasClass('order__in__progress')){
      $(this).toggleClass('order__item__grey');
    } else if($(this).hasClass('order__completed')){
      $(this).toggleClass('order__item__yellow');
    } else if($(this).hasClass('order__canceled')){
      $(this).toggleClass('order__item__red');
    }
    if($(this).hasClass('order__item__grey') || $(this).hasClass('order__item__yellow') || $(this).hasClass('order__item__red')){
      $(this).children('.order__detail').html('Свернуть');
      $(this).children('.order__detail').addClass('order__detail__active');
    } else {
      $(this).children('.order__detail').html('Подробнее');
      $(this).children('.order__detail').removeClass('order__detail__active');
    }
  })

  $(document).on('click', '.order__repeat', function(e){
    e.stopPropagation();
  })

  // Смена количества объектов на странице поиска
$('.search__amount__item').click(function(){
  $('.search__amount__item').removeClass('search__amount__item__active');
  $(this).addClass('search__amount__item__active');
})

$('.account__ordering__method input').click(function(){
  $('.account__ordering__method ').removeClass('account__ordering__method__checked');
  $(this).parent('.account__ordering__method').addClass('account__ordering__method__checked');
})

$('.account__ordering__method__sub input').click(function(){
  $('.account__ordering__method__sub').toggleClass('account__ordering__method__sub__checked');
})

$('.account__ordering__paymethod input').click(function(){
  $('.account__ordering__paymethod').toggleClass('account__ordering__paymethod__checked');
})

// Карта на странице оформление заказа
if($('#orderMap').length){
  ymaps.ready(orderMapInit);
  function orderMapInit() {
    var  myInput = document.getElementById("userAdress"),
        myPlacemark,
        myMap = new ymaps.Map('orderMap', {
            center: [55.796127, 49.106414],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        },);

    // Слушаем клик на карте.
    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                getAddress(myPlacemark.geometry.getCoordinates());
            });
        }
        getAddress(coords);
    });

    // Создание метки.
    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'images/map__marker.svg',
            iconImageSize: [48, 48],
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0),
                address = firstGeoObject.getAddressLine();

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: address
                });
            myInput.value = address;
        });
    }
  }
  }

  $('.account__ordering__paymethod input').click(function(){
    $('.account__ordering__paymethod ').removeClass('account__ordering__paymethod__checked');
    $(this).parent('.account__ordering__paymethod').addClass('account__ordering__paymethod__checked');
  })

  $('.account__ordering__method').click(function(){
    if($(this).children('input').attr('value') === 'delivery'){
      $('.account__ordering__body__footer').load('delivery__block.html');
      $('.account__ordering__paymethods .account__ordering__body').load('delivery__paymethods.html');

    } else {
      $('.account__ordering__body__footer').load('pickup__block.html');
      $('.account__ordering__paymethods .account__ordering__body').load('pickup__paymethods.html')
    }
  })
})


$('.account__info__adress__item input').on('click', function(){
  if(!$(this).attr('checked')){
    $('.account__info__adress__item input').removeAttr('checked');
    $(this).attr('checked', 'checked');
    $('.adress__wrap').removeClass('adress__checked');
    $(this).parent('.account__info__adress__item').parent('.adress__wrap').addClass('adress__checked');
  }
})

$('.account__info__adress__add__out').on('click', function(e){
  e.preventDefault();
  $(this).css('display', 'none');
  $('.add__new__adress').css('display', 'block');
})
$('.account__info__adress__add__in').on('click', function(e){
  e.preventDefault();
  $('.add__new__adress').css('display', 'none');
  $('.account__info__adress__add__out').css('display', 'flex');
})

$('.adress__change').on('click', function(e){
  e.preventDefault();
  $('.edit__adress').css('display', 'flex');
  $('.account__info__adress__add__out').css('display', 'none');
})
$('.account__info__adress__save').on('click', function(e){
  e.preventDefault();
  $('.edit__adress').css('display', 'none');
  $('.account__info__adress__add__out').css('display', 'flex');
})

$('.account__info__adress__delete').on('click',function(e){
  e.preventDefault();
})

$('.add__new__pet__form select').on('change', function(){
  if($(this).val() === ""){
    $(this).css('color', "#C2C2C2");
  } else{
    $(this).css('color', "#262424");
  }
})

$('.pet__photo__button').on('change', function(){
  $('.pet__photo__window p').css('display', 'none');
  $('.pet__photo__img').css('display', 'block');
  let file = this.files.item(0);
  let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(){
      $('.pet__photo__img').attr('src', `${reader.result}`);
    }
});

$('.pet__gender').on('click', function(){
  $('.pet__gender').removeClass('pet__gender__checked');
  $('.pet__gender').children("input").removeAttr('checked', 'checked');
  $(this).addClass('pet__gender__checked');
  $(this).children("input").attr('checked','checked');
})

$('.pet__sterilization__castration').on('click', function(){
  $(this).toggleClass('pet__sterilization__castration__checked');
  if($(this).hasClass('pet__sterilization__castration__checked')) {
    $(this).children('input').attr('checked', 'checked');
  } else {
    $(this).children('input').removeAttr('checked', 'checked');
  }
})

const adresses = [
  {
    adress: 'Казань, ул Ново-Булачная 14к3'
  },
  {
    adress: 'Казань, ул Волгоградская 28'
  }
]


function adressMaps(){
  for (let i = 0; i < adresses.length; i++){
    fetch('https://geocode-maps.yandex.ru/1.x/?apikey=ada7606d-3795-4d4f-aac7-1508e476e1d4&format=json&geocode=' + adresses[i].adress)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let adressCoordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.trim().replace(/\s+/g, ' ').split(' ');
      console.log(adressCoordinates)
      ymaps.ready(init);
      function init(){
          let myMap = new ymaps.Map(`adressMap${i + 1}`, {
              center: [+adressCoordinates[1], +adressCoordinates[0]],
              zoom: 16,
              controls: []
          },
          {
              suppressMapOpenBlock: true
          }
          );
          let myPlacemark = new ymaps.Placemark([+adressCoordinates[1], +adressCoordinates[0]], {
            hintContent: `${adresses[i].adress}`,
          }, {
              iconLayout: 'default#image',
              iconImageHref: 'images/map__marker.svg',
              iconImageSize: [48, 48],
        });
        myMap.geoObjects.add(myPlacemark);
      }
    })
  }
}

if($('.account__profile').length){
  adressMaps();
}