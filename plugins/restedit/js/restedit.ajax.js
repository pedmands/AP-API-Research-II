(function($) {
    // // REST API root URL
    // console.info("The REST API root URL is: ", WPsettings.root);
    // // Nonce Value
    // console.info("The Nonce root URL is: ", WPsettings.nonce);
    // // Current post ID
    // console.info("The current post ID is: ", WPsettings.current_ID);

    // Get the entry tile element:
    const $ENTRYTITLE = $('.entry-title');
    
    // Add an edit button and a save button directly after the entry title.
	// Hide the save button using display:none in an inline style.
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
        let newTitle = document.querySelector('#title-input').value;
        $ENTRYTITLE.text(newTitle);
        $ENTRYTITLE.toggle();
        $('#title-input').toggle();
        $('.edit-title.edit-button').toggle();
        $(this).toggle();

    });

})(jQuery);