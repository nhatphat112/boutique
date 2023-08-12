let listAllProduct = "";
let listCategoryProduct = "";
let listCategory = "";
$(document).ready(function() {
    //Gửi yêu cầu GET đến API để lấy danh sách sản phẩm
    //window.addEventListener("load", function() {
    $.ajax({
        method: 'GET',
        contentType: "application/json",
        url: "http://localhost:8080/category",
        dataType: 'json',
        async: false,
        success: function(response) {
            listCategory = response.data;
            // Nếu thành công, hiển thị danh sách category trong bảng
            var list = $("#categogyList");
            let productContainer = document.getElementById("product-container");
            $.each(listCategory, function(index, category) {
                console.log(category.id + ' day la id')
                var row = '<li class="mb-2">' + '<a class="text-uppercase reset-anchor category" id = "' + category.id + '" >' + category.name + '</a>' + '</li>';
                list.append(row);
                //let productContainer = document.getElementById("product-container");


                var a = $('a.category');
                $(a).click(function() {
                    var id = $(this).attr('id');
                    var newUrl = 'shop.html?categoryId=' + id;
                    // Chuyển hướng đến đường dẫn mới
                    window.location.href = newUrl;
                })
            })

        },
        error: function(error) {
            console.error("Error return category", error);
            console.log("User created failed");
        }
    });
});

$(document).ready(function() {
    $('.category').click(function() {
        console.log('you click on category');
    })
})

$(document).ready(function() {
    // console.log("index.js active")
    let productContainer = document.getElementById("product-container");
    let contentProduct = "";
    let stock = "";
    window.addEventListener("load", function() {
        console.log("Load_______3")
        $.ajax({
            url: "http://localhost:8080/product",
            type: "GET",
            async: false,
            success: function(res) {
                if (res != null && res != "") {
                    listAllProduct = res.data;
                    res.data.map(function(currentItem, index, arr) {
                        contentProduct += `<div class="product-item col-xl-3 col-lg-4 col-sm-6">
                        <div class="product text-center">
                            <div class="position-relative mb-3">
                                <div class="badge text-white bg-"></div>
                                <a class="d-block" href="detail.html?id=${currentItem.id}"><img class="img-fluid w-100" src="img/${currentItem.image}" alt="..."></a>
                                <div class="product-overlay">
                                    <ul class="mb-0 list-inline">
                                        <li class="list-inline-item m-0 p-0"><a product-id=${currentItem.id}  class="btn-add-to-cart btn btn-sm btn-dark" href="#productView" data-bs-toggle="modal">Add to cart</a></li>
                                    </ul>
                                </div>
                            </div>
                            <h6> <a class="reset-anchor" href="detail.html?id=${currentItem.id}">${currentItem.name}</a></h6>
                            <p class="small text-muted">$${currentItem.price}</p>
                        </div>
                    </div>`;
                    });
                    productContainer.innerHTML = contentProduct;
                }
            },
            error: function(error) {
                console.error("Error API product ", error);
            }

        });
        //myFunction();
        let stock = "";
        //window.addEventListener("load", function() {
        var inputElement = document.querySelector(".quantity input");
        var decButton = document.querySelector(".quantity .dec-btn");
        var incButton = document.querySelector(".quantity .inc-btn");

        $('#product-container').on('click', '.btn-add-to-cart', function() {
            console.log("active quickview 2")

            document.getElementById('sold-out').classList.add("d-none")
            let quantityQuickView = document
                .getElementById("product-quantity-quick-view")
                .classList.add("d-none");

            let colorSelector = document.getElementById("color-selector");

            let productId = parseInt($(this).attr("product-id"));


            let imageProductQuickView = document.getElementById(
                "image-product-quick-view"
            );
            let productNameQuickView = document.getElementById(
                "product-name-quick-view"
            );
            let priceQuickView = document.getElementById("price-quick-view");
            let descriptionQuickView = document.getElementById(
                "description-quick-view"
            );

            console.log(listAllProduct.length + 'so luong product');
            listAllProduct.map(function(currentItem, index, arr) {
                if (currentItem.id == productId) {
                    imageProductQuickView.style.background = `url('/img/${currentItem.image}')`;
                    imageProductQuickView.setAttribute(
                        "href",
                        `url('/img/${currentItem.image}')`
                    );

                    productNameQuickView.textContent = currentItem.name;
                    priceQuickView.textContent = currentItem.price + "$";
                    descriptionQuickView.textContent = currentItem.description;


                }
            });

            let contentColor = `<option class="dropdown-item" selected>Select Color</option>`;
            /*Bắt đầu submit add to cart*/
            $("#btn-submit-add-to-cart").click(function() {
                var colorId = $("#color-selector").val();;
                var quantity = $("#input-quantity").val();
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8080/cart/addToCart/" + encodeURIComponent(productId) + '/' + colorId + '/' + quantity + '/' + userId,
                    data: {
                        productId: productId,
                        colorId: colorId,
                        quantity: quantity,
                        userId: userId
                    },
                    async: false,
                    success: function(response) {
                        console.log("User created successfully", response)
                        console.log("User created successfully", response.data)
                    },
                    error: function(error) {
                        console.error("Error creating user", error),
                            console.log("User created failed", data)
                    }

                });
            });
            /*Kết thúc submit add to cart*/

            jQuery.ajax({
                url: "http://localhost:8080/stock/product?id=" + productId,
                type: "GET",
                async: false,
                success: function(res) {
                    if (res != null && res != "") {
                        stock = res.data;
                        res.data.map(function(currentItem, index, arr) {
                            contentColor += ` 
                         <option class="dropdown-item" value="${currentItem.colorId}">${currentItem.colorName}</option>
                         `;
                        });
                        console.log(contentColor);
                        colorSelector.innerHTML = contentColor;
                    }
                },
            });
        });
        let quantityQuickViewMax = "";

        $("#color-selector").on("change", function() {
            incButton.disabled = false;
            decButton.disabled = false;
            let productQuantity = document.getElementById("product-quantity-quick-view");
            let colorSelectorValue = this.value;
            console.log("colorSelectorValue", colorSelectorValue);
            document.getElementById('input-quantity').value = 1

            stock.map(function(currentItem, index, arr) {
                if (colorSelectorValue == currentItem.colorId) {
                    quantityQuickViewMax = currentItem.quantity
                    console.log("currentItem.quantity", currentItem.quantity)
                    document.getElementById("price-quick-view").textContent =
                        currentItem.price + "$";
                    document.getElementById(
                        "image-product-quick-view"
                    ).style.background = `url('/img/${currentItem.image}')`;
                    if (currentItem.quantity > 1) {
                        productQuantity.classList.remove("d-none");
                        document.getElementById('sold-out').classList.add("d-none")
                    } else {
                        document.getElementById('sold-out').classList.remove("d-none")
                        document.getElementById('product-quantity-quick-view').classList.add("d-none")
                    }

                }
            });
        });


        decButton.addEventListener("click", function() {
            var value = parseInt(inputElement.value);
            if (value >= quantityQuickViewMax) {
                decButton.disabled = true
            } else {
                incButton.disabled = false
            }

        });
        incButton.addEventListener("click", function() {
            var value = parseInt(inputElement.value);
            if (value >= quantityQuickViewMax) {
                incButton.disabled = true
            } else {
                decButton.disabled = false
            }
        });


    });



});

