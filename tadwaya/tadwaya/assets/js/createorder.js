/*
	Introspect by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	$(function() {

		$(document).on('click', '#create-order-id', function() {
			var pid = $('#product-code').val(),
				name = $('#product-name').val(),
				pType = $('#product-type').val(),
				count = $('#product-count').val(),
				manufDate = $('#add-manf-date').val(),
				expDate = $('#add-expiry-date').val();

			if(pid == '' || name == '' || pType == '' || count == '' || manufDate == '' || expDate == '') {
				$('#modal-alert-id .modal-body').text("Please enter all mandatory values to create an order !!");
				$('#modal-alert-id').modal('show');
				return;
			}

			if(parseInt(count, 10) % 10 != 0) {
				$('#modal-alert-id .modal-body').text("Product Count should be multiples of 10 to create an order !!");
				$('#modal-alert-id').modal('show');
				return;
			}

			if(expDate < manufDate) {
				$('#modal-alert-id .modal-body').text("Expiry Date to be greater than Manufacture Date to create an order !!");
				$('#modal-alert-id').modal('show');
				return;
			}

			var createOrderData = {
				"extProductID": $('#product-code').val(),
				"extProductType": $('#product-type').val(),
				"extSKUID": $('#product-skuid').val(),
				"name": $('#product-name').val(),
				"requestedAmount": $('#product-count').val(),
				"isBoxOrder": $('#is-box-order').is(':checked'),
				"is2SV": $('#is-2-step-verification').is(':checked'),
				"extras": getExtras(),
				"extExtras": getExtExtras(),
			 };

			var authToken = localStorage.getItem('authToken');
			$.ajax({
				url: common.createOrderURL,
				beforeSend: function(request) {
					request.setRequestHeader("authToken", authToken);
					request.setRequestHeader("content-type", 'application/json');
				  },
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(createOrderData),

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
			
			var manufDate = $('#add-manf-date').val();
			var expDate = $('#add-expiry-date').val();
			var genericInputs = $(".add-generic-class")

			var genericArr = [];

			for(var i = 0; i < genericInputs.length; i++) {
				genericArr.push($(genericInputs[i]).val());
			}

			var extras = '';

			if (manufDate) {
				extras =  'ManufacturedDate:' + manufDate + '|';
			}
			if (expDate) {
				extras = extras + 'ExpiryDate:' + expDate + '|';
			}
			if (genericArr.length > 0) {
				for (var k = 0; k < genericArr.length; k++) {
					extras = extras + genericArr[k] + '|';
				}
			}

			return extras;
		}

		function getExtExtras() {
			
			var genericInputs = $(".add-generic-class-customer-facing")

			var genericArr = [];

			for(var i = 0; i < genericInputs.length; i++) {
				genericArr.push($(genericInputs[i]).val());
			}

			var extras = '';

			if (genericArr.length > 0) {
				for (var k = 0; k < genericArr.length; k++) {
					extras = extras + genericArr[k] + '|';
				}
			}

			return extras;
		}

		$("#createSuccess-close").click(function() {
			window.location.href="dashboard.html";
		});

		$(".dropdown-item").click(function(ele) {
			if(!$(this).is('[disabled=disabled]')) {
				var id = $(this).data('id');
				var placeholder = $(this).data('text');
				$('#'+id).toggle();
				$(this).prop('disabled', true);
			} else {
				$(this).removeProp('disabled');
			}
			
		});

		$(".dropdown-item-generic").click(function(ele) {
				var id = $(this).data('id');
				var cls = $(this).data('class');
				var placeholder = $(this).data('text');
				$('#create-order-container').append('<div class="12u 12u$(xsmall)"><input type="text" style="width: 90% !important;" id="' + id
				+ '"class = "' + cls 
				+ ' "product-count" placeholder="' + placeholder 
				+ '"Product Count (Example:1234)" /> <button class="btn-danger delete-generic">X</button> </div>');
		});

		$(".dropdown-item-generic-customer-facing").click(function(ele) {
			var id = $(this).data('id');
			var cls = $(this).data('class');
			var placeholder = $(this).data('text');
			$('#create-order-container-customer-facing').append('<div class="12u 12u$(xsmall)"><input type="text" style="width: 90% !important;" id="' + id
			+ '"class = "' + cls 
			+ ' "product-count" placeholder="' + placeholder 
			+ '"Product Count (Example:1234)" /> <button class="btn-danger delete-generic">X</button> </div>');
		});


		$(document).on('click', '.delete-generic', function() {
			$(this).closest('.12u').remove();
		});


	});

})(jQuery);
