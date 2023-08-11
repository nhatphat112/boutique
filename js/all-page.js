 /*Bắt đầu đếm số lượng items trong cart */
 let bearerToken = "Bearer " + localStorage.getItem("token");
 var cartTotal = ('small#totalQuantity');
 var totalQuantity = 0;
 var userId = localStorage.getItem("userId");
 $.ajax({
     method: 'GET',
     url: "http://localhost:8080/cart/count/" + encodeURIComponent(userId),
     headers: { "Authorization": bearerToken },
     data: {
         userId: userId
     },

     success: function(response) {
         console.log("count cart success");
         $(cartTotal).text('(' + totalQuantity + ')');
     },
     error: function(error) {
         console.error("Error return productList", error);
     }
 });
