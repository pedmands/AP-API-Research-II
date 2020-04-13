(function($){

	const RESTROOT = 'http://localhost/WP-API-2/wp-json';
	const $ENTRYTITLE = $('.post-title');
	const $LOGIN = $('#loginform');
	const $LOGOUT = $('#logout');

	function getToken(username,password) {

		$.ajax({
			url: RESTROOT + '/jwt-auth/v1/token',
			method: 'POST',
			data: {
				'username' : username,
				'password' : password
			}
		})

		.done(function(response){
			sessionStorage.setItem('jwtToken', response.token);
			$LOGIN.toggle();
			$LOGOUT.toggle();
		})

		.fail(function(response){
			console.error("REST error.");
		})
	}

	function clearToken() {
		sessionStorage.removeItem('jwtToken');
		$LOGIN.toggle();
		$LOGOUT.toggle();
	}

	$LOGIN.toggle();
	$('#login_button').click(function(e){
		e.preventDefault();
		let username = document.querySelector('#user_login').value;
		let password = document.querySelector('#user_pass').value;
		console.info("Username: " + username + " Password: " + password);

		// Get JWT token
		getToken( username, password );
	});

	// Clear token on logout
	$('#logout').click(clearToken);

})(jQuery);
