(function($){

	const RESTROOT = 'http://localhost/WP-API-2/wp-json';
	const $ENTRYTITLE = $('.post-title');
	const $LOGIN = $('#loginform');
	const $LOGOUT = $('#logout');

	function runAjax(postID,newTitle) {
		$.ajax({
			url : RESTROOT + '/wp/v2/posts/' + postID,
			method : 'POST',
			beforeSend: function(xhr) {
				xhr.setRequestHeader( 'Authorization', 'Bearer ' + sessionStorage.getItem('jwtToken') );
			},
			data: {
				'title' : newTitle
			}
		})

		.done(function(response){
			console.info(response);
			$('#title-input').toggle();
			$ENTRYTITLE.text(newTitle);
			$ENTRYTITLE.toggle();
			$('.navigation-list a[data-id="' + postID + '"]').text(newTitle);
			$('.edit-title.edit-button').toggle();
			$('.edit-title.save').toggle();

		})
	}

	// Add edit post functionality:
	function editPost() {

	    $ENTRYTITLE.after( '<button class="edit-button edit-title">Edit title</button><button class="edit-title save" style="display: none">Save title</button>' );

	    $('.edit-title.edit-button').click(function(){
	        let $originalTitle = $ENTRYTITLE.text();
	        $ENTRYTITLE.toggle();
	        $ENTRYTITLE.after('<input id="title-input" type="text">');
	        document.querySelector('#title-input').value = $originalTitle;
	        $(this).toggle();
	        $('.edit-title.save').toggle();
	    });

	    $('.save').click(function(){
			let postID = document.querySelector('.post').getAttribute('data-id');
			let newTitle = document.querySelector('#title-input').value;
			runAjax(postID,newTitle);
	    });

	}

	// Get JWT token
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
			editPost();
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

		$('.username').text(username);

		// Get JWT token
		getToken( username, password );
	});

	// Clear token on logout
	$('#logout').click(clearToken);

})(jQuery);
