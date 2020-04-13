// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "http://localhost/";
const RESTROOT = "http://localhost/WP-API-2/wp-json";
const $ENTRYTITLE = $('.post-title');

var client = new JSO({
	providerID: "localhost",
	client_id: "eW3uQCQ9ZkXcAvTBZ5V4IEcxEhiefart7vYX8O77",
	redirect_uri: "http://127.0.0.1/", // The URL where you is redirected back, and where you perform run the callback() function.
	authorization: 'http://localhost/WP-API-2/oauth/authorize',
});

// Catch the response after login:
client.callback();

// Create the login button:
$('.site-branding').after( '<button id="login" class="login-button login">Login</button>' );

// Send POST request to the REST API via AJAX:
function runAjax(postID,newTitle) {

	$.ajax({
		url: RESTROOT + '/wp/v2/posts/' + postID,
		method: 'POST',
		data:{
			'title' : newTitle
		}
	})

	.done(function(response) {
		// console.log(response);
		$('#title-input').toggle();
		$ENTRYTITLE.text(newTitle);
		$ENTRYTITLE.toggle();
		$('.navigation-list a[data-id="' + postID +'"]').text(newTitle);
		$('.edit-title.edit-button').toggle();
		$('.edit-title.save').toggle();
	})

	.fail(function(response) {
		// console.error(response);
		$('#title-input').toggle();
		$ENTRYTITLE.toggle();
		$('.edit-title.save').toggle();
		$ENTRYTITLE.after('<aside class="error" style="background-color: #8b0000; color: white;">Something went wrong.');
	});
}

// Enable editing via the REST API:
function enableEdits() {

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


function oAuthLogin() {
	client.getToken(function(newToken) {
		console.log("I got the token: 💩 ", newToken.access_token);
	});
	enableEdits();
}


// Wipe sessionStorage and tokens on logout:
function oAuthLogout() {
	$('.edit-title.edit-button').toggle();
	client.wipeTokens();
}


$('#login').click(function() {
	console.info("click");
    if ( $(this).hasClass("login") ) {
        $(this).text("Log out").removeClass("login").addClass("logout");
        oAuthLogin();
    } else {
        $(this).text("Log in").removeClass("logout").addClass("login");
        oAuthLogout();
    }

});
