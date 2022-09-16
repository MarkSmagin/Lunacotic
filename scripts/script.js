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

  // Автозаполнение полей ползунка **На доработку
  // $('.polzunok-input-wrap input').focusout(function(){
  //   console.log($(this).val())
  //   if(!$(this).val()){
  //     if($(this).hasClass('polzunok-input-5-left')){
  //       $(this).val('0');
  //     } else {
  //       $(this).val('18000');
  //     }
  //   }
  // });
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
    $('.account__wrap').load(`${$(this).attr('data-name')}.html`);
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
})