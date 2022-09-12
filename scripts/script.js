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
  if($('.swiper').length){
    const swiper = new Swiper('.swiper', {
      slidesPerView: 12,
      spaceBetween: 10,
      freeMode: true,
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
})