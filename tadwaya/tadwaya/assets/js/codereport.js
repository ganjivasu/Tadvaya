/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var source   = $("#codereport-card-template").html();
		var template = Handlebars.compile(source);

		var authToken = localStorage.getItem('authToken');
		// var userId = localStorage.getItem('userId');
		var params = new window.URLSearchParams(window.location.search);
		var orderId = params.get('orderid');
		localStorage.setItem('orderIDforDownload', orderId);
		var orderData;

		AOS.init();

		$.ajax({
			url: common.codeReportURL + orderId,
			type: 'POST',
			beforeSend: function(request) {
				request.setRequestHeader("authToken", authToken);
				request.setRequestHeader("content-type", 'application/json');
			},
			success: function(data) {
				var context =  data;
				orderData = context;
				var codereporthtml = template(context);
				$('#card-wrapper').html(codereporthtml);

				console.log('success codeReport: ', data);
			},
			error: function(data) {
				alert('codereport error');
				console.log('failure codeReport: ', data);
			}
		});


		$(document).on("click", '.create-parent-order-btn', function() {
			var porderId = orderData.dashboardOrder.orderNo;
			var pextras = orderData.dashboardOrder.extras;
			var pname = orderData.dashboardOrder.name;
			var pprodid = orderData.dashboardOrder.prodId;
			var pprodtype = orderData.dashboardOrder.prodType;

			localStorage.setItem('p-ordernum', porderId);
			localStorage.setItem('p-name', pname);
			localStorage.setItem('p-prodid', pprodid);
			localStorage.setItem('p-prodtype', pprodtype);
			localStorage.setItem('p-extras', pextras);
			
			window.location.href="createparentorder.html";
		});

	});
})(jQuery);
