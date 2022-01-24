/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		var pordernum = localStorage.getItem('p-ordernum');
		var pextras = localStorage.getItem('p-extras');
		var pname = localStorage.getItem('p-name');
		var pprodid = localStorage.getItem('p-prodid');
		var pprodtype = localStorage.getItem('p-prodtype');
		var pextras = localStorage.getItem('p-extras');

		var prodexras = pextras.split('|')


		$('#product-orderNum').val(pordernum);
		$('#product-name').val(pname);
		$('#product-code').val(pprodid);
		$('#product-type').val(pprodtype);
		prodexras[0] ? $('#add-manf-date').val(prodexras[0]) : $('#add-manf-date').val("No Manufacture date");
		prodexras[1] ? $('#add-expiry-date').val(prodexras[1]) : $('#add-expiry-date').val("No Exp Date");
		$('#product-count').focus();

		$(document).on('click', '#create-parent-order-id', function() {

			var parentProdCount = $('#product-count').val()

			if(parentProdCount == "" || parseInt(parentProdCount, 10) % 10 != 0) {
				$('#modal-alert-id .modal-body').text("Please enter 'Parent Product count' in multiples of 10 to create an order !!");
				$('#modal-alert-id').modal('show');
				return;
			}

			var createBoxOrderData = {
				"parentOrderId": pordernum, // sending the dashboard tile order number as parent order id
				"customerID": localStorage.getItem('userId'),
				"productID": pprodid,
				"name": pname,
				"productType": pprodtype,
				"requestedAmount": $('#product-count').val(),
				"extras": getExtras(),
				"isBoxOrder": true,
				"is2SV": false,
			 };

			var authToken = localStorage.getItem('authToken');
			$.ajax({
				url: common.createParentOrderURL,
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(createBoxOrderData),

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

		function getExtras() {
			var extras = '';

			if (prodexras.length > 0) {
				for (var k = 0; k < prodexras.length - 1; k++) {
					extras = extras + prodexras[k] + '|';
				}
			}

			return extras;
		}

		$("#createSuccess-close").click(function() {
			window.location.href="dashboard.html";
		});

	});

})(jQuery);
