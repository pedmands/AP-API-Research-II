// Based on https://github.com/andreassolberg/jso/tree/version3

var ROOTURL = "http://localhost/WP-API-2";
const RESTROOT = ROOTURL + '/wp-json';
const $ENTRYTITLE = $('.post-title');

var jso = new JSO({
	providerID: "localhost/WP-API-2",
	client_id: "eW3uQCQ9ZkXcAvTBZ5V4IEcxEhiefart7vYX8O77",
	redirect_uri: "http://127.0.0.1:5500/index.html", // The URL where you is redirected back, and where you perform run the callback() function.
	authorization: ROOTURL + '/oauth/authorize',
});

// Catch the response after login:
jso.callback();

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


function oauthLogin() {

	console.info('Login button pressed!');

}

// Wipe sessionStorage and tokens on logout:
function oauthLogout() {
	$('.edit-title.edit-button').toggle();
	jso.wipeTokens();
}


$('#login').click(function() {
	console.info("click");
    if ( $(this).hasClass("login") ) {
        $(this).text("Log out").removeClass("login").addClass("logout");
        oauthLogin();
    } else {
        $(this).text("Log in").removeClass("logout").addClass("login");
        oauthLogout();
    }

});
