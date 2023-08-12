$(document).ready(function() {
    $("#btn-login").click(function() {
        // lấy gtri của thẻ input có id là user
        var email = $("#email").val();
        var password = $("#pass").val();
        let roleId = 0;
        // Xuất giá trị ra trên tab console trên trình duyệt
        // console.log("username : ",username, " password : ",password);

        // ajax sẽ cho phép gọi đường dẫn web ngầm và lấy gtri của đg dẫn đó
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/signin",
            data: {
                email: email,
                password: password,
            },
        }).done(function(result) {
            //khi gọi API thì kết quả sẽ
            console.log(result);
            if (result.statusCode == 200) {
                let bearerToken = "Bearer " + result.data;
                // lưu token vào bộ nhớ của browser
                localStorage.setItem("token", result.data);
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8080/user/getid",
                    headers: { Authorization: bearerToken },
                    async: false,
                    data: {
                        token: localStorage.getItem("token"),
                    },
                }).done(function(response) {
                    if (response != "" && response != null) {
                        if (response.statusCode == 200) {
                            // localStorage.setItem("userId", response.data);
                        } else {
                            console.log("check response user/getId/token:", response);
                        }
                    }
                });
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8080/user/getRoleId",
                    headers: { Authorization: bearerToken },
                    async: false,
                    data: {
                        token: localStorage.getItem("token"),
                    },
                }).done(function(response) {
                    if (response != "" && response != null) {
                        if (response.statusCode == 200) {
                            roleId = response.data;
                        } else {
                            console.log("check response user/getId/token:", response);
                        }
                    }
                });
                //"giohang":[{id:1,title:"shirt",price:109,soluong:10}]
                // chuyển qua trang index
                let accessLinkContinue = localStorage.getItem("accessLinkContinue");
                if (
                    accessLinkContinue != "" &&
                    accessLinkContinue != null &&
                    accessLinkContinue != "null"
                ) {
                    localStorage.removeItem("accessLinkContinue");
                } else {
                    accessLinkContinue = "index.html";
                }
                $("#login-warning").addClass("d-none");
                if (roleId == 1) {
                    window.location.href = "admin/index.html";
                } else {
                    window.location.href = "index.html"
                        //accessLinkContinue;
                }
                // append: nối chuổi
            } else {
                $("#login-warning").removeClass("d-none");
            }
            //   console.log( "Data : " , token );
        });
    });
});