/* Kriptovalute.hr - minimalne skripte za početnu stranicu (bez owl, magnific, countdown) */
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
		/*PRELOADER JS*/
		function hidePreloader() {
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow');
		}
		/* If window already loaded (e.g. from cache), hide immediately */
		if (document.readyState === 'complete') {
			hidePreloader();
		} else {
			$(window).on('load', hidePreloader);
		}
		/* Fallback: hide after 5 seconds no matter what */
		setTimeout(function() {
			$('.preloader').fadeOut('slow');
		}, 5000);
		/*END PRELOADER JS*/		
			
		/*START MENU JS*/		
		function windowScroll() {
			const navbar = document.getElementById("navbar");
			if (navbar && (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50)) {
				navbar.classList.add("nav-sticky");
			} else if (navbar) {
				navbar.classList.remove("nav-sticky");
			}
		}
		window.addEventListener('scroll', windowScroll);
		/*END MENU JS*/	
	}); 	

	/*START WOW ANIMATION JS - samo na desktopu*/
	var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		|| window.innerWidth < 768;
	if (!isMobileDevice && typeof WOW !== 'undefined') {
		new WOW().init();
	}
	/*END WOW ANIMATION JS*/
})(jQuery);
