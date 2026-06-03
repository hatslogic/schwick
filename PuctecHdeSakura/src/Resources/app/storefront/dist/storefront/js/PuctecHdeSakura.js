// $( document ).ready(function() {
// 	$('body').on('click', '.buy_quantity_minus', function() {
// 		if ($(this).siblings(".product-detail-quantity-select").val() > 0) {
// 			let inputValue = $(this).siblings(".product-detail-quantity-select").val();
// 			inputValue--;
// 			$(this).siblings(".product-detail-quantity-select").val(inputValue);
// 		}
// 	});
// 	$('body').on('click', '.buy_quantity_plus', function() {
// 		//find element
// 		if ($(this).siblings(".product-detail-quantity-select").val() >= 0) {
// 			let inputValue = $(this).siblings(".product-detail-quantity-select").val();
// 			inputValue++;
// 			$(this).siblings(".product-detail-quantity-select").val(inputValue);
// 		}
// 	});
//
// 	//logic for 2 types of registration
// 	if (window.location.href.indexOf("account/login") > -1
// 		|| window.location.href.indexOf("checkout/register") > -1
// 		|| window.location.href.indexOf("account/register") > -1
// 	) {
//
// 		//hide option create no account
// 		$('.register-guest-control').hide();
//
// 		changeRegistrationType();
// 	}
//
// 	//show text on top of form (select default choice)
// 	if (window.location.href.indexOf("checkout/register") > -1 ){
// 		$('.hde-registration-smallbusiness').show();
//
// 	}
//
// 	//hide show more in product boxes
// 	$(".hde-tech-info-add-list").each(function() {
// 		var techInfoAddList = $(this);
//
// 		if ($.trim(techInfoAddList.html()) === '') {
// 			techInfoAddList.parent().parent().parent().hide();
// 		}
// 	});
//
// });
//
//
// function changeRegistrationType(){
// 	let group = getUrlParameter('group');
// 	if(window.location.href.indexOf("checkout/register") > -1 ){
// 		group = "smallbusiness";
// 	}
//
// 	let smallbusinessGroupID = '28df66ad5b754d62be2ba02d5115decf';
// 	let distributorGroupID = '91e80d36381c4b6796eb685c719abe46';
// 	let germanySelectID = 'edcd2f8760d74eaa9b864a1ced422262';
// 	const e = new Event("change");
// 	const element = document.querySelector('#accountType');
//
// 	// We don't need DOM reference for the elements, but just a string with html.
// 	// With the clone() approach, you can't append these elements in different places because you'll be appending the same elements, resulting in only the "latest" append working.
//
// 	// var originalSelectOptions = $('#billingAddressAddressCountry option').clone();
// 	var originalSelectOptions = $('#billingAddressAddressCountry option').map(function() {
// 		return this.outerHTML;
// 	}).get().join('');
//
// 	//texts on top
// 	if(group == "smallbusiness"){
//
// 		$('.register-card').parent().show();
// 		$('.register-card').show();
//
// 		$('.hde-registration-smallbusiness').show();
// 		$('.hde-registration-distributor').hide();
// 		$('#accountType option[value="'+smallbusinessGroupID+'"]').attr('selected', 'selected');
// 		element.dispatchEvent(e);
//
// 		//hide login form
// 		$('.login-card').parent().hide();
//
// 		//for smallbusiness allow only Deustchland for country
// 		//$('#billingAddressAddressCountry').val(germanySelectID);
// 		//$('#shippingAddressAddressCountry').val(germanySelectID);
// 		// Remove all other options except the selected one
// 		//$('#billingAddressAddressCountry option:not(:selected)').remove();
// 		//$('#shippingAddressAddressCountry option:not(:selected)').remove();
//
// 		//for small business VAT ID is required
// 		//if element not yet on page, wait and repeat
// 		/*
//         if (document.getElementById("vatIds") == null) {
//             setTimeout(setVatIdRequired(), 1000);
//         }else{
//             setVatIdRequired();
//         }
//         */
//
// 	} else if (group == "distributor"){
//
// 		$('.register-card').parent().show();
// 		$('.register-card').show();
//
// 		$('.hde-registration-smallbusiness').hide();
// 		$('.hde-registration-distributor').show();
// 		$('#accountType option[value="'+distributorGroupID+'"]').attr('selected', 'selected');
// 		element.dispatchEvent(e);
//
// 		//for distributor set Firma required
// 		$('label[for="billingAddresscompany"]').append('<span>*</span>');
// 		$('#billingAddresscompany').prop('required', true);
//
// 		//hide login form
// 		$('.login-card').parent().hide();
// 	} else {
// 		$('.login-card').show();
// 		//hide registration form if no parameter but show on checkout page
// 		if( window.location.href.indexOf("checkout/register") > -1 ) {
// 			// show login + form
// 			$('.register-card').parent().show();
// 			$('.register-card').show();
// 		}
// 	}
//
// 	$('select#accountType').on('change', function() {
// 		if(this.value == smallbusinessGroupID ){
// 			$('.hde-registration-smallbusiness').show();
// 			$('.hde-registration-distributor').hide();
// 			//for smallbusiness allow only Deustchland for country
// 			//$('#billingAddressAddressCountry').val(germanySelectID);
// 			//$('#shippingAddressAddressCountry').val(germanySelectID);
// 			// Remove all other options except the selected one
// 			//$('#billingAddressAddressCountry option:not(:selected)').remove();
// 			//$('#shippingAddressAddressCountry option:not(:selected)').remove();
// 			//for small business set Firma NOT required
// 			//$('label[for="billingAddresscompany"]').find('span').remove();
// 			$('#billingAddresscompany').prop('required', false);
// 		}else if(this.value == distributorGroupID){
// 			$('.hde-registration-smallbusiness').hide();
// 			$('.hde-registration-distributor').show();
// 			//reset selectoption to all countries
// 			// Empty the select element
// 			//$('#billingAddressAddressCountry').empty();
// 			//$('#shippingAddressAddressCountry').empty();
// 			// Append the original options back to the select element
// 			//$('#billingAddressAddressCountry').append(originalSelectOptions);
// 			//$('#shippingAddressAddressCountry').append(originalSelectOptions);
// 			//for distributor set Firma required
// 			$('label[for="billingAddresscompany"]').append('<span>*</span>');
// 			$('#billingAddresscompany').prop('required', true);
// 		}
// 	});
//
// }
//
// function setVatIdRequired(){
// 	//VAT ID
// 	//required only for smallbusiness
//
// 	$('#vatIds').attr('required', true);
// 	$('label[for="vatIds"]').append('<span>*</span>');
//
// 	var submitBtn = $('button[type="submit"]');
//
// 	$('#vatIds').on('keyup', function(){
// 		var inputValue = $(this).val();
// 		var alertMsg = '';
// 		if(inputValue.indexOf('DE') == -1){
// 			alertMsg = '<span style="color: red;">Bitte gib eine gültige deutsche VAT ein. Wenn dein Unternehmen nicht in Deutschland ansässig ist, benutze bitte das <a href="/Registrierungsformular-Grosskundenregistrierung">Großkundenregistrierung Formular</a></span>';
// 			submitBtn.prop('disabled', true);
// 		} else {
// 			submitBtn.prop('disabled', false);
// 		}
// 		$('label[for="vatIds"]').find('.alert-msg').remove();
// 		$('label[for="vatIds"]').append('<span class="alert-msg">' + alertMsg + '</span>');
// 	});
// }
//
//
// function removeRequired(){
// 	//Company not required remove required and "*"
// 	let label = $("label[for='billingAddresscompany']");
// 	labelText = label.text().replace("*", '');
// 	label.text(labelText);
// 	$('input#billingAddresscompany').removeAttr('required');
// }
//
//
// var getUrlParameter = function getUrlParameter(sParam) {
// 	var sPageURL = window.location.search.substring(1),
// 		sURLVariables = sPageURL.split('&'),
// 		sParameterName,
// 		i;
//
// 	for (i = 0; i < sURLVariables.length; i++) {
// 		sParameterName = sURLVariables[i].split('=');
//
// 		if (sParameterName[0] === sParam) {
// 			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
// 		}
// 	}
// 	return false;
// };
//
