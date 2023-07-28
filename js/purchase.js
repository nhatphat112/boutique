$(document).ready(function() {
    localStorage.setItem('userId', '1')
        // show list product was ordered
    let userId = localStorage.getItem('userId');
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/order-detail/user?id=" + userId,
        async: false

    }).done(function(res) {
        if (res.data != null && res.data != "") {
            let theadProduct = document.getElementById('thead-product')
            let productContainerContent = "";
            res.data.map(function(currentItem, index, arr) {
                productContainerContent +=
                    `<tbody class="product-item">
        <tr>
          <th class="ps-0 py-3 border-light" scope="row">
            <div class="d-flex align-items-center">
              <a class="reset-anchor d-block animsition-link" href="detail.html">
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
            <a class="reset-anchor" href="#!">
              <i class="fas fa-trash-alt small text-muted"></i>
            </a>
          </td>
        </tr>
        <tr>
          <th class="ps-0">
            <button class="btn-rate btn btn-dark" id="toggleReviewBtn">
              <a class=" link-light text-decoration-none" href="#">Rate</a>
            </button>&ensp;
            <button class="btn btn-dark">
              <a class="btn-buy-again link-light text-decoration-none" href="#">Buy again</a>
            </button>
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
                <button type="submit" class="btn-submit btn btn-dark">
                  <a class=" link-light text-decoration-none" href="#">Submit</a>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </th>
        </tr>
        </tbody>
  
      `


            })
            theadProduct.insertAdjacentHTML('afterend', productContainerContent)
        }

    });
    $('.selected-rating').text(1);
    $(".selected-rating").val(1)
    $('.rating').each(function(index, element) {
        element.getElementsByClassName('rating-star')[0].classList.add('active')
    })

    //  let rating = document.getElementsByClassName('rating')
    //  Array.from(rating).map(function(currentItem){
    //   currentItem.getElementsByClassName('rating-star')[0].classList.add('active')
    //  })

    $('.rating-star').click(function() {
        $(this).addClass('active');
        $(this).prevAll('.rating-star').addClass('active');
        $(this).nextAll('.rating-star').removeClass('active');
        var selectedRating = $(this).index() + 1;
        $(this).closest('.product-item').find('.selected-rating').text(selectedRating);
        $(this).closest('.product-item').find('.selected-rating').val(selectedRating);
    });
    // hidden / appear form review
    $('.btn-rate').click(function(event) {
            event.preventDefault()
            let reviewForm = $(this).closest('.product-item').find('.reviewForm')[0].classList.toggle('d-none')

        })
        // submit form
    $(".btn-submit").click(function(event) {
        event.preventDefault()
        let reviewText = $(this).closest('.product-item').find("textarea[name='review-text']").val()
        let reviewStar = $(this).closest('.product-item').find(".selected-rating")[0].textContent

        let isSuccess = false;

        $.ajax({
                method: "POST",
                url: "http://localhost:8080/purchase/rate",
                async: false,
                data: {
                    content: reviewText,
                    starNumber: parseInt(reviewStar)
                }
            })
            .done(function() {
                isSuccess = true
            });
        if (isSuccess == true) {
            $(this).closest('.product-item').find('.reviewForm')[0].classList.toggle('d-none')
            alert("Success !")
        }
    })
});