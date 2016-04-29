$(function() {
	'use strict'

	let degress = 0,
		timer,
		$body = $('body'),
		$myForm = $('#form'),
		$inputArr = $('input');

	const TIME = 120;
	
	// timer = setInterval(function() {
	// 	degress++;
	// 	$body.css('background', 'linear-gradient(' + degress + 'deg, #4b4e4c 2%, rgba(47, 45, 42, .5) 31%, rgba(65, 60, 53, .1) 100%, rgba(38, 35, 31, .5) 60%, #000), url(http://www.dialogue-organic.org/wp-content/uploads/2014/09/grey-background.jpg)');
	// }, TIME);

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

	var password = $('#Password'),
		confPassword = $('#ConfPassword');

	function validatePassword() {
		confPassword.next()
			.css('opacity', (password.val() != confPassword.val()) ? 1 : 0)
			.text(MESSAGES['NOTMATCH']);
		}

	$('#form').find(':submit').on('click', function() {
		let $formValid = $('#FormValid'),
			firstName = $('#FirstName').get(0),
			lastName = $('#LastName').get(0),
			loginName = $('#LoginName').get(0),
			password = $('#Password').get(0);

		let arr = [firstName, lastName, loginName, password];

		$.each(arr, function(i, e) {
			this.setCustomValidity('');
			if(this.checkValidity()) {
				$(this).next().css('opacity', 0);
			} else {
				this.setCustomValidity(' ');
				$(this).next()
					.text(MESSAGES[this.getAttribute('id').toUpperCase()])
					.css('opacity', 1);
			}
		});

		validatePassword();

		// $firstName.setCustomValidity('');
		// $lastName.setCustomValidity('');

		// if ($lastName.checkValidity()) {
		// 	$spanLName.css('opacity', 0);
		// } else {
		// 	$lastName.setCustomValidity(' ');
		// 	$spanLName
		// 		.text(MESSAGES.LASTNAMEMSG)
		// 		.css('opacity', 1);
		// }

		// $('#form').validator().submit(function(e) {
  //	   e.preventDefault(); //prevent submitting
  //	   console.log($('#form').data("validator").checkValidity());
  //   });

	})
})