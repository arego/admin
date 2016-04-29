	// webshim.setOptions('forms', {
 //	//show custom styleable validation bubble
	//	 replaceValidationUI: true,
	//	 lazyCustomMessages: true
	// });

	// //start polyfilling
	// webshim.polyfill('forms');

$(function() {
	'use strict'

	var $labelArr = $('label'),
		$inputArr = $('input'),
		inputAudio = $('#Input').get(0),
		labelAudio = $('#Label').get(0),
		$selectArr = $('#State, #Country');
	
	$labelArr.each( function() {
	 	$(this).on('mouseover', function() { 
	 		labelAudio.play();
	 	})
	 });
	$inputArr.each( function() {
	 	$(this).on('mouseover', function() { 
	 		inputAudio.play();
	 	})
	 });

	$inputArr.each(function(item, elem) {
	let $that = $(this);

	$that
		.focus(function() {
			if (!$that.data('defaultText')) {
				$that.data('defaultText', $that.attr('placeholder'));
			}
			$that.attr('placeholder', '');
		})
		.blur(function() {
			if ('' == $that.val()) {
				$that.attr('placeholder', $that.data('defaultText'));
			}
		});
	})

	$.each($selectArr, function() {
		$(this).on('click', function(el) {
			let options = this.children;

			for(let i=0; i < this.childElementCount; i++) {
				$(options[i]).css('color', '#b4c2cd');
			}
		});
	})

	// jQuery.validator.addMethod('firstName', function(value, element){
	//	 if (/^[a-zA-Z][a-zA-Z0-9-_\.]/.test(value)) {
	//		 return true;  // FAIL validation when REGEX matches
	//	 } else {
	//		 return false;   // PASS validation otherwise
	//	 };
	// }, 'FirstName was filled out not correctly.');

	$.validator.addMethod('firstName', function(value, element) {
		return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9-_\.]/.test(value);
	}, 'FirstName was filled out not correctly.');

	jQuery.validator.addMethod('lastName', function(value, element) {
		return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9-_\.]/.test(value);
	}, 'LastName was filled out not correctly.');

	jQuery.validator.addMethod('middleName', function(value, element) {
		return this.optional(element) || /^[a-zA-Z][a-zA-Z0-9-_\.]/.test(value);
	}, 'MiddleName was filled out not correctly.');

	jQuery.validator.addMethod('password', function(value, element) {
		return this.optional(element) || /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(value);
	}, 'Password was filled out not correctly.');

	$('#signupForm').validate({
		rules: {
			FirstName: {
				required: true,
				minlength: 2,
				maxlength: 50,
				firstName: true
			},
			LastName: {
				required: true,
				minlength: 2,
				maxlength: 50,
				lastName: true
			},
			MI: {
				minlength: 2,
				maxlength: 50,
				middleName: true
			},
			Password: {
				required: true,
				minlength: 6,
				maxlength: 16,
				password: true
			},
			ConfPassword: {
				required: true,
				minlength: 6,
				maxlength: 16,
				confPassword: true
			},
			Phone: {
				required: true,
				minlength: 6,
				maxlength: 50,
				phone: true
			}
		},
		messages: {
			FirstName: {
				required: 'Please enter your FirstName.',
				minlength: 'First name must be at least 2 characters.',
				maxlength: 'Max length for First Name is 50.',
				firstName: 'First Name was filled out not correctly.' 
			},
			LastName: {
				required: 'Please enter your LastName.',
				minlength: 'Last name must be at least 2 characters.',
				maxlength: 'Max length for Last Name is 50.',
				lastName: 'Last Name was filled out not correctly.'
			},
			MI: {
				required: 'Please enter your MiddleName',
				minlength: 'Middle name must be at least 2 characters',
				maxlength: 'Max length for Middle Name is 50',
				middleName: 'Middle Name was filled out not correctly.' 

			},
			Password: {
				required: 'Please enter your Password',
				minlength: 'Password must be at least 6 characters',
				maxlength: 'Max length for Password is 20',
				password: 'Password was filled out not correctly.' 
			},
			ConfPassword: {
				required: 'Please enter your Password',
				minlength: 'Password must be at least 6 characters',
				maxlength: 'Max length for Password is 20',
				confPassword: 'Password was filled out not correctly.'
			},
			Phone: {
				required: 'Please enter your Phone',
				minlength: 'Phone must be at least 6 characters',
				maxlength: 'Max length for Password is 50',
				phone: 'Phone was filled out not correctly.' 
			}
		}
	});

	// $('#FirstName').on('keypress', function (e) {
	//	 if (!((64 < e.keyCode && 91 > e.keyCode) ||
	//		(96 < e.keyCode && 123 > e.keyCode) ||
	//		(45 == e.keyCode) ||
	//		(46 == e.keyCode) ||
	//		(95 == e.keyCode))) {
	//	 	return false;
	//	 	e.stopPropagation(); ////////////////////////////////////////
	// 	}
	// });

	$('input').each(function (i, elem) {
		$(elem).on('drop', function() {
				return false;
		});
	});
});