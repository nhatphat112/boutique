$(document).ready(function() {

    $('#check-all').click(function() {
        console.log("hello")
        $('.check-item').prop('checked', this.checked);
    });
});

$(document).ready(function() {

    var email = localStorage.getItem("email");
    $.ajax({
        method: 'POST',
        url: "http://localhost:8080/cart",
        data: {
            email: email
        },

        success: function(response) {
            var carts = response.data;
            var cartTable = $('#cart-table tbody');
            console.log("success congratulation", carts)

            $.each(carts, function(index, cart) {
                var currentQuantity = cart.quantity;

                var row =
                    '<tr>' +
                    '<td class="p-3 align-middle border-light">' +
                    '<input class="check-item form-check-input" id="' + cart.id + '" type="checkbox">' +
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
                    '<input class="stock-quantity form-control form-control-sm border-0 shadow-0 p-0" type="number" value="' + cart.quantity +
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
                //var inputEl = $('#quantity' + cart.id, cartTable).find('.stock-quantity'); // Lấy input element tại vị trí index

                cartTable.append(row);
                // $('.inc-btn').on('mousedown', function() {
                //     console.log("++")
                //     currentQuantity++; // Tăng giá trị số lượng lên 1 đơn vị
                //     inputEl.val(currentQuantity);
                // });
                // inputEl.val(currentQuantity);
                // // Lắng nghe sự kiện click cho nút giảm số lượng
                // $('.dec-btn').on('mousedown', function() {
                //     console.log("--")

                //     if (currentQuantity > 1) { // Kiểm tra nếu số lượng hiện tại lớn hơn 1
                //         currentQuantity--; // Giảm giá trị số lượng đi 1 đơn vị
                //         inputEl.val(currentQuantity); // Hiển thị lại giá trị số lượng mới lên input
                //     }
                // });
            })

        },
        error: function(error) {
            console.error("Error return productList", error);
        }
    })

});
$(document).ready(function() {
    $('.inc-btn').click(function() {
        var incre_value = $(this).parents('.quantity').find('.stock-quantity').val();
        console.log(incre_value);
        var value = parseInt(incre_value) + 1;
        $(this).parents('.quantity').find('.stock-quantity').val(value);
    })
});

$(document).ready(function() {

    $('#to-checkout-btn').click(function() {
        var checkboxes = $('input[type="checkbox"].check-item');
        console.log("checkboxs size II " + checkboxes.length);
        console.log("hello checkout btn")
        alert("checkout btn clicked");
        //Nếu mấy cái check-item được check 
        //console.log(checkboxes);
        var listCheckedCartId = [];
        var subTotal = 0;
        checkboxes.each(function() {
            if (this.checked) {
                //Bắt đầu lấy danh sách cách cart_id
                console.log("This " + this);
                console.log('Checkbox id: ' + this.id + ' đã được chọn.');
                listCheckedCartId.push(this.id);
                //Bắt đầu tính xem hàng này bao nhiêu tiền
                var closetRow = $(this).closet('tr');
                console.log("closetRow " + closetRow);
            }
        });
        console.log("các giá trị trong checkedList" + listCheckedCartId);
        // $('.check-item').prop('checked', this.checked);
        var checkedCartIdJSON = JSON.stringify(listCheckedCartId);
        localStorage.setItem("checkedCartId", checkedCartIdJSON);

    });
});
//var checkboxes = $('input[type="checkbox"].check-item');


// console.log("có subtotal nè");

// console.log("checkboxs nè " + checkboxes);
// checkboxes.each(function() {
//     if (this.checked) {
//         console.log(this + " đã một đồng chí bị chọn");
//console.log('Checkbox id: ' + this.id + ' đã được chọn.');
//         var TrTag = this.closest("tr");

//         var totalEachItemTag = TrTag.find(".totalEachItem");
//         subTotal += totalEachItemTag.val();


//     }

// });
//$("#subtotal").text("$" + subTotal);

//     }
// })
//})