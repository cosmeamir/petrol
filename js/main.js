/* =================================
------------------------------------
	Template Name: Industry.INC 
	Description: Industry.INC HTML Template
	Author: colorlib
	Author URI: https://www.colorlib.com/
	Version: 1.0
	Created: colorlib
 ------------------------------------
 ====================================*/


'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.site-nav-menu > ul').slicknav({
		appendTo:'.header-section',
		closedSymbol: '<i class="fa fa-angle-down"></i>',
		openedSymbol: '<i class="fa fa-angle-up"></i>',
		allowParentLinks: true
	});

	$('.slicknav_nav').append('<li class="search-switch-warp"><button class="search-switch"><i class="fa fa-search"></i></button></li>');


	/*------------------
		Search model
	--------------------*/
	$('.search-switch').on('click', function() {
		$('.search-model').fadeIn(400);
	});

	$('.search-close-switch').on('click', function() {
		$('.search-model').fadeOut(400,function(){
			$('#search-input').val('');
		});
	});


	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Hero Slider
	--------------------*/
	$('.hero-slider').owlCarousel({
		nav: true,
		dots: false,
		loop: true,
		navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
		autoplay: true,
		items: 1,
		animateOut: 'fadeOut',
    	animateIn: 'fadeIn',
	});

	/*------------------
		Brands Slider
	--------------------*/
	$('#client-carousel').owlCarousel({
		nav: false,
		loop: true,
		margin:20,
		autoplay: true,
		responsive:{
			0:{
				items:2,
				margin: 0
			},
			600:{
				items:3
			},
			800:{
				items:4
			},
			992:{
				items:4
			},
			1200:{
				items:5
			},
		}
	});

	/*---------------------
		Testimonial Slider
	----------------------*/
	$('.testimonial-slider').owlCarousel({
		nav: false,
		dots: true,
		loop: true,
		autoplay: true,
		items: 1,
	});

	/*------------------
		Image Popup
	--------------------*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});
	
	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});

	/*------------------
		Progress Bar
	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});

	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cpid 	= $(this).data("cpid");

		$(this).prepend('<div class="'+ cpid +' circle-warp"><h2>'+ cpvalue +'%</h2></div>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 112,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 112,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});

})(jQuery);

(function () {
	var LANGUAGE_KEY = 'petrol-language';
	var GOOGLE_COOKIE_KEY = 'googtrans';

	var translations = {
		pt: {
			promptTitle: 'Escolha o idioma',
			promptDescription: 'Como prefere navegar no site?',
			english: 'Inglês',
			portuguese: 'Português'
		},
		en: {
			promptTitle: 'Choose your language',
			promptDescription: 'How do you prefer to browse the website?',
			english: 'English',
			portuguese: 'Portuguese'
		}
	};

	function setCookie(name, value, domain) {
		var cookie = name + '=' + value + ';path=/';
		if (domain) {
			cookie += ';domain=' + domain;
		}
		document.cookie = cookie;
	}

	function applyLanguage(lang) {
		var normalizedLanguage = lang === 'en' ? 'en' : 'pt';
		var translateValue = '/pt/' + normalizedLanguage;

		localStorage.setItem(LANGUAGE_KEY, normalizedLanguage);
		setCookie(GOOGLE_COOKIE_KEY, translateValue);
		setCookie(GOOGLE_COOKIE_KEY, translateValue, window.location.hostname);

		document.documentElement.lang = normalizedLanguage;
	}

	function createLanguageModal() {
		if (document.body.getAttribute('data-language-modal-ready') === 'true') {
			return;
		}

		var modal = document.createElement('div');
		modal.className = 'language-modal-overlay';
		modal.innerHTML = '' +
			'<div class="language-modal">' +
				'<h3>' + translations.pt.promptTitle + '</h3>' +
				'<p>' + translations.pt.promptDescription + '</p>' +
				'<div class="language-options">' +
					'<button type="button" class="language-option" data-language="en" aria-label="English">' +
						'<span class="flag" aria-hidden="true">🇺🇸</span>' +
						'<span>' + translations.pt.english + '</span>' +
					'</button>' +
					'<button type="button" class="language-option" data-language="pt" aria-label="Português">' +
						'<span class="flag" aria-hidden="true">🇦🇴</span>' +
						'<span>' + translations.pt.portuguese + '</span>' +
					'</button>' +
				'</div>' +
			'</div>';

		document.body.appendChild(modal);
		document.body.setAttribute('data-language-modal-ready', 'true');

		modal.addEventListener('click', function (event) {
			var button = event.target.closest('.language-option');
			if (!button) {
				return;
			}

			applyLanguage(button.getAttribute('data-language'));
			modal.remove();
		});
	}

	window.googleTranslateElementInit = function () {
		if (!document.getElementById('google_translate_element')) {
			var hiddenContainer = document.createElement('div');
			hiddenContainer.id = 'google_translate_element';
			hiddenContainer.style.display = 'none';
			document.body.appendChild(hiddenContainer);
		}

		if (window.google && window.google.translate && window.google.translate.TranslateElement) {
			new window.google.translate.TranslateElement({
				pageLanguage: 'pt',
				autoDisplay: false
			}, 'google_translate_element');
		}
	};

	function loadGoogleTranslateScript() {
		if (document.querySelector('script[data-google-translate="true"]')) {
			return;
		}

		var script = document.createElement('script');
		script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
		script.async = true;
		script.defer = true;
		script.dataset.googleTranslate = 'true';
		document.body.appendChild(script);
	}

	document.addEventListener('DOMContentLoaded', function () {
		var selectedLanguage = localStorage.getItem(LANGUAGE_KEY);

		loadGoogleTranslateScript();

		if (!selectedLanguage && window.location.pathname.match(/\/index\.html$|\/$/)) {
			createLanguageModal();
			return;
		}

		if (selectedLanguage) {
			applyLanguage(selectedLanguage);
		}
	});
})();
