import { getToken, getBearerToken } from "./token.js";
let userId = 0
$(document).ready(function () {
    // get userId by jwt
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { "Authorization": getBearerToken() },
        async: false,
        data: {
            token: localStorage.getItem("token")
        }
    })
        .done(function (response) {
            if (response != "" && response != null) {
                if (response.statusCode == 200) {
                    userId = response.data;
                } else if (response.statusCode == 403) {
                    window.location.href = "403.html"
                } else if (response.statusCode == 401) {
                    localStorage.setItem("accessLinkContinue", "cart.html")
                    window.location.href = "login.html?#"
                } else {
                }
            }
        });
})
/*Kết thúc đếm số lượng items trong cart */
/*Bắt đầu nút check all*/
$(document).ready(function () {
    $('#check-all').change(function () {
        if (this.checked) {
            $('.check-item').prop('checked', this.checked);
        } else {
            $('.check-item').prop('checked', false);
        }
    });
});
/*Kết thúc nút check all*/
/*Bắt đầu API /cart*/
$(document).ready(function () {
    $.ajax({
        method: 'POST',
        url: "http://localhost:8080/cart",
        headers: { "Authorization": getBearerToken() },
        data: {
            userId: userId
        },
        success: function (response) {
            /*Bắt đầu bảng table các sản phẩm trong cart*/
            if (response.statusCode == 403) {
                window.location.href = "403.html"
            } else if (response.statusCode == 401) {
                localStorage.setItem("accessLinkContinue", "cart.html")
                window.location.href = "login.html?#"
            }
            var carts = response.data;
            var cartTable = $('#cart-table tbody');
            $.each(carts, function (index, cart) {
                var row =
                    '<tr id="' + cart.id + '">' +
                    '<td class="p-3 align-middle border-light">' +
                    '<input id="' + cart.id + '" class="check-item form-check-input" type="checkbox">' +
                    '</td>' +
                    '<th class="ps-0 py-3 border-light" scope="row">' +
                    '<div class="d-flex align-items-center">' +
                    '<a stock-id="' + cart.stockId + `" class="stockImage reset-anchor d-block animsition-link" href="detail.html?id=${cart.productId}">` + '<img src="img/' + cart.stockImage + '" alt="..." width="70" />' + '</a>' +
                    '<div class="ms-3">' + '<strong class="h6">' + `<a class="cart-name reset-anchor animsition-link" href="detail.html?id=${cart.productId}">` + cart.productName + '</a>' + '</strong>' + '</div>' +
                    '</div>' +
                    '</th>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<p class="stock-price mb-0 small">' + "$" + cart.stockPrice + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>' +
                    '<div class="quantity" id ="' + 'quantity' + cart.id + '">' +
                    '<button class="dec-btn p-0 changeQuantity">' + '<i class="fas fa-caret-left">' + '</i>' + '</button>' +
                    '<input class="stock-quantity form-control form-control-sm border-0 shadow-0 p-0" type="test" value="' + cart.quantity +
                    '" />' +
                    '<button class="inc-btn p-0 changeQuantity">' + '<i class="fas fa-caret-right">' + '</i>' + '</button>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<p class="totalEachItem mb-0 small">' + "$" + cart.stockPrice * cart.quantity + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' + '<a class="reset-anchor-delete">' + '<i class="fas fa-trash-alt small text-muted" cartId = "' + cart.id + '">' + '</i>' + '</a>' + '</td>' +
                    '</tr>';
                cartTable.append(row);
                var div = $('div.quantity:last')
                var input = $(div).find("input.stock-quantity");
                var incBtn = $(div).find("button.inc-btn");
                var decBtn = $(div).find("button.dec-btn");
                var tr = $(div).closest("tr");
                var totalItem = $(tr).find('p.totalEachItem');
                var currentQuantity = parseInt(input.val());
                var checkedItem = $(tr).find('input.check-item');
                var changQuantity = $(div).find("button.changeQuantity");
                incBtn.on('click', function () {
                    if (currentQuantity < cart.maxQuantity) {
                        input.val(currentQuantity += 1);
                        totalItem.text('$' + cart.stockPrice * input.val())
                        totalItem.val(cart.stockPrice * input.val())
                    }
                })
                decBtn.on('click', function () {
                    if (currentQuantity > 1) {
                        input.val(currentQuantity -= 1);
                        totalItem.text('$' + cart.stockPrice * input.val())
                        totalItem.val(cart.stockPrice * input.val())
                    }
                });
                changQuantity.on('click', function () {
                    var quantity = $(this).closest('tr').find('.stock-quantity').val();
                    var id = cart.id;
                    $.ajax({
                        method: "GET",
                        url: 'http://localhost:8080/cart/update/' + encodeURIComponent(id) + '/' + quantity,
                        headers: { "Authorization": getBearerToken() },
                        data: {
                            id: id,
                            quantity: quantity
                        },
                        success: function (response) {
                            if (response.statusCode == 403) {
                                window.location.href = "403.html"
                            } else if (response.statusCode == 401) {
                                localStorage.setItem("accessLinkContinue", "cart.html")
                                window.location.href = "login.html?#"
                            }
                            $(cartTotal).text('(' + totalQuantity + ')');
                        },
                        error: function (error) {
                            console.error("Error creating user", error);
                        }
                    })
                })
                /*Kết bảng table các sản phẩm trong cart*/
            })
            // $(cartTotal).text('(' + totalQ + ')');
        },
        error: function (error) {
            console.error("Error return productList", error);
        }
    })
});
/*Kết thúc API /cart*/
/*Bắt đầu nút procceed to checkout */
$(document).ready(function () {
    $('#to-checkout-btn').click(function () {
        var checkboxes = $('input[type="checkbox"].check-item');
        var listCheckedCart = [];
        $(checkboxes).each(function () {
            if (this.checked) {
                var tr = $(this).closest("tr");
                var quantity = $(tr).find('input.stock-quantity').val();
                var priceText = $(tr).find('.stock-price').text();
                var price = parseInt(priceText.replace('$', ''));
                var stockId = $(tr).find('a.stockImage').attr('stock-id');
                var name = $(tr).find('.cart-name').text();
                var cartIndex = {
                    cartId: this.id,
                    stockId: stockId,
                    name: name,
                    price: price,
                    quantity: quantity
                }
                listCheckedCart.push(cartIndex);
            }
        });
        localStorage.setItem("checkedCart", JSON.stringify(listCheckedCart));
        if (listCheckedCart.length != 0) {
            window.location.href = "checkout.html"
        } else {
            bootbox.alert("Please select a product for checkout.")
        }
    });
});
/*Kết thúc nút procceed to checkout */
/*Bắt đầu xoá*/
$('#cart-table').on('click', '.fa-trash-alt', function () {
    var cartId = $(this).closest('tr').attr('id');
    $(this).closest('tr').remove();
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/cart/delete/" + encodeURIComponent(cartId),
        headers: { "Authorization": getBearerToken() },
        data: {
            cartId: cartId
        },
        success: function (response) {
            if (response.statusCode == 403) {
                window.location.href = "403.html"
            } else if (response.statusCode == 401) {
                localStorage.setItem("accessLinkContinue", "cart.html")
                window.location.href = "login.html?#"
            }
        },
        error: function (error) {
            console.error("Error return productList", error);
        }
    });
});