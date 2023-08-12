$(document).ready(function () {
    $("#btn-submit-add-to-cart").addClass("d-none")
    $('#sold-out').addClass('d-none');
    let contentDetailMini = "";
    let contentDetailMain = "";
    let contentProductColor = "";
    let contentReview = "";
    let price = "";
    var urlParams = new URLSearchParams(window.location.search);
    let productId = parseInt(urlParams.get('id'))
    var stockResponseList = "";
    let productRelatedList = "";
    let categoryName = `<strong class="text-uppercase text-dark">Category:</strong>`;
    contentProductColor = `<option class="dropdown-item" selected>Select Color</option>`;
    let userId = 0
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/product/detail?id=" + productId,
        async: false,
    })
        .done(function (result) {
            if (result != null && result != "") {
                categoryId = parseInt(result.data.categoryId);
                categoryName += `<a class="reset-anchor ms-2" href="shop.html?categoryId=${categoryId}">${result.data.categoryName}</a>`;
                $('#category-name').append(categoryName);
                stockResponseList = result.data.stockResponseList;

                $.each(stockResponseList, function (index, currentItem) {
                    console.log(" maxQuantityStock_ONe " + currentItem.quantity);

                    contentDetailMini += `<div class="swiper h-auto mb-3"><img stock-id=${currentItem.id} class="w-100"
                     src = "img/${currentItem.image}" alt = "..." ></div >`;
                    contentDetailMain = `<div id=${currentItem.colorId}>
                      <a class="glightbox product-view" href="img/${currentItem.image}"
                      data-gallery="gallery2" data-glightbox="Product item 1"><img
                          class="img-fluid" src="img/${currentItem.image}" alt="..."></a>
                     </div>`;
                    price = currentItem.price;

                    contentProductColor += `<option stock-id=${currentItem.id} img=${currentItem.image} class="dropdown-item" value=${currentItem.colorId} maxQuantity=${currentItem.quantity} >${currentItem.colorName}</option>`;

                    //contentProductColor += `<a color-id=${currentItem.colorId} class="dropdown-item"
                    //href = "#!" > $ { currentItem.colorName } < /a>`
                });
                let reviewList = result.data.reviewList;
                let starAverage = 0;
                let quantity = 0;
                let contentStar = "";
                $.each(reviewList, function (index, currentItem) {
                    contentReview += `<div class="d-flex mb-3"><div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-1.png" alt="" width="50"/></div>
                    <div class="ms-3 flex-shrink-1">
                        <h6 class="mb-0 text-uppercase">${currentItem.userName}</h6>`;
                    for (var i = 0; i < parseInt(currentItem.starNumber); ++i) {
                        contentReview += `<li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>`
                    }
                    contentReview += `<p class="text-sm mb-0 text-muted">${currentItem.contentReview}</p></div></div>`
                    starAverage += currentItem.starNumber;
                    quantity++;
                });
                starAverage /= quantity
                for (var i = 0; i < Math.floor(starAverage); i++) {
                    contentStar += `<li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>`
                }
                $("#star-product").html(contentStar)
                $("#wrapper-mini").html(contentDetailMini)
                $("#wrapper-main").html(contentDetailMain)
                $("#product-name").html(result.data.name)
                $("#description").html(`${result.data.description}`)
                $("#color-selector").html(contentProductColor)
                $('#price').text('$' + price);
                if (contentReview != "") {
                    $("#review-list").html(contentReview)
                }
            }
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/category/" + result.data.categoryId,
            }).done(function (result) {
                if (result != null && result != "") {
                    let i = 0;
                    $.each(result.data, function (index, currentItem) {
                        if (i < 4) {
                            productRelatedList += `<div class="col-lg-3 col-sm-6">
                        <div class="product text-center skel-loader">
                            <div class="d-block mb-3 position-relative">
                                <a class="d-block" href="detail.html?id=${currentItem.id}"><img class="img-fluid w-100" src="img/${currentItem.image}" alt="..."></a>
                                
                            </div>
                            <h6> <a class="reset-anchor" href="detail.html?id=${currentItem.id}">Kui Ye Chen’s AirPods</a></h6>
                            <p class="small text-muted">$${currentItem.price}</p>
                        </div>
                    </div>`
                        }
                        i++
                    });
                    $("#related-product").html(productRelatedList)
                }
            })
        });

    let quantityDisplay = $('#product-quantity').addClass('d-none');
    $('#color-selector').change(function () {
        var maxQuantityStock = $('#color-selector option:selected').attr("maxQuantity");
        console.log(" maxQuantityStock " + maxQuantityStock);
        if (maxQuantityStock > 0) {
            console.log('lon hon 0 roi');
            $('#sold-out').addClass('d-none');
            $("#btn-submit-add-to-cart").removeClass("d-none")
            quantityDisplay.removeClass('d-none');
        } else {
            console.log('nho hon 0 roi');
            $('#sold-out').removeClass('d-none');
            $("#btn-submit-add-to-cart").addClass("d-none")
            $('#product-quantity').toggleClass('d-none');

        }
    })
    $("img.w-100").click(function () {
        // console.log('you click on swiper')
        var miniImg = $(this);
        // var imgSrc = miniImg.attr('src');
        // console.log(imgSrc)


        $.each(stockResponseList, function (index, stock) {
            if ($(miniImg).attr('stock-id') == stock.id) {
                console.log('xin chao2')
                price = stock.price;
                $('#price').text('$' + price);
                contentDetailMain = `<div>
            <a class="glightbox product-view" href="img/${stock.image}"
            data-gallery="gallery2" data-glightbox="Product item 1"><img
                class="img-fluid" src="img/${stock.image}" alt="..."></a>
           </div>`;
                $("#wrapper-main").html(contentDetailMain)

            }
        })
    })

    $('#color-selector').change(function () {
        var selectStock = $('#color-selector option:selected').attr('stock-id');
        var img = $('#color-selector option:selected').attr('img');
        console.log(img + ' img');
        contentDetailMain = `<div>
                <a class="glightbox product-view" href="img/${img}"
                data-gallery="gallery2" data-glightbox="Product item 1"><img
                    class="img-fluid" src="img/${img}" alt="..."></a>
               </div>`;
        $("#wrapper-main").html(contentDetailMain)
        $.each(stockResponseList, function (index, stock) {
            if (selectStock == stock.id) {
                console.log('xin chao3')
                price = stock.price;
                $('#price').text('$' + price);
                contentDetailMain = `<div>
            <a class="glightbox product-view" href="img/${stock.image}"
            data-gallery="gallery2" data-glightbox="Product item 1"><img
                class="img-fluid" src="img/${stock.image}" alt="..."></a>
           </div>`;
                $("#wrapper-main").html(contentDetailMain)
            }



        });
        $("#btn-submit-add-to-cart").click(function () {
            console.log("click on add to cartx");
            var colorId = $("#color-selector").val();
            // var selectedOption = $('#color-selector option:selected');
            // console.log(selectedOption.value);
            console.log(" colorId " + colorId);
            var quantity = $("#input-quantity").val();
            console.log(" quantity " + quantity);
            console.log(" productId " + productId);
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
                            localStorage.setItem("accessLinkContinue", "index.html")
                            window.location.href = "login.html"
                        } else {
                            console.log("check response user/getId/token:", response)
                        }
                    }
                });
            $.ajax({
                method: "GET",
                url: "http://localhost:8080/cart/addToCart/" + encodeURIComponent(productId) + '/' + colorId + '/' + quantity + '/' + userId,
                async: false,
                headers: { "Authorization": bearerToken },
                data: {
                    productId: productId,
                    colorId: colorId,
                    quantity: quantity,
                    userId: userId
                },
                success: function (response) {
                    console.log("User created successfully", response)
                    console.log("User created successfully", response.data)
                    window.location.href = "cart.html"
                },
                error: function (error) {
                    console.error("Error creating user", error),
                        console.log("User created failed", data)
                }

            });
        })
    })
})