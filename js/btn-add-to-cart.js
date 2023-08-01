export function myFunction() {
    let stock = "";
    //window.addEventListener("load", function() {
    var inputElement = document.querySelector(".quantity input");
    var decButton = document.querySelector(".quantity .dec-btn");
    var incButton = document.querySelector(".quantity .inc-btn");
    $(".btn-add-to-cart").click(function() {
        document.getElementById('sold-out').classList.add("d-none")
        let quantityQuickView = document
            .getElementById("product-quantity-quick-view")
            .classList.add("d-none");
        console.log("check quantityQuickView", quantityQuickView)

        let colorSelector = document.getElementById("color-selector");
        console.log("check colorSelector", colorSelector);
        let productId = parseInt($(this).attr("product-id"));
        console.log('check btn add to cart ' + productId);
        // let productId = event.target.getAttribute('product-id');
        console.log("check product id :", productId);
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
        console.log('check descriptionQuickView:', descriptionQuickView)
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
                descriptionQuickView.textContent = currentItem.desciption;
                console.log('check currentItem.desciption:', currentItem.desciption)

            }
        });
        console.log("check list Product :" + listAllProduct);
        let contentColor = `<option class="dropdown-item" selected>Select Color</option>`;
        /*Bắt đầu submit add to cart*/
        $("#btn-submit-add-to-cart").click(function() {
            var colorId = $("#color-selector").val();;
            var quantity = $("#input-quantity").val();
            var userId = localStorage.getItem("userId");
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/cart/addToCart/" + encodeURIComponent(productId) + '/' + colorId + '/' + quantity + '/' + userId,
                data: {
                    productId: productId,
                    colorId: colorId,
                    quantity: quantity,
                    userId: userId
                },
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
                console.log(res);
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
};