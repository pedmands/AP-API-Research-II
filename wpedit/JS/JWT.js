(function($){

	const RESTROOT = 'localhost/WP-API-2/wp-json';
	const $ENTRYTITLE = $('.post-title');
	const $LOGIN = $('#loginform');
	const $LOGOUT = $('#logout');

	$LOGIN.toggle();
	$('#login_button').click(function(e){
		e.preventDefault();
		let username = document.querySelector('#user_login').value;
		let password = document.querySelector('#user_pass').value;
		console.info("Username: " + username + " Password: " + password);
	});

})(jQuery);
