$( document ).ready(function() {

	// Переключение табов
	$('.js-tab-click').click(function(event) {
		event.preventDefault();

		var id = $(this).data('item');
		var znat = $(this).data('name');
		
		$(znat + ' .js-tab-click.active').removeClass('active');
		$(event.target).addClass('active');
		
		$(znat + ' .js-tab-block').removeClass('active').eq(id).addClass('active');
		
	});

	// Скрытие по клику на крестик
	$('.js-notice-cross').click(function(){
		$($('.js-block-notice')).fadeOut();
	});

	// Событие клика на кнопку "Показать еще..."
	$('.js-show-all').click(function(event) {
		event.preventDefault();

		($('.js-block-show-all').hasClass('show') ? $(this).text('Показать 23 запчасти') : $(this).text('Скрыть'));
		$('.js-block-show-all').toggleClass('show');
	});

	// Событие клика на кнопку "Еще..."
	$('.js-link-yet').click(function(event) {
		event.preventDefault();

		$(this).toggleClass('show');
		($('.js-link-yet-block').hasClass('show') ? $(this, 'span').text('Еще') : $(this, 'span').text('Скрыть'));
		$('.js-link-yet-block').toggleClass('show');
	});

	// Инициализация formstyler.js
	$('select').styler();
	$('.order-radio').styler();


	// Запрет на ввод всех символов кроме цифр в блок "Срок Аренды"
	$('.js-order-number').keypress(function(e){
		return (/[0-9]/.test(String.fromCharCode(e.charCode)));
	});

	$('.block-arrow-top').click(function(event){
		var abc = $('.js-order-number').val();
		$('.js-order-number').val(+abc + 1);
	});

	$('.block-arrow-bottom').click(function(event){
		var abc = $('.js-order-number').val();
		if (abc != 0) {
			$('.js-order-number').val(+abc - 1);
		} else {
			$('.js-order-number').val(0);
		}
	});
	
	// Инициализация slick.js
	$('.block-slider-order-list').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="block-slider-order-prev"></button>',
		nextArrow: '<button type="button" class="block-slider-order-next"></button>'
	});

	// Удаление элементов со страницы "Отложенные запчасти"
	$('.block-deferred-item').on('click', '.js-deferred', function(event) {
		event.preventDefault();

		$(this).parents('.block-deferred-item').fadeOut(200, function() {
			remove();
		});
	});

	// Показать пароль в форме
	$('.js-password .js-eye').bind('click', function() {
		var eyeIndex = $(this).index('.js-eye');
		if ($('.js-password input').get(eyeIndex).type=='password') {
			$('.js-password input').get(eyeIndex).type='text';
		} else {
			$('.js-password input').get(eyeIndex).type='password';
		}
	});

	$('html').on('click', '.js-deletBlock', function(event) {
		event.preventDefault();

		$(this).parents('.profile-form-group-dots').fadeOut(200, function() {
			$(this).remove();
		});

	});

	$('html').on('click', '.js-deletBlock--person', function(event) {
		event.preventDefault();
		var countPerson = $('.profile-form-group-dots.contact-person').length + 1;

		$('.person').append('\
			<div class="profile-form-group-dots contact-person">\
				<div class="profile-form-group">\
					<span class="contact-person">Контактное лицо № '+ countPerson +'</span>\
					<a class="contact-person-delete js-deletBlock" data-content="contact-person" href="#">Удалить контактное лицо</a>\
				</div>\
				<div class="profile-form-group">\
					<label>ФИО<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label>Должность<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label>Контактный телефон<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label>E-mail<span>*</span></label>\
					<input type="text">\
				</div>\
			</div>\
		');
	});


	$('.js-deletBlock--cash').bind('click', function(event) {
		event.preventDefault();
		var countCash = $('.profile-form-group-dots.contact-cash').length + 1;

		$('.cash').append('\
			<div class="profile-form-group-dots contact-cash">\
				<div class="profile-form-group">\
					<span class="contact-person">Банкомат № '+ countCash +'</span>\
					<a class="contact-person-delete js-deletBlock" href="#">Удалить банкомат</a>\
				</div>\
				<div class="profile-form-group">\
					<label>Серийный номер<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label>Город<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label>Название отделения<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label class="addres">Адрес<span>*</span></label>\
					<textarea></textarea>\
				</div>\
			</div>\
		');
	});

	$('.js-deletBlock--addres').bind('click', function(event) {
		event.preventDefault();
		var countAddress = $('.profile-form-group-dots.contact-addres').length + 1;

		$('.addresBlock').append('\
			<div class="profile-form-group-dots contact-addres">\
				<div class="profile-form-group">\
					<span class="contact-person">Адрес № '+ countAddress +'</span>\
					<a class="contact-person-delete js-deletBlock" data-content="addresBlock" href="#">Удалить адрес</a>\
				</div>\
				<div class="profile-form-group">\
					<label>Город<span>*</span></label>\
					<input type="text">\
				</div>\
				<div class="profile-form-group">\
					<label class="addres">Адрес<span>*</span></label>\
					<textarea></textarea>\
				</div>\
			</div>\
		');
	});



	// Проверка полей на заполненность
	$(function() {

		$('.js-form-inspection').each(function() {
			var form = $(this),
			btn = $('.js-form-inspection-btn');

			// Добавляем каждому проверяемому полю, указание что поле пустое

			// Функция проверки полей формы
			function checkInput(){
				form.find('.js-inspection').each(function() {
					if($(this).val() != ''){
						$(this).removeClass('error');
					} else {
						$(this).addClass('error');
					}
				});
			}

			// Функция подсветки незаполненных полей
			function lightEmpty() {
				form.find('.error').css({'border':'1px solid #c90101'});
				form.find('.error').attr('placeholder', 'Обязательное поле');
				setTimeout(function() {
					form.find('.error').removeAttr('style');
					form.find('.error').attr('placeholder', '');
				}, 5000);
			}

			setInterval(function() {
				checkInput();
				var sizeEmpty = form.find('.error').size();
				if(sizeEmpty > 0) {
					if(btn.hasClass('disabled')){
						return false
					} else {
						btn.addClass('disabled')
					}
				} else {
					btn.removeClass('disabled')
				}
			}, 500);

	    // Событие клика по кнопке отправить
			btn.click(function(event){
				event.preventDefault();
				if($(this).hasClass('disabled')) {
					lightEmpty();
					return false
				} else {
					form.submit();
				}
			});
		});
	});
	
	//search-opener
	$('.js-search-opener').click(function(event) {
		event.preventDefault();
		($('.js-search-opener').hasClass('show') ? $(this).text('Расширенный поиск') : $(this).text('Свернуть'));
		$('.js-search-opener').toggleClass('show');
		$('.sm-search').toggleClass('show');
		$('.big-search').toggleClass('show');
	});
	

});