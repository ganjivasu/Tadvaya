/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {
//logger.error("Failed",e);
		console.log("in search")
		$(document).on('click', '#search-product', function() {
			var searchProductData = {
				"id": $('#product-id').val(),
				"latitude": $('#product-lat').val(),
				"longitude": $('#product-long').val(),
				"clientId": $('#product-clientid').val()
			 };

			var authToken = localStorage.getItem('authToken');
			$.ajax({
				url: 'http://13.126.56.1:8142/generate/user/search',
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(searchProductData),

				success: function(data) {
					var popupStatus =  data.Status;
					var popupMsg =  data.Message;
					$('#myModal .modal-body').text(data.Message);
					$('#myModal').modal('show');
					console.log('Tadvaya: Success - ', data);
				},
				error: function(data) {
					console.log('failure: ', data);
				}
			  });
		});
		$(document).on('click', '#searchSuccess-close', function() {
			$('#search-product-container').find('input:text').val('');  
		});

	});

})(jQuery);
