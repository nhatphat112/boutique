// var categoryList = [];
$(document).ready(function() {
        console.log('xin chao')
        var productTable = $('#product-table tbody');
        var contentProduct = "";
        $.ajax({
            url: "http://localhost:8080/product",
            type: "GET",
            async: false,
            success: function(res) {
                console.log()
                if (res != null && res != "") {
                    listAllProduct = res.data;
                    listAllProduct.map(function(currentItem, index, arr) {
                        // var a = currentItem.description;
                        // console.log(a.length)
                        // if (a.length > 30) {
                        //     var description = currentItem.description.substring(0, 30) + "...";
                        // }
                        // categoryList.push(currentItem.categoryId);
                        contentProduct += `<tr>
                    <td> ${currentItem.id} </td>
                    <td> ${currentItem.name} </td>
                    <td> ${currentItem.categoryId} </td>
                    <td> ${currentItem.image} </td>
                    <td> ${currentItem.soldQuantity} </td>
                    <td style="overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 200px;"> ${currentItem.description} </td>
                    <td>
                        <button type="submit" class="btn btn-primary mr-2">Edit</button>
                        <button type="submit" class="btn btn-primary mr-2">Delete</button>
                    </td>
                </tr>`;
                    });
                    productTable.append(contentProduct);

                }
            },
            error: function(error) {
                console.error("Error API product ", error);
            }

        });



    })
    // document.getElementByClass("showFormButton").addEventListener("click", function() {
    //     document.getElementById("dataForm").style.display = "block";
    // });

// $(".showFormButton").click(function() {
//     // $("#form-display").show();
//     $("html, body").animate({
//         scrollTop: $("#myForm").offset().top
//     }, 1000);
// })
// console.log(categoryList);
$(document).ready(function() {
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
})
$(".showFormButton").on("click", function() {
    $("#form-display").show();
    $("#product-list").hide();


    $('#save-btn').click(function(event) {
        var name = $('input#name').val();
        console.log(name);
        var soldQuantity = 0;
        var categoryId = parseInt($('#category-selector').val());
        console.log(categoryId);
        var description = $("#description").val();
        console.log(description);
        var image = "";
        $.ajax({
            method: 'POST',
            url: "http://localhost:8080/product/add",
            // dataType: 'json',
            data: {
                "name": name,
                "soldQuantity": soldQuantity,
                "categoryId": categoryId,
                "image": image,
                "desc": description
            },
            contentType: 'application/json',
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
    $("#product-list").show();
});