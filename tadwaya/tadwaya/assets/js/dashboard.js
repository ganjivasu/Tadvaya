/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#dashboard-card-template").html();
		var template = Handlebars.compile(source);

		var authToken = localStorage.getItem('authToken');
		// var userId = localStorage.getItem('userId');
		AOS.init();

		$.ajax({
			url: common.dashboardURL,
			type: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("authToken", authToken);
				request.setRequestHeader("content-type", 'application/json');
			},
			success: function(data) {
				var context = { "dashboarddata": data.dashboardOrders };
				var dashboardhtml = template(context);
				$('#card-wrapper').html(dashboardhtml);
				console.log('success dashboard: ', data);
			},
			error: function(data) {
				// alert('dashboard error');
				$('#modal-alert-id .modal-body').text(data.responseJSON.message);
				$('#modal-alert-id').modal('show');
				console.log('failure dashboard: ', data);
			}
		});

		$(document).on("click", '.card-link', function() {
			var orderId = $(this).closest('.card').find('.orderNo').val();
			window.location.href="codereport.html?orderid=" + orderId;
		});

		$(document).on("click", '.parent-order-btn', function() {
			var porderId = $(this).closest('.card').find('.orderNo').val();
			var pextras = $(this).closest('.card').find('.pextras').val();
			var pname = $(this).closest('.card').find('.card-header').text();
			var pprodid = $(this).closest('.card').find('.pprodid').val();
			var pprodtype = $(this).closest('.card').find('.pprodtype').val();
			var pextras = $(this).closest('.card').find('.pextras').val();

			localStorage.setItem('p-ordernum', porderId);
			localStorage.setItem('p-extras', pextras);
			localStorage.setItem('p-name', pname);
			localStorage.setItem('p-prodid', pprodid);
			localStorage.setItem('p-prodtype', pprodtype);
			localStorage.setItem('p-extras', pextras);
			
			window.location.href="createparentorder.html";
		});

	});

})(jQuery);
