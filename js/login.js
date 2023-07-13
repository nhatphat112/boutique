
$(document).ready(function () {
    $("#btn-login").click(function () {
        // lấy gtri của thẻ input có id là user
        var username=  $("#email").val() 
        var password=$("#pass").val()
        // Xuất giá trị ra trên tab console trên trình duyệt
        // console.log("username : ",username, " password : ",password);

        // ajax sẽ cho phép gọi đường dẫn web ngầm và lấy gtri của đg dẫn đó
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/signin",
            data:{ 
                    email: username,
                    password :password 
                }
          })
            .done(function( result ) {
                //khi gọi API thì kết quả sẽ 
                var token=result.data
                if(token!=null && token!=""){
                    // lưu token vào bộ nhớ của browser
                    localStorage.setItem("username",username);
                    localStorage.setItem("token",token);
                    //"giohang":[{id:1,title:"shirt",price:109,soluong:10}]
                    // chuyển qua trang index
                    window.location.href="index.html"
                    // append: nối chuổi
                }else{
                    alert("sai tai khoan")
                }
            //   console.log( "Data : " , token );
            });
    })
})

