$(document).ready(function () {
	$('.burger__menu').click(function(event) {
		$('.burger__menu,.menu').toggleClass('active');
		$('body').toggleClass('no-active');
	});
});

window.onload = function() {
	$('body').toggleClass('no-active');
	$('.preloader').css('opacity', '0');
	setTimeout(() => {
		$('.preloader').css('display', 'none');
	}, 1000);
}


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
	$('body').toggleClass('no-active');
	$('.modal__form-close').click(function(event) {
		$('.modal').removeClass('active');
		$('body').toggleClass('no-active');
	});
})
document.querySelector('#popap3').addEventListener('click', function() {
	$('.modal').addClass('active');
	$('body').toggleClass('no-active');
	$('.modal__form-close').click(function(event) {
		$('.modal').removeClass('active');
		$('body').toggleClass('no-active');
	});
})

document.querySelector('#popap4-btn').addEventListener('click', function() {
	$('.modal__question').css('display', 'block');
	$('body').toggleClass('no-active');
	$('.modal__question-close').click(function(event) {
		$('.modal__question').css('display', 'none');
		$('body').toggleClass('no-active');
	});
})


$('.menu__burger').click(function(event) {
	$('.menu__burger').toggleClass('active');
	$('.menu').toggleClass('active');
	$('body').toggleClass('no-active');
});

$('.menu_item').click(function(event) {
	$('.menu__burger').toggleClass('active');
	$('.menu').toggleClass('active');
	$('body').toggleClass('no-active');
});


$('.faq-btn1').click(function(event) {
	$('.faq1').toggleClass('off');
	$('.faq-btn1').toggleClass('off');
});

$('.faq-btn2').click(function(event) {
	$('.faq2').toggleClass('off');
	$('.faq-btn2').toggleClass('off');
});

$('.faq-btn3').click(function(event) {
	$('.faq3').toggleClass('off');
	$('.faq-btn3').toggleClass('off');
});

$('.faq-btn4').click(function(event) {
	$('.faq4').toggleClass('off');
	$('.faq-btn4').toggleClass('off');
});

$('#popap-th-close').click(function(event) {
	$('.popup-th').css('display', 'none');
});

$('.modal__form-btn').click(function() {
	var a = document.querySelector('.modal__form-input-name'),
		b = document.querySelector('.modal__form-input-tel');
	if (a.value == '' || b.value == '') {
		
	} else {
		$('.modal').removeClass('active');
		$('body').toggleClass('no-active');
		thank()
	}
})


function thank() {
	$('.popup-th').css('display', 'block');
	setTimeout(() => {
		$('.popup-th').css('display', 'none');
	}, 3000);
}

$('.modal__question-btn').click(function() {
	var a = document.querySelector('.modal__question-input-tel'),
		c = document.querySelector('.modal__question-input-name'),
		b = document.querySelector('.modal__question-text');
	if (a.value == '' || b.value == '' || c.value == '') {
		
	} else {
		$('.modal__question').css('display', 'none');
		$('body').removeClass('no-active');
		thank()
	}
})


$('#popap2-btn').click(function() {
	$('.calc').css('display', 'block');
	$('body').addClass('no-active');
	$('#calc-close').click(function() {
		$('.calc').css('display', 'none');
		$('body').removeClass('no-active');
	})
})


const swiper3 = new Swiper('.calc-swiper', {

	pagination: {
	  el: '.calc-swiper-pagination',
	  type: 'fraction',
	},

	centeredSlides: true,
	navigation: {
	  nextEl: '.calc-swiper-button-next',
	  prevEl: '.calc-swiper-button-prev',
	}

  });

