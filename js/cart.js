let userId = 0
$(document).ready(function () {
    // get userId by jwt
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { "Authorization": bearerToken },
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
                    console.log("check response user/getId/token:", response)
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
        headers: { "Authorization": bearerToken },
        data: {
            userId: userId
        },
        success: function (response) {
            /*Bắt đầu bảng table các sản phẩm trong cart*/
            var carts = response.data;
            var cartTable = $('#cart-table tbody');
            console.log("success congratulation", carts)

            var subtotalValue = 0;
            var subTotal = ('#subtotal');
            $.each(carts, function (index, cart) {
                console.log("max Quantity ", cart.maxQuantity)

                console.log('stock_id ' + cart.stockId);
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
                /*Bắt đầu tính subtotal*/
                checkedItem.change(function () {

                    var b = totalItem.text().replace('$', '');
                    var c = parseInt(b);
                    if (this.checked) {
                        subtotalValue += c;
                    } else {
                        subtotalValue -= c;
                    }
                    $(subTotal).text('$' + subtotalValue);
                });
                /*Kết thúc tính subtotal*/

                // totalQ += currentQuantity;
                // console.log(totalQ);
                incBtn.on('click', function () {
                    if (currentQuantity < cart.maxQuantity) {
                        console.log('tang roi');
                        input.val(currentQuantity += 1);
                        totalItem.text('$' + cart.stockPrice * input.val())
                        totalItem.val(cart.stockPrice * input.val())
                        console.log(totalItem.text() + 'day la totalcheckeditem');
                        if ($(checkedItem).is(':checked')) {
                            //console.log('phai dem bu');
                            subtotalValue += cart.stockPrice;
                            $(subTotal).text('$' + subtotalValue);
                        }
                        // totalQ++;
                        // $(cartTotal).text('(' + totalQ + ')');
                    }
                })

                decBtn.on('click', function () {
                    console.log('giam roi');
                    if (currentQuantity > 1) {
                        input.val(currentQuantity -= 1);
                        totalItem.text('$' + cart.stockPrice * input.val())
                        totalItem.val(cart.stockPrice * input.val())
                        console.log(totalItem.text() + 'day la totalcheckeditem');
                        if ($(checkedItem).prop('checked')) {
                            console.log('phai tru bot');
                            subtotalValue -= cart.stockPrice;
                        }
                        // totalQ--;
                        // $(cartTotal).text('(' + totalQ + ')');
                    }
                });
                changQuantity.on('click', function () {
                    console.log('btn change Quantity')
                    var quantity = $(this).closest('tr').find('.stock-quantity').val();
                    console.log(quantity);
                    console.log('cartId ' + cart.id);
                    var id = cart.id;
                    $.ajax({
                        method: "GET",
                        url: 'http://localhost:8080/cart/update/' + encodeURIComponent(id) + '/' + quantity,
                        headers: { "Authorization": bearerToken },
                        data: {
                            id: id,
                            quantity: quantity
                        },
                        success: function (response) {
                            console.log("User created successfully", response);
                            console.log("User created successfully", response.data);
                        },
                        error: function (error) {
                            console.error("Error creating user", error);
                        }
                    })
                })
                // var cartIdQuantity = {
                //         id: cart.id,
                //         quantity: currentQuantity
                //     }
                // listCart.push(cartIdQuantity);

                /*Kết bảng table các sản phẩm trong cart*/
            })
            $(subTotal).text('$' + subtotalValue);

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
        console.log("checkboxs size II " + checkboxes.length);
        console.log("hello checkout btn")
        var listCheckedCart = [];

        $(checkboxes).each(function () {
            if (this.checked) {
                var tr = $(this).closest("tr");
                var quantity = $(tr).find('input.stock-quantity').val();
                var priceText = $(tr).find('.stock-price').text();
                var price = parseInt(priceText.replace('$', ''));
                var stockId = $(tr).find('a.stockImage').attr('stock-id');
                //console.log('xin chao' + stockId + ' day là stockId');
                //console.log('price: ' + price);
                var name = $(tr).find('.cart-name').text();
                console.log('price: ' + name);
                console.log('quantity ' + quantity)
                console.log("This " + this);
                var cartIndex = {
                    cartId: this.id,
                    stockId: stockId,
                    name: name,
                    price: price,
                    quantity: quantity

                }
                console.log('Checkbox id: ' + this.id + ' đã được chọn.');
                listCheckedCart.push(cartIndex);

            }
        });
        console.log("các giá trị trong checkedList" + listCheckedCart);
        // console.log("các giá trị trong checkedList" + listCheckedCart[0].id + 'name ' + listCheckedCart[0].name);

        //var checkedCartJSON = JSON.stringify(listCheckedCart);
        console.log("listCheckedCart:", listCheckedCart)
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
//$(document).ready(function() {
// var deleteButtons = document.querySelectorAll('#my-table .delete-button');
//     var id = $(this).attr("cartId");
//     console.log(id);



//     var tr = $(this).closest("tr");
//     console.log(tr.id);
//     $(this).closest("tr").remove();
//     console.log('da remove');
// });
$('#cart-table').on('click', '.fa-trash-alt', function () {
    console.log($(this).attr("cartId"));
    //console.log($(this).closest('tr').attr('id'));
    var cartId = $(this).closest('tr').attr('id');
    $(this).closest('tr').remove();

    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/cart/delete/" + encodeURIComponent(cartId),
        headers: { "Authorization": bearerToken },
        data: {
            cartId: cartId
        },

        success: function (response) {
            console.log(response.data);
        },
        error: function (error) {
            console.error("Error return productList", error);
        }

    });

});
// $(document).ready(function() {
//     $('.changeQuantity').click(function() {
//         console.log('btn change Quantity')
//         var thisClick = $(this);
//         var quantity = $(this).closest('tr').find('.stock-quantity').val();
//         console

//         $.ajax({
//             method: "GET",
//             url: 'http://localhost:8080/cart/update/' + encodeURIComponent(id) + '/' + quantity,
//             data: {
//                 id: cart.id,
//                 quantity: quantity
//             },
//             success: function(response) {
//                 console.log("User created successfully", response);
//                 console.log("User created successfully", response.data);
//             },
//             error: function(error) {
//                 console.error("Error creating user", error);
//             }
//         })
//     })
// })