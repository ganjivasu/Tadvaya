/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		$("#register-id").click(function() {

			var email = $('#email').val(),
					name = $('#username').val(),
					password = $('#password').val(),
					clientId = $('#clientid').val();

			var registerData = {
				"email": email,
				"name": name,
				"password": password,
				"clientID": clientId
			 };


			if (email == '' || name == '' || password == '' || clientId == '') {
				$('#modal-alert-id .modal-body').text("Please enter all mandatory values to register !!");
				$('#modal-alert-id').modal('show');
				return;
			} 


			$.ajax({
				url: 'http://13.126.56.1:8132/generate/register',
				type: 'POST',
				data: JSON.stringify(registerData),
				beforeSend: function(request) {
					request.setRequestHeader("content-type", 'application/json');
				  },
				success: function(data) {
					// alert('Tadvaya: Login Success');
					if (data.errorCode === 'E106' || data.errorCode === 'E105') {
						$('#modal-alert-id .modal-body').text(data.message);
						$('#modal-alert-id').modal('show');
						return;
					}
				  console.log('success: ', data);
				  var popupStatus =  data.status;
				  var popupMsg =  data.message;
				  $('#myModal .modal-body').text(data.message);
				  $('#myModal').modal('show');
				},
				error: function(data) {
					// alert('login error');
					console.log('failure: ', data);
				}
			  });
		});


		$("#createSuccess-close").click(function() {
			window.location.href="login.html";
		});

		$(".login-form input#password").on( "keypress", function(event) {
			if (event.which == 13 && !event.shiftKey) {
				event.preventDefault();
				$("#login-id").trigger('click');
			}
		});

	});

})(jQuery);
