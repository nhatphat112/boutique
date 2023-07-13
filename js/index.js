$(document).ready(function () {
  // console.log("index.js active")
  let productContainer = document.getElementById("product-container");
  let listProduct = "";
  let contentProduct = "";
  let stock = "";
  window.addEventListener("load", function () {
    jQuery.ajax({
      url: "http://localhost:8080/product",
      type: "GET",
      async: false,
      success: function (res) {
        if (res != null && res != "") {
          listProduct = res.data;
          res.data.map(function (currentItem, index, arr) {
            contentProduct += `<div class="product-item col-xl-3 col-lg-4 col-sm-6">
                            <div class="product text-center">
                                <div class="position-relative mb-3">
                                    <div class="badge text-white bg-"></div>
                                    <a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/${currentItem.image}" alt="..."></a>
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
          console.log("check product container :", productContainer);
        }
      },
    });
    $(".btn-add-to-cart").click(function () {
      let quantityQuickView = document
        .getElementById("product-quantity")
        .classList.add("d-none");
      // <div id="product-quantity" class="border d-flex align-items-center justify-content-between py-1 px-3">
      //               <span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
      //               <div class="quantity">
      //                 <button class="dec-btn p-0">
      //                   <i class="fas fa-caret-left"></i>
      //                 </button>
      //                 <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
      //                 <button class="inc-btn p-0">
      //                   <i class="fas fa-caret-right"></i>
      //                 </button>
      //               </div>
      //             </div>
      // <div id="product-quantity" class="">
      //               <span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
      //               <div class="quantity">
      //                 <button class="dec-btn p-0">
      //                   <i class="fas fa-caret-left"></i>
      //                 </button>
      //                 <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
      //                 <button class="inc-btn p-0">
      //                   <i class="fas fa-caret-right"></i>
      //                 </button>
      //               </div>
      //             </div>
      let colorSelector = document.getElementById("color-selector");
      console.log("check colorSelector", colorSelector);
      let productId = $(this).attr("product-id");
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
      listProduct.map(function (currentItem, index, arr) {
        if (currentItem.id == productId) {
          imageProductQuickView.style.background = `url('/img/${currentItem.image}')`;
          imageProductQuickView.setAttribute(
            "href",
            `url('/img/${currentItem.image}')`
          );

          productNameQuickView.textContent = currentItem.name;
          priceQuickView.textContent = currentItem.price + "$";
          descriptionQuickView.textContent = currentItem.desciption;
          console.log("check currentItem.name", currentItem.name);
        }
      });

      console.log("check list Product :" + listProduct);
      let contentColor = `<option class="dropdown-item" selected>Select Color</option>`;

      jQuery.ajax({
        url: "http://localhost:8080/stock/product?id=" + productId,
        type: "GET",
        async: false,
        success: function (res) {
          console.log(res);
          if (res != null && res != "") {
            stock = res.data;
            res.data.map(function (currentItem, index, arr) {
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
    this.document
      .getElementById("color-selector")
      .addEventListener("change", function () {
        let productQuantity = document.getElementById("product-quantity");
        let colorSelectorValue = this.value;
        console.log("colorSelectorValue", colorSelectorValue);
        document.getElementById('input-quantity').value=1
        productQuantity.classList.remove("d-none");
        stock.map(function (currentItem, index, arr) {
          if (colorSelectorValue == currentItem.colorId) {
            quantityQuickViewMax = currentItem.quantity
            console.log("active map");
            document.getElementById("price-quick-view").textContent =
              currentItem.price + "$";
            document.getElementById(
              "image-product-quick-view"
            ).style.background = `url('/img/${currentItem.image}')`;
          }
        });
      });
    var inputElement = document.querySelector(".quantity input");
    var decButton = document.querySelector(".quantity .dec-btn");
    var incButton = document.querySelector(".quantity .inc-btn");

    decButton.addEventListener("click", function () {
      var value = parseInt(inputElement.value);
    });

    incButton.addEventListener("click", function () {
      var value = parseInt(inputElement.value);
      if (value == quantityQuickViewMax) {
        incButton.disabled = true
      }
    });
  });
});
