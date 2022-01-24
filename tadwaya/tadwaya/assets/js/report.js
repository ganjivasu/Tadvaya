/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#student-template").html();
		var template = Handlebars.compile(source);
	
		var authToken = localStorage.getItem('authToken');
		var userId = localStorage.getItem('userId');
		$.ajax({
				url: 'http://13.126.56.1:8132/generate/user/codeReport?userID='+ userId,
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				},
				type: 'POST',
				success: function(data) {
					var context = { "reportdata": data };
					var reporthtml = template(context);
					$('.table-wrapper').html(reporthtml);
					console.log('success fetch code report: ', data);
				},
				error: function(data) {
					alert('report error');
					console.log('failure fetch code report: ', data);
				}
			});


		$(document).on("click", '.download-link', function() {
			console.log('download link = ', $(this).data('order-id'));
			var orderid = $(this).data('order-id');
			localStorage.setItem("orderIDforDownload", orderid);
			window.location.href="downloads.html";
		});

	});

})(jQuery);
