$(document).ready(function() {
    $('#check-all').click(function() {
        console.log("hello")
        $('.check-item').prop('checked', this.checked);
    });
});

$(document).ready(function() {
    $.ajax({
        method: 'GET',
        contentType: "application/json",
        url: "http://localhost:8080/cart",
        dataType: 'json',
        success: function(response) {
            // var cartList = response.data;
            // console.log("success congratulation", cartList)
            // var cartTable = $('#cart-table cart-name');
            var carts = response.data;
            $.each(carts, function(index, cart) {
                $(".cart-name:eq(" + index + ")").text(cart.id);
                $(".stock-quantity:eq(" + index + ")").attr("value", "6");
                $(".stock-price:eq(" + index + ")").text("$150");
            })

        },
        error: function(error) {
            console.error("Error return productList", error);
        }
    })

})