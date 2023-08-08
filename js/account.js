// $(document).ready(function() {
//     $("#profile").show();

//     // $("#edit-profile-link").click(function(event) {
//     //     event.preventDefault();
//     //     $("#profile").hide();
//     //     $("#edit-profile").show();

//     // })
//     // $("#edit-profile-link").click(function(event) {
//     //     event.preventDefault();
//     //     $("#profile").hide();
//     //     $("#edit-profile").show();

//     // })
//     // change-password

//     $(".display-page").click(function(event) {
//         $(this)
//     })


// })

$(document).ready(function() {
    $("#profile").show();
    $('.toggle-link').click(function(event) {
        event.preventDefault();
        var target = $(this).data('target');
        $('.toggle-page').hide();
        $('#' + target).show();
    });
});