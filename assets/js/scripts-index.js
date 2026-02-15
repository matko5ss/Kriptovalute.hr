/* Kriptovalute.hr - minimalne skripte za početnu stranicu (bez owl, magnific, countdown) */
(function($) {
	'use strict';
	
	jQuery(document).on('ready', function(){
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow'); 
		}); 
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

	/*START WOW ANIMATION JS*/
	if (typeof WOW !== 'undefined') {
		new WOW().init();
	}
	/*END WOW ANIMATION JS*/	
})(jQuery);
