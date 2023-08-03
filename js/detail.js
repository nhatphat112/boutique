$(document).ready(function () {
    let contentDetailMini = "";
    let contentDetailMain = "";
    let contentProductColor = "";
    var urlParams = new URLSearchParams(window.location.search);
    let productId = parseInt(urlParams.get('id'))
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/product/detail?id=" + productId,
    })
        .done(function (result) {
            if (result != null && result != "") {
                let stockResponseList = result.data.stockResponseList;
                $.each(stockResponseList, function (index, currentItem) {
                    contentDetailMini += `<div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100"
                     src = "img/${currentItem.image}" alt = "..." ></div >`;
                    contentDetailMain += `<div class="swiper-slide h-auto" style="width: 400px;">
                      <a class="glightbox product-view" href="img/${currentItem.image}"
                      data-gallery="gallery2" data-glightbox="Product item 1"><img
                          class="img-fluid" src="img/${currentItem.image}" alt="..."></a>
                     </div>`
                    contentProductColor += `<a class="dropdown-item"
                    href="#!">${currentItem.colorName}</a>`
                });
                $("#wrapper-mini").html(contentDetailMini)
                $("#wrapper-main").html(contentDetailMain)
                $("#product-name").html(result.data.name)
                $("#description").html(`${result.data.description}`)
                $("#product-description").html(`${result.data.description}`)
                $("#listcolor").html(contentProductColor)
            }
            console.log("check detail:", contentDetailMain)
        });
})