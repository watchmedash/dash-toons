$(document).ready(function() {
    // Show all items at once
    $('figure').show();

    // Remove pagination-related code
    $('.prev-page, .next-page').hide();

    // Remove event handlers for pagination buttons
    $('.prev-page, .next-page').off('click');

    // Remove popstate event handler
    window.onpopstate = null;
});
