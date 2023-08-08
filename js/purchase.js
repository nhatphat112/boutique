$(document).ready(function() {

  let bearerToken = "Bearer " + localStorage.getItem("token");
  let userId = 0;

  // get userId by jwt
  $.ajax({
      method: "GET",
      url: "http://localhost:8080/user/getid",
      headers: { "Authorization": bearerToken },
      async: false,
      data: {
          token: localStorage.getItem("token")
      }

  }).done(function(response) {
      if (response != "" && response != null) {
          if (response.statusCode == 200) {
              userId = response.data;
          } else if (response.statusCode == 403) {
              window.location.href = "403.html";
          } else if (response.statusCode == 401) {
              localStorage.setItem("accessLinkContinue", "purchase.html");
              window.location.href = "login.html?#";
          } else {
              console.log("check response user/getId/token:", response);
          }
      }
  });

  // show list product was ordered
  console.log("check bearerToken:", bearerToken);

  $.ajax({
      type: 'GET',
      url: "http://localhost:8080/order-detail/user?id=" + userId,
      async: false,
      headers: { "Authorization": bearerToken }

  }).done(function(res) {
      console.log("check response :", res);
      if (res.data != null && res.data != "") {
          let theadProduct = document.getElementById('thead-product');
          let productContainerContent = "";
          res.data.map(function(currentItem, index, arr) {
              productContainerContent +=
                  `<tbody class="product-item">
                      <!-- ... (Rest of your HTML code) ... -->
                  </tbody>`;
          });
          theadProduct.insertAdjacentHTML('afterend', productContainerContent);
      }
  });

  // Rest of your JavaScript code...

  /* Bắt đầu đếm số lượng items trong cart */
  var cartTotal = $('small#totalQuantity');
  var totalQuantity = 0;

  $(document).ready(function() {
      var userId = localStorage.getItem("userId");
      $.ajax({
          method: 'GET',
          url: "http://localhost:8080/cart/count/" + encodeURIComponent(userId),
          data: {
              userId: userId
          },
          success: function(response) {
              console.log(response.data + ' totalQuantity');
              totalQuantity = response.data;
              $(cartTotal).text('(' + totalQuantity + ')');
          },
          error: function(error) {
              console.error("Error return productList", error);
          }
      });
  });
});
