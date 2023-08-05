$(document).ready(function () {
    let contentDetailMini = "";
    let contentDetailMain = "";
    let contentProductColor = "";
    let contentReview = "";
    var urlParams = new URLSearchParams(window.location.search);
    let productId = parseInt(urlParams.get('id'))
    contentProductColor = `<option class="dropdown-item" selected>Select Color</option>`;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/product/detail?id=" + productId,
        async: false,
    })
        .done(function (result) {
            if (result != null && result != "") {
                // listProduct = result.data;
                let stockResponseList = result.data.stockResponseList;
                $.each(stockResponseList, function (index, currentItem) {
                    console.log(" maxQuantityStock_ONe " + currentItem.quantity);

                    contentDetailMini += `<div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100"
                     src = "img/${currentItem.image}" alt = "..." ></div >`;
                    contentDetailMain += `<div class="swiper-slide h-auto">
                      <a class="glightbox product-view" href="img/${currentItem.image}"
                      data-gallery="gallery2" data-glightbox="Product item 1"><img
                          class="img-fluid" src="img/${currentItem.image}" alt="..."></a>
                     </div>`;
                    contentProductColor += `<option class="dropdown-item" value=${currentItem.colorId} maxQuantity=${currentItem.quantity} >${currentItem.colorName}</option>`;

                    //contentProductColor += `<a color-id=${currentItem.colorId} class="dropdown-item"
                    //href = "#!" > $ { currentItem.colorName } < /a>`
                });
                let reviewList = result.data.reviewList;
                $.each(reviewList, function (index, currentItem) {
                    contentReview += `<div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-1.png" alt="" width="50" /></div>
                    <div class="ms-3 flex-shrink-1">
                        <h6 class="mb-0 text-uppercase">${currentItem.userName}</h6>`
                    for (var i = 0; i < parseInt(currentItem.starNumber); ++i) {
                        contentReview += `<li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>`
                    }
                    contentReview += `<p class="text-sm mb-0 text-muted">${currentItem.contentReview}</p>
                    </div>`
                });
                $("#wrapper-mini").html(contentDetailMini)
                $("#wrapper-main").html(contentDetailMain)
                $("#product-name").html(result.data.name)
                $("#description").html(`${result.data.description}`)
                $("#color-selector").html(contentProductColor)
                if(contentReview!=""){
                    $("#review-list").html(contentReview)
                }
            }
        });

    //('#sold-out').add("d-none");
    //$('#sold-out').hide();
    //document.getElementById('sold-out').classList.add("d-none")

    //$('#sold-out').addClass('d-none');

    //document.getElementById("product-quantity-quick-view")
    //.classList.add("d-none");
    //$('#product-quantity').addClass('d-none');

    // if (colorSelectorValue == "Select Color") {
    //     document.getElementById("btn-submit-add-to-cart").classList.add("d-none")

    // }


    let quantityDisplay = $('#product-quantity').addClass('d-none');
    $('#color-selector').change(function () {
        var maxQuantityStock = $('#color-selector option:selected').attr("maxQuantity");
        console.log(" maxQuantityStock " + maxQuantityStock);
        if (maxQuantityStock > 0) {
            console.log('lon hon 0 roi');
            //$('#myName').removeClass('d-none');
            //$('#sold-out').addClass('d-none');
            $('#sold-out').toggleClass('d-none');
            //$('#product-quantity').removeClass('d-none');
            quantityDisplay.removeClass('d-none');
            //$('#product-quantity').addClass('d-none');
            //document.getElementById('sold-out').classList.add("d-none")
        } else {
            console.log('nho hon 0 roi');
            //$('#sold-out').removeClass('d-none');
            //$('#product-quantity').addClass('d-none');
            $('#product-quantity').toggleClass('d-none');

        }
    })

    $("#btn-submit-add-to-cart").click(function () {
        console.log("click on add to cartx");
        var colorId = $("#color-selector").val();
        var selectedOption = $('#color-selector option:selected');
        console.log(selectedOption.value);

        console.log(" colorId " + colorId);
        var quantity = $("#input-quantity").val();
        console.log(" quantity " + quantity);


        //let productId = parseInt(urlParams.get('id'));
        console.log(" productId " + productId);

        var userId = localStorage.getItem("userId");
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/cart/addToCart/" + encodeURIComponent(productId) + '/' + colorId + '/' + quantity + '/' + userId,
            async: false,
            data: {
                productId: productId,
                colorId: colorId,
                quantity: quantity,
                userId: userId
            },
            success: function (response) {
                console.log("User created successfully", response)
                console.log("User created successfully", response.data)
            },
            error: function (error) {
                console.error("Error creating user", error),
                    console.log("User created failed", data)
            }

        });
    })
})
    // $(document).ready(function() {

// })
