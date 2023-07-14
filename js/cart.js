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
            var cartTable = $('#cart-table tbody');
            console.log("success congratulation", carts)
            $.each(carts, function(index, cart) {
                //$(".cart-name:eq(" + index + ")").text(cart.stockName);
                //$(".stock-quantity:eq(" + index + ")").attr("value", "6");
                //$(".stock-price:eq(" + index + ")").text("$" + cart.stockPrice);
                var row =
                    '<tr>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<input class="check-item form-check-input" id="' + cart.id + '" type="checkbox">' +
                    '</td>' +
                    '<th class="ps-0 py-3 border-light" scope="row">' +
                    '<div class="d-flex align-items-center">' +
                    '<a class="reset-anchor d-block animsition-link" href="detail.html">' + '<img src="img/product-detail-3.jpg" alt="..." width="70" />' + '</a>' +
                    '<div class="ms-3">' + '<strong class="h6">' + '<a id="cart-name" class="cart-name reset-anchor animsition-link" href="detail.html">' + cart.productName + '</a>' + '</strong>' + '</div>' +
                    '</div>' +
                    '</th>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<p class="stock-price mb-0 small">' + "$" + cart.stockPrice + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>' +
                    '<div class="quantity">' +
                    '<button class="dec-btn p-0">' + '<i class="fas fa-caret-left">' + '</i>' + '</button>' +
                    '<input class="stock-quantity form-control form-control-sm border-0 shadow-0 p-0" type="text" value="' + cart.quantity + '" />' +
                    '<button class="inc-btn p-0">' + '<i class="fas fa-caret-right">' + '</i>' + '</button>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<p class="mb-0 small">' + "$" + cart.stockPrice * cart.quantity + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' + '<a class="reset-anchor" href="#!">' + '<i class="fas fa-trash-alt small text-muted">' + '</i>' + '</a>' + '</td>' +
                    '</tr>';
                cartTable.append(row);
            })

        },
        error: function(error) {
            console.error("Error return productList", error);
        }
    })

})

$(document).ready(function() {
    $('#to-checkout-btn').click(function() {
        console.log("hello checkout btn")
        alert("checkout btn clicked");
        //Nếu mấy cái check-item được check 
        var checkboxes = $('input[type="checkbox"].check-item');
        //console.log(checkboxes);
        var listCheckedCartId = [];
        checkboxes.each(function() {
            if (this.checked) {
                console.log('Checkbox id: ' + this.id + ' đã được chọn.');
                listCheckedCartId.push(this.id)
            }
        });
        console.log("các giá trị trong checkedList" + listCheckedCartId);
        // $('.check-item').prop('checked', this.checked);
        var checkedCartIdJSON = JSON.stringify(listCheckedCartId);
        localStorage.setItem("checkedCartId", checkedCartIdJSON);

    });
});