$(document).ready(function () {
	$('.burger__menu').click(function(event) {
		$('.burger__menu,.menu').toggleClass('active');
	});
});

const swiper = new Swiper('.swiper-container', {
	// Optional parameters
  
	// If we need pagination
	pagination: {
	  el: '.swiper-pagination',
	  type: 'fraction',
	},
	slidesPerView: 1.5,
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
	breakpoints: {// настройки для разных разрешений
		768: {
			slidesPerView: 'auto',
			spaceBetween: 8
		},
		991: {
			slidesPerView: 1,
			spaceBetween: 30
		},
		1192: {
			slidesPerView: 1.5,
			spaceBetween: 20
		}
	}
  
	// And if we need scrollbar
  });

  const swiper2 = new Swiper('.swiper-container2', {
	// Optional parameters
	centeredSlides: true,
	// If we need pagination
	// Navigation arrows
	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},
  
	// And if we need scrollbar
  });


document.querySelector('#popap1-btn').addEventListener('click', function() {
	$('.modal').addClass('active');
	$('.modal__form-close').click(function(event) {
		$('.modal').removeClass('active');
	});
})

document.querySelector('#popap4-btn').addEventListener('click', function() {
	$('.modal__question').css('display', 'block');
	$('.modal__question-close').click(function(event) {
		$('.modal__question').css('display', 'none');
	});
})


$('.menu__burger').click(function(event) {
	$('.menu__burger').toggleClass('active');
	$('.menu').toggleClass('active');
});