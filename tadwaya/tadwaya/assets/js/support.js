/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {
		
		var authToken = localStorage.getItem('authToken');
		if (authToken == "" || authToken == null) {
			$('#menu-dashboard-id').hide();
			$('#menu-logout-id').hide();
			$('#menu-login-id').show();
		} else {
			$('#menu-dashboard-id').show();
			$('#menu-login-id').hide();
			$('#menu-logout-id').show();
		}
	});

})(jQuery);