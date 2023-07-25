/*Bắt đầu nút check all*/
$(document).ready(function() {

    $('#check-all').click(function() {
        console.log("hello")
        $('.check-item').prop('checked', this.checked);
    });
});
/*Kết thúc nút check all*/
/*Bắt đầu API /cart*/
$(document).ready(function() {

    var email = localStorage.getItem("email");
    $.ajax({
        method: 'POST',
        url: "http://localhost:8080/cart",
        data: {
            email: email
        },

        success: function(response) {
            /*Bắt đầu bảng table các sản phẩm trong cart*/
            var carts = response.data;
            var cartTable = $('#cart-table tbody');
            console.log("success congratulation", carts)
            var subtotalValue = 0;
            var subTotal = ('#subtotal');
            $.each(carts, function(index, cart) {
                var row =
                    '<tr id="' + cart.id + '">' +
                    '<td class="p-3 align-middle border-light">' +
                    '<input id="' + cart.id + '" class="check-item form-check-input" type="checkbox">' +
                    '</td>' +
                    '<th class="ps-0 py-3 border-light" scope="row">' +
                    '<div class="d-flex align-items-center">' +
                    '<a class="reset-anchor d-block animsition-link" href="detail.html">' + '<img src="img/' + cart.stockImage + '" alt="..." width="70" />' + '</a>' +
                    '<div class="ms-3">' + '<strong class="h6">' + '<a id="cart-name" class="cart-name reset-anchor animsition-link" href="detail.html">' + cart.productName + '</a>' + '</strong>' + '</div>' +
                    '</div>' +
                    '</th>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<p class="stock-price mb-0 small">' + "$" + cart.stockPrice + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>' +
                    '<div class="quantity" id ="' + 'quantity' + cart.id + '">' +
                    '<button class="dec-btn p-0">' + '<i class="fas fa-caret-left">' + '</i>' + '</button>' +
                    '<input class="stock-quantity form-control form-control-sm border-0 shadow-0 p-0" type="test" value="' + cart.quantity +
                    '" />' +
                    '<button class="inc-btn p-0">' + '<i class="fas fa-caret-right">' + '</i>' + '</button>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +

                    '<td class="p-3 align-middle border-light">' +
                    '<p class="totalEachItem mb-0 small">' + "$" + cart.stockPrice * cart.quantity + '</p>' +
                    '</td>' +
                    '<td class="p-3 align-middle border-light">' + '<a class="reset-anchor" href="#!">' + '<i class="fas fa-trash-alt small text-muted">' + '</i>' + '</a>' + '</td>' +
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

                incBtn.on('click', function() {
                    console.log('tang roi');
                    //currenQuantity++;
                    input.val(currentQuantity += 1);
                    totalItem.text('$' + cart.stockPrice * input.val())
                    totalItem.val(cart.stockPrice * input.val())
                    console.log(totalItem.text() + 'day la totalcheckeditem');

                })
                decBtn.on('click', function() {
                    console.log('giam roi');
                    if (currentQuantity > 1) {
                        //currenQuantity--;
                        input.val(currentQuantity -= 1);
                        totalItem.text('$' + cart.stockPrice * input.val())
                        totalItem.val(cart.stockPrice * input.val())
                        console.log(totalItem.text() + 'day la totalcheckeditem');

                    }
                });
                /*Kết bảng table các sản phẩm trong cart*/
                
                /*Bắt đầu tính subtotal*/
                checkedItem.click(function() {
                    console.log('hello checked already');
                    //totalItem.text();
                    console.log(totalItem.text() +
                        'day la subtotal');
                    var b = totalItem.text().replace('$', '');
                    console.log(b + 'day la subtotal');
                    var c = parseInt(b);
                    subtotalValue += c;
                    console.log(subtotalValue + 'day la subtotal');
                    $(subTotal).text('$' + subtotalValue);

                });
                /*Kết thúc tính subtotal*/

            })


        },
        error: function(error) {
            console.error("Error return productList", error);
        }
    })

});
/*Kết thúc API /cart*/
/*Bắt đầu nút procceed to checkout */

$(document).ready(function() {

    $('#to-checkout-btn').click(function() {
        var checkboxes = $('input[type="checkbox"].check-item');
        console.log("checkboxs size II " + checkboxes.length);
        console.log("hello checkout btn")
        alert("checkout btn clicked");
        var listCheckedCartId = [];

        $(checkboxes).each(function() {
            if (this.checked) {
                var tr = $(this).closest("tr");
                var quantity = $(tr).find('input.stock-quantity').val();
                console.log('quantity ' + quantity)
                console.log("This " + this);
                var cartIndex = {
                    id: this.id,
                    quantity: quantity
                }
                console.log('Checkbox id: ' + this.id + ' đã được chọn.');
                listCheckedCartId.push(cartIndex);
            }
        });
        console.log("các giá trị trong checkedList" + listCheckedCartId);
        console.log("các giá trị trong checkedList" + listCheckedCartId[0].id + 'quantity ' + listCheckedCartId[0].quantity);

        var checkedCartIdJSON = JSON.stringify(listCheckedCartId);
        localStorage.setItem("checkedCartId", checkedCartIdJSON);

    });
});
/*Kết thúc nút procceed to checkout */