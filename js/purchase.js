import { getBearerToken, getToken } from "./token.js";
$(document).ready(function () {
  let userId = getUserId();
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/order-detail/user?id=" + userId,
    async: false,
    headers: { Authorization: getBearerToken() },
  }).done(function (res) {
    if (res.data != null && res.data != "") {
      let theadProduct = document.getElementById("thead-product");
      let productContainerContent = "";
      res.data.map(function (currentItem, index, arr) {
        productContainerContent += `<tbody class="product-item">
        <tr>
          <th class="ps-0 py-3 border-light" scope="row">
            <div class="d-flex align-items-center">
              <a class="reset-anchor d-block animsition-link" href="detail.html?id=${currentItem.productId}">
                <img src="img/${currentItem.productImage}" alt="..." width="70" />
              </a>
              <div class="ms-3">
                <strong class="h6">
                  <a class="reset-anchor animsition-link" href="detail.html?id=${currentItem.productId}">
                    ${currentItem.productName}
                  </a>
                </strong>
              </div>
            </div>
          </th>
          <td class="p-3 align-middle border-light">
            <p class="mb-0 small">$${currentItem.productPrices}</p>
          </td>
          <td class="p-3 align-middle border-light">
            <div class="border d-flex align-items-center justify-content-between px-3">
              <span class="small text-uppercase text-gray headings-font-family">Quantity</span>
              <div class="quantity">
                <input class="form-control form-control-sm border-0 shadow-0 p-0 bg-white" readonly="readonly"
                  type="text" value="${currentItem.quantity}" />
              </div>
            </div>
          </td>
          <td class="p-3 align-middle border-light">
            <p class="mb-0 small">$${currentItem.prices}</p>
          </td>
          <td class="p-3 align-middle border-light">
          <p class="mb-0 small">${currentItem.statusName}</p>
        </td>
          <td class="p-3 align-middle border-light">
            <a order-detail-id=${currentItem.id} class="reset-anchor btn-delete-ordered" data-toggle="modal" data-target="#confirmModal" href="#!">
              <i class="fas fa-trash-alt small text-muted"></i>
            </a>
          </td>
        </tr>
        <tr>
          <th class="ps-0">
            <button statusId=${currentItem.statusId} class="btn-rate btn btn-dark" id="toggleReviewBtn">
              <a class=" link-light text-decoration-none" href="#">Rate</a>
            </button>&ensp;
            <button productId=${currentItem.productId} class="btn-buy-again btn btn-dark">
              <a class="btn-buy-again link-light text-decoration-none" href="#">Buy again</a>
            </button>
            <div class=" d-none alert alert-warning mt-2 mb-0" role="alert">
            The product is being shipped, you cannot rate it at the moment.
                                      </div>
          </th>
        </tr>
        <tr class="reviewForm d-none">
          <th class="border-bottom-0">
            <div id="reviewForm" class=" mt-3">
              <form class="form-review">
                <div class="form-group">
                  <label for="reviewText">Your Review:</label>
                  <textarea class="form-control" name="review-text" id="reviewText" rows="4"></textarea>
                </div>
                <div class="rating">
                  <span class="rating-star">&#9733;</span>
                  <span class="rating-star">&#9733;</span>
                  <span class="rating-star">&#9733;</span>
                  <span class="rating-star">&#9733;</span>
                  <span class="rating-star">&#9733;</span>
                </div>
                <p class="mt-3" id="ratingResult">Bạn đã đánh giá: <span class="selected-rating" id="selectedRating">0</span> sao</p>
                <button type="submit" product-id="${currentItem.productId}"  class=" btn-submit btn btn-dark">
                  <a class=" link-light text-decoration-none" href="#">Submit</a>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </th>
        </tr>
        </tbody>
  
      `;
      });
      theadProduct.insertAdjacentHTML("afterend", productContainerContent);
    }
  });
  $(".selected-rating").text(1);
  $(".selected-rating").val(1);
  $(".rating").each(function (index, element) {
    element.getElementsByClassName("rating-star")[0].classList.add("active");
  });

  //  let rating = document.getElementsByClassName('rating')
  //  Array.from(rating).map(function(currentItem){
  //   currentItem.getElementsByClassName('rating-star')[0].classList.add('active')
  //  })

  $(".rating-star").click(function () {
    $(this).addClass("active");
    $(this).prevAll(".rating-star").addClass("active");
    $(this).nextAll(".rating-star").removeClass("active");
    var selectedRating = $(this).index() + 1;
    $(this)
      .closest(".product-item")
      .find(".selected-rating")
      .text(selectedRating);
    $(this)
      .closest(".product-item")
      .find(".selected-rating")
      .val(selectedRating);
  });
  // hidden / appear form review
  $(".btn-rate").click(function (event) {
    event.preventDefault();
    if ($(this).attr("statusId") == 2) {
      console.log("status Id :", $(this).attr("statusId"));
      let warningAlert = $(this)
        .closest("tr")
        .find(".alert-warning")
        .addClass("d-none");
    } else {
      let reviewForm = $(this)
        .closest(".product-item")
        .find(".reviewForm")[0]
        .classList.toggle("d-none");
    }
  });
  // submit form
  $(".btn-submit").click(function (event) {
    userId = getUserId()
    event.preventDefault();
    let reviewText = $(this)
      .closest(".product-item")
      .find("textarea[name='review-text']")
      .val();
    let reviewStar = $(this)
      .closest(".product-item")
      .find(".selected-rating")[0].textContent;
    let productId = $(this).attr("product-id");
    let isSuccess = false;

    $.ajax({
      method: "POST",
      url: "http://localhost:8080/purchase/rate",
      async: false,
      data: {
        content: reviewText,
        starNumber: parseInt(reviewStar),
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
      headers: { Authorization: getBearerToken() },
    }).done(function () {
      isSuccess = true;
    });
    if (isSuccess == true) {
      $(this)
        .closest(".product-item")
        .find(".reviewForm")[0]
        .classList.toggle("d-none");
      bootbox.alert("Review Successfully !");
    }
  });
  $(".btn-buy-again").click(function (event) {
    let productIdBuyAgain = $(this).attr("productId");
    event.preventDefault();
    let url = "detail.html?id=" + productIdBuyAgain;

    window.location.href = url;
  });
  let orderDetailIdNeedDelete;
  $(".btn-delete-ordered").click(function () {
    orderDetailIdNeedDelete = $(this).attr("order-detail-id");
    $("#content-quick-view-confirm").text("Are you sure delete?");
    $("#btn-quick-view-confirm").addClass("btn-delete-ordered");
  });
  $("#btn-quick-view-confirm").click(function () {
    let buttonQuickViewConfirm = $(this);
    if (buttonQuickViewConfirm.hasClass("btn-delete-ordered")) {
      buttonQuickViewConfirm.removeClass("btn-delete-ordered");
      let deleteIsSuccess = true;
      $.ajax({
        method: "GET",
        url:
          "http://localhost:8080/order-detail/delete?id=" +
          orderDetailIdNeedDelete,
        headers: { Authorization: getBearerToken() },
        async: false,
      }).done(function (response) {
        if (response != "" && response != null) {
          if (response.statusCode == 200) {
            deleteIsSuccess = true;
          } else {
            deleteIsSuccess = false;
          }
        }
      });
      if (deleteIsSuccess) {
        let trProduct = $("a")
          .filter(`[order-detail-id='${orderDetailIdNeedDelete}']`)
          .closest("tr");
        trProduct.next().remove();
        trProduct.remove();
      }
    }
  });
  // Rest of your JavaScript code...
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
          window.location.href = "403.html";
        } else if (response.statusCode == 401) {
          localStorage.setItem("accessLinkContinue", "purchase.html");
          window.location.href = "login.html";
        } else {
        }
      }
    },
    error: function (error) {
      console.error("Error getting user ID", error);
    },
  });
  return userId;
}
