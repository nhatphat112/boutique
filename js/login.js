$(document).ready(function() {
    $("#btn-login").click(function() {
        alert("ative")
        // lấy gtri của thẻ input có id là user
        var email = $("#email").val()
        var password = $("#pass").val()
            // Xuất giá trị ra trên tab console trên trình duyệt
            // console.log("username : ",username, " password : ",password);

        // ajax sẽ cho phép gọi đường dẫn web ngầm và lấy gtri của đg dẫn đó
        $.ajax({
                method: "POST",
                url: "http://localhost:8080/signin",
                data: {
                    email: email,
                    password: password
                }
            })
            .done(function(result) {
                //khi gọi API thì kết quả sẽ 
                console.log(result)
                if (result.statusCode==200) {
                    // lưu token vào bộ nhớ của browser
                    localStorage.setItem("token", result.data);
                    //"giohang":[{id:1,title:"shirt",price:109,soluong:10}]
                    // chuyển qua trang index
                  let accessLinkContinue = localStorage.getItem("accessLinkContinue")
                  if(accessLinkContinue!=""&&accessLinkContinue!=null){
                    localStorage.setItem("accessLinkContinue",null)
                  }else{
                    accessLinkContinue = "index.html"
                  }
                  $("#login-warning").addClass("d-none")
                    window.location.href = accessLinkContinue
                        // append: nối chuổi
                } else {
                   $("#login-warning").removeClass("d-none")
                }
                //   console.log( "Data : " , token );

            });
    })
})