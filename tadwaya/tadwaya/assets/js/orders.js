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
			url: 'http://13.126.56.1:8132/generate/user/fetchAllOrders?userId='+ userId,
			beforeSend: function(request) {
				request.setRequestHeader("authToken", authToken);
				request.setRequestHeader("content-type", 'application/json');
			},
			type: 'POST',
			success: function(data) {
				// alert('Tadvaya: fetch all orders Success');
				formattedData = formatDate(data);
				var context = { "orderdata": data };
				var orderhtml = template(context);
				$('.table-wrapper').html(orderhtml);
				console.log('success fetchallorders: ', data);
			},
			error: function(data) {
				alert('login error');
				console.log('failure fetchallorders: ', data);
			}
			});

		function formatDate(array) {
			return array.forEach(function(element, index) {
					element.date = element.date.toString();
					var year = element.date.substring(0, 4);
					var month = element.date.substring(4, 6);
					var date = element.date.substring(6, 8);
					element.date = date + '-' + month + '-' + year;
				});
		}

		$(document).on("click", '.download-link', function() {
			console.log('download link = ', $(this).data('order-id'));
			var orderid = $(this).data('order-id');
			localStorage.setItem("orderIDforDownload", orderid);
			window.location.href="downloads.html";
			// downloadFile(orderid);
		});


		// function downloadFile(orderid) {
		// 	var authToken = localStorage.getItem('authToken');
		// 	var userId = localStorage.getItem('userId');
		// 	$.ajax({
		// 		url: 'http://ec2-13-232-25-67.ap-south-1.compute.amazonaws.com:8080/user/downloadFile?userId='+ userId + '&fileName=file.csv&orderId=' + orderid,
		// 		beforeSend: function(request) {
		// 			request.setRequestHeader("authToken", authToken);
		// 			request.setRequestHeader("content-type", 'application/json');
		// 		},
		// 		type: 'POST',
		// 		success: function(data) {
		// 			var popupStatus =  data.Status;
		// 			var popupMsg =  data.Message;
		// 			$('#myModal .modal-body').text(data.Message);
		// 			$('#myModal').modal('show');
		// 			console.log('success download:', data);
		// 		},
		// 		error: function(data) {
		// 			$('#myModal .modal-body').text(JSON.parse(data.responseText).message);
		// 			$('#myModal').modal('show');
		// 		}
		// 	});
		// }

	});

})(jQuery);
