$(document).ready(function() {
        console.log('xin chao')
        var stockTable = $('#stock-table tbody');
        var contentStock = "";
        $.ajax({
            url: "http://localhost:8080/stock",
            type: "GET",
            async: false,
            success: function(res) {
                console.log()
                if (res != null && res != "") {
                    listAllStock = res.data;
                    listAllStock.map(function(currentItem, index, arr) {
                        // var a = currentItem.description;
                        // console.log(a.length)
                        // if (a.length > 30) {
                        //     var description = currentItem.description.substring(0, 30) + "...";
                        // }
                        // categoryList.push(currentItem.categoryId);
                        contentStock += `<tr>
                    <td> ${currentItem.id} </td>
                    <td> ${currentItem.colorId} </td>
                    <td> ${currentItem.quantity} </td>
                    <td> ${currentItem.productId} </td>
                    <td> ${currentItem.price} </td>
                    <td> ${currentItem.image} </td>

                    <td>
                        <button type="submit" class="btn btn-primary mr-2">Edit</button>
                        <button type="submit" stock-id="${currentItem.id}" class="btn btn-primary mr-2 btn-delete">Delete</button>
                        </td>
                </tr>`;
                    });
                    stockTable.append(contentStock);

                }
            },
            error: function(error) {
                console.error("Error API product ", error);
            }

        });

        $(".btn-delete").click(function () {
            let stockId = $(this).attr("stock-id")
            console.log(stockId);
            let This = $(this)
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/stock/delete?id=" + stockId
            }).done(function (result) {
                if (result.data == true) {
                    bootbox.alert("Delete successfully", function () {
                    });
                    This.closest("tr").remove();
                }
                else {
                    bootbox.alert("Delete successfully !")
                }
            })
        })


    })

    $(document).ready(function() {
        $.ajax({
            method: 'GET',
            contentType: "application/json",
            url: "http://localhost:8080/color",
            dataType: 'json',
            async: false,
            success: function(response) {
                var colorSelector = $('#color-selector')
                var row = "";
                listColor = response.data;
                $.each(listColor, function(index, color) {
                    row += `<option value="${color.id}">${color.name}</option>`
                });
                colorSelector.append(row);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
        $.ajax({
            method: 'GET',
            contentType: "application/json",
            url: "http://localhost:8080/category",
            dataType: 'json',
            async: false,
            success: function(response) {
                var categorySelector = $('#category-selector')
                var row = "";
                listCategory = response.data;
                $.each(listCategory, function(index, category) {
                    row += `<option value="${category.id}">${category.name}</option>`
                });
                categorySelector.append(row);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });

        $.ajax({
            method: 'GET',
            contentType: "application/json",
            url: "http://localhost:8080/product",
            dataType: 'json',
            async: false,
            success: function(response) {
                var productSelector = $('#product-selector')
                var row = "";
                listproduct = response.data;
                $.each(listproduct, function(index, product) {
                    row += `<option value="${product.id}">${product.name}</option>`
                });
                productSelector.append(row);
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    })

    $(".showFormButton").on("click", function() {
        $("#form-display").show();
        $("#stock-list").hide();
    
    
        $('#save-btn').click(function(event) {

            var colorId = parseInt($('#color-selector').val());
            console.log(colorId);
            var categoryId = parseInt($('#category-selector').val());
            console.log(categoryId);
            var productId = parseInt($('#product-selector').val());
            console.log(productId);
            var price = $("#price").val();
            console.log(price);
            var quantity = $("#quantity").val();
            console.log(quantity);
            var imageUrl = $("#imageUrl").val();
            console.log(imageUrl);

            $.ajax({
                method: 'POST',
                url: "http://localhost:8080/stock/add",
                // dataType: 'json',
                data: {
                    "colorId": colorId,
                    "categoryId": categoryId,
                    "productId": productId,
                    "imageUrl": imageUrl,
                    "price": price,
                    "quantity":quantity
                },
                // contentType: 'application/json',
                async: false,
                success: function(response) {
                    console.log(response.data);
                },
                error: function(xhr, status, error) {
                    console.log(error); // Xử lý lỗi nếu có
                }
            });
        })

    
    });
    $("#closeButton").on("click", function() {
        $("#form")[0].reset();
        $("#form-display").hide();
        $("#stock-list").show();
    });
