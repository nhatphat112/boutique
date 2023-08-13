import { getBearerToken, getToken } from "./token.js";
$(document).ready(function () {
    let productContainer = document.getElementById("product-container");
    let listProduct = "";
    let contentProduct = "";
    let stock = "";
    let productId = 0;
    window.addEventListener("load", function () {
        $.ajax({
            url: "http://localhost:8080/product/bestseller",
            type: "GET",
            async: false,
            success: function (res) {
                if (res != null && res != "") {
                    listProduct = res.data;
                    let i = 0;
                    res.data.map(function (currentItem, index, arr) {
                        if (i < 10) {
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
                        }
                        i++;
                    });
                    productContainer.innerHTML = contentProduct;
                }
            },
        });
        var inputElement = document.querySelector(".quantity input");
        var decButton = document.querySelector(".quantity .dec-btn");
        var incButton = document.querySelector(".quantity .inc-btn");

        $(".btn-add-to-cart").click(function () {
            document.getElementById("btn-submit-add-to-cart").classList.add("d-none")
            document.getElementById('sold-out').classList.add("d-none")
            let quantityQuickView = document
                .getElementById("product-quantity-quick-view")
                .classList.add("d-none");
            let colorSelector = document.getElementById("color-selector");
            productId = $(this).attr("product-id");
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

            listProduct.map(function (currentItem, index, arr) {
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

            let productIsReady = true;
            jQuery.ajax({
                url: "http://localhost:8080/stock/product?id=" + productId,
                type: "GET",
                async: false,
                success: function (res) {

                    if (res != null && res != "") {
                        stock = res.data;
                        if (stock.length != 0) {
                            res.data.map(function (currentItem, index, arr) {
                                contentColor += ` 
                             <option class="dropdown-item" value="${currentItem.colorId}">${currentItem.colorName}</option>
                             `;
                            });

                            colorSelector.innerHTML = contentColor;
                        } else {
                            productIsReady = false;
                        }

                    }
                },
            });
            if (productIsReady) {
                $("#product-not-ready").addClass("d-none")
            } else {
                $("#product-not-ready").removeClass("d-none")
            }
        });

        let quantityQuickViewMax = "";
        this.document
            .getElementById("color-selector")
            .addEventListener("change", function () {

                document.getElementById("btn-submit-add-to-cart").classList.remove("d-none")

                incButton.disabled = false;
                decButton.disabled = true;
                let productQuantity = document.getElementById("product-quantity-quick-view");
                let colorSelectorValue = this.value;
                // if (colorSelectorValue == "Select Color") {
                //     document.getElementById("btn-submit-add-to-cart").classList.add("d-none")

                // }

                document.getElementById('input-quantity').value = 1

                stock.map(function (currentItem, index, arr) {
                    if (colorSelectorValue == currentItem.colorId) {
                        quantityQuickViewMax = currentItem.quantity

                        document.getElementById("price-quick-view").textContent =
                            currentItem.price + "$";
                        document.getElementById(
                            "image-product-quick-view"
                        ).style.background = `url('/img/${currentItem.image}')`;
                        if (currentItem.quantity > 1) {
                            productQuantity.classList.remove("d-none");
                            document.getElementById('sold-out').classList.add("d-none")


                        } else {

                            document.getElementById("btn-submit-add-to-cart").classList.add("d-none")

                            document.getElementById('sold-out').classList.remove("d-none")
                            document.getElementById('product-quantity-quick-view').classList.add("d-none")
                        }

                    }
                });
            });


        decButton.addEventListener("click", function () {
            var value = parseInt(inputElement.value);
            if (value >= quantityQuickViewMax) {
                decButton.disabled = true
            } else if (value == 1) {
                decButton.disabled = true
            } else {
                incButton.disabled = false
            }

        });
        incButton.addEventListener("click", function () {
            var value = parseInt(inputElement.value);
            if (value >= quantityQuickViewMax) {
                incButton.disabled = true
            } else {
                decButton.disabled = false
            }
        });
    });
    /*Bắt đầu submit add to cart*/
    $("#btn-submit-add-to-cart").click(function () {
        var colorId = $("#color-selector").val();
        var quantity = $("#input-quantity").val();
        let userId = getUserId()
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/cart/addToCart/" + encodeURIComponent(productId) + '/' + colorId + '/' + quantity + '/' + Number(userId),
            async: false,
            headers: { "Authorization": getBearerToken() },
            data: {
                productId: productId,
                colorId: colorId,
                quantity: quantity,
                userId: userId
            },
            success: function (response) {
                if (response != null && response != "") {
                    if (response.statusCode == 200) {
                        window.location.href = "cart.html"
                    } else {
                        console.log("ERROR :", response)
                    }
                }
            },
            error: function (error) {
                console.error("Error creating user", error),
                    console.log("User created failed", data)
            }

        });
    });
    /*Kết thúc submit add to cart*/
});
function getUserId() {
    let userId = "";
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { Authorization: getBearerToken() },
        async: false,
        data: {
            token: localStorage.getItem("token"),
        },
        success: function (response) {
            if (response != null && response != "") {
                if (response.statusCode == 200) {
                    userId = response.data;
                } else if (response.statusCode == 403) {
                    window.location.href = "403.html"
                } else if (response.statusCode == 401) {
                    localStorage.setItem("accessLinkContinue", "index.html")
                    window.location.href = "login.html?#"
                }
            }
        },
        error: function (error) {
            console.error("Error getting user ID", error);
        }
    });
    return userId;
}