/* Bắt đầu chuyển hướng từ category  */

window.onload = (function() {
        let urlParams = new URLSearchParams(window.location.search)
        let categoryId = urlParams.get("categoryId")
        console.log("_____________check_cagrgoryId_________", categoryId)
        if (categoryId != null && categoryId != "") {
            let id = urlParams.get("categoryId");
            let contentProduct = "";
            let productContainer = document.getElementById("product-container");
            jQuery.ajax({
                url: "http://localhost:8080/category/" + encodeURIComponent(id),
                type: "GET",
                data: {
                    id: id
                },
                success: function(res) {
                    if (res != null && res != "") {
                        listCategoryProduct = res.data;
                        res.data.map(function(currentItem, index, arr) {
                            console.log(currentItem.id + ' day la product id');
                            contentProduct += `<div class="product-item col-xl-3 col-lg-4 col-sm-6">
                                    <div class="product text-center">
                                        <div class="position-relative mb-3">
                                            <div class="badge text-white bg-"></div>
                                            <a class="d-block" href="detail.html?id=${currentItem.id}"><img class="img-fluid w-100" src="img/${currentItem.image}" alt="..."></a>
                                            <div class="product-overlay">
                                                <ul class="mb-0 list-inline">
                                                <li class="list-inline-item m-0 p-0"><a product-id=${currentItem.id}  class="btn-add-to-cart btn btn-sm btn-dark" href="#productView" data-bs-toggle="modal">Add to cart</a></li>                                                </ul>
                                            </div>
                                        </div>
                                        <h6> <a class="reset-anchor" href="detail.html?id=${currentItem.id}">${currentItem.name}</a></h6>
                                        <p class="small text-muted">$${currentItem.price}</p>
                                    </div>
                                </div>`;
                        });
                        productContainer.innerHTML = contentProduct;
                    }
                },
                error: function(error) {
                    console.error("Error category?id", error);
                }
            });
        }
    })
    /* Kết thúc chuyển hướng từ category  */