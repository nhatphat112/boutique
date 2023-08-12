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
         totalQuantity = response.data;
         console.log("count cart success");
         $(cartTotal).text('(' + totalQuantity + ')');
     },
     error: function(error) {
         console.error("Error return productList", error);
     }
 });
 function getUserId(){
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { Authorization: bearerToken },
        async: false,
        data: {
          token: localStorage.getItem("token"),
        },
      }).done(function (response) {
        return response;
      });
 }

