$(document).ready(function() {
    $("#profile").show();
    // Ẩn hiện các trang khi bấm vào các đề mục
    $('.toggle-link').click(function(event) {
        event.preventDefault();
        var target = $(this).data('target');
        $('.toggle-page').hide();
        $('#' + target).show();
    });
    // Kết thúc ẩn hiện các trang khi bấm vào các đề mục

    //Bắt đầu thay đổi mật khẩu
    $('#change-pass-submit').click(function() {
        var id = localStorage.getItem("userId");
        console.log(id);
        var currentPass = $('#currentPass').val();
        var newPass = $('#newPass').val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/user/changepass",
            async: false,
            data: {
                id: id,
                currentPass: currentPass,
                newPass: newPass
            },
            success: function(response) {
                console.log(response.data);
            },
            error: function(error) {
                console.error("change pass error", error);
            }

        })
        console.log('helllo')
    })
});