/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		$("#register-id").click(function() {
			window.location.href = 'register.html';
		});

		$("#login-id").click(function() {

			var email = $('#demo-email').val(),
				password = $('#demo-password').val();

			if (email == '' || password == '') {
				$('#modal-alert-id .modal-body').text("Please enter correct username/password to login !!");
				$('#modal-alert-id').modal('show');
				return;
			}

			var loginData = {
				"email": email,
				"password": password,
			 };



			$.ajax({
				url: common.loginURL,
				type: 'POST',
				data: JSON.stringify(loginData),
				beforeSend: function(request) {
					request.setRequestHeader("content-type", 'application/json');
				},
				success: function(data) {
					// alert('Tadvaya: Login Success');
					if (data.errorCode === 'E106') {
						$('#modal-alert-id .modal-body').text(data.message);
						$('#modal-alert-id').modal('show');
						return;
					}
					localStorage.setItem('authToken', data.authToken);
					// localStorage.setItem('userId', data.id);
					localStorage.setItem('clientId', data.clientID);
					window.location.href="dashboard.html";
				  	console.log('success: ', data);
				},
				error: function(data) {
					// alert('login error');
					$('#modal-alert-id .modal-body').text(data.responseJSON.message);
					$('#modal-alert-id').modal('show');
					console.log('failure: ', data);
				}
			  });
		});

		$(".login-form input#demo-password").on( "keypress", function(event) {
			if (event.which == 13 && !event.shiftKey) {
				event.preventDefault();
				$("#login-id").trigger('click');
			}
		});

	});

})(jQuery);
