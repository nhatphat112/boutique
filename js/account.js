var userId = localStorage.getItem("userId");
let bearerToken = "Bearer " + localStorage.getItem("token");
$(document).ready(function() {
    /*Bắt đầu đếm số lượng items trong cart */
    var cartTotal = ('small#totalQuantity');
    var totalQuantity = 0;
    // var userId = localStorage.getItem("userId");
    $.ajax({
        method: 'GET',
        url: "http://localhost:8080/cart/count/" + encodeURIComponent(userId),
        headers: { "Authorization": bearerToken },
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


    /*Kết thúc đếm số lượng items trong cart */
    $("#profile").show();
    // Ẩn hiện các trang khi bấm vào các đề mục
    $('.toggle-link').click(function(event) {
        event.preventDefault();
        var target = $(this).data('target');
        $('.toggle-page').hide();
        $('#' + target).show();
    });
    // Kết thúc ẩn hiện các trang khi bấm vào các đề mục
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/user/getUser",
        // headers: { "Authorization": bearerToken },
        data: {
            userId: userId,
        },
        async: false,
    }).done(function(response) {
        if (response != null && response != "") {
            console.log(response);
            var user = response.data;
            // console.log(user);
            // var username = user.name;
            var email = user.email;
            console.log(username);
            $('.username').text(user.name);
            $('.email').text(user.email);
            $('input#username').val(user.name);
            console.log(email);
        } else {
            console.log('error');
        }
    });
    //Bắt đầu thay đổi mật khẩu
    $('#change-pass-submit').click(function() {
        var currentPass = $('#currentPass').val();
        var newPass = $('#newPass').val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/user/changepass",
            async: false,
            data: {
                id: userId,
                currentPass: currentPass,
                newPass: newPass
            },
            success: function(response) {
                console.log(response.data);
            },
            error: function(error) {
                console.error("change pass error", error);
            }

        })
        console.log('helllo')
    })
});

$('#edit-profile-link').click(function(event) {
    event.preventDefault();
    console.log("day la edit profile");
    let addressList;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/address/user?id=" + userId,
        headers: { "Authorization": bearerToken },
        async: false,
    }).done(function(response) {
        if (response != null && response != "") {
            addressList = response.data;
        }

    });
    content = "";
    if (addressList != null) {
        addressList.map(function(currentItem, index) {
            if (currentItem.cityOrProvinceName == "" || currentItem.cityOr) {
                content +=
                    `<p style="display: flex; align-items: center;">
        <button class="delete-address btn btn-sm btn-danger" style="height: 20px;font-size: 15px; display: flex;
        align-items: center; " type="button" >x</button>
        <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.countryName}</span>
        </p>`;
            } else {
                content +=
                    `<p style="display: flex; align-items: center;">
        <button class="delete-address btn btn-sm btn-danger" style="height: 20px;font-size: 15px; display: flex;
        align-items: center; " type="button" >x</button>
        <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}</span>
        </p>`;
            }
        });
    }
    document.getElementById("address-id").innerHTML = content;
    var addressRemoveIdList = [];
    $('.delete-address').click(function() {
        console.log('delete address')
        var pElement = $(this).parent();
        pElement.remove();
        var span = $(pElement).find('span');
        var removeAddressId = parseInt($(span).attr('id'));
        addressRemoveIdList.push(removeAddressId);
        console.log(addressRemoveIdList + ' addressList');
    })
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/phone/user?id=" + userId,
        async: false,
        headers: { "Authorization": bearerToken }
    }).done(function(response) {
        if (response != null && response != "") {
            if (response.statusCode == 200) {
                phoneList = response.data;
            } else if (response.statusCode == 401) {
                window.location.href = "login.html?#"
            } else if (response.statusCode == 403) {

            } else {
                console.log("response:", response)
            }
        }
    });
    let phoneContent = "";
    if (phoneList != null) {
        phoneList.map(function(currentItem, index) {
            phoneContent +=
                `<p style="display: flex; align-items: center;">
                <button class="delete-phone btn btn-sm btn-danger" style="height: 20px;font-size: 15px; display: flex;
                align-items: center; " type="button" >x</button>
                <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.phoneNumber}</span>
                </p>`;

        });
    }

    document.getElementById("phone-number-id").innerHTML = phoneContent;
    var phoneRemoveIdList = [];
    $('.delete-phone').click(function() {
        console.log('delete phone')
        var pElement = $(this).parent();
        pElement.remove();
        var span = $(pElement).find('span');
        var removePhoneId = parseInt($(span).attr('id'));
        phoneRemoveIdList.push(removePhoneId);
        console.log(phoneRemoveIdList);
    })
    $('#save-changes-submit').click(function() {
        console.log('save change button')

        if (phoneRemoveIdList.length != 0) {
            $.ajax({
                method: "POST",
                headers: { "Authorization": bearerToken },
                url: "http://localhost:8080/phone/delete",
                async: true,
                dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    idList: phoneRemoveIdList
                }),
            }).done(function(response) {
                if (response != null && response != "") {
                    // message = response.message
                    console.log("check response phone/delete:", response)

                }
            });
        }

        if (addressRemoveIdList.length != 0) {
            $.ajax({
                method: "POST",
                headers: { "Authorization": bearerToken },
                url: "http://localhost:8080/address/delete/",
                async: true,
                dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    idList: addressRemoveIdList
                }),

            }).done(function(response) {
                if (response != null && response != "") {
                    // message = response.message
                    console.log("check response address/delete:", response)

                }
            });
        }

    })

})
$('#addNumber').click(function() {
    newNumberInput.style.display = "block";
})

// get list country and town/city
let countryList;
let townCityList;
$.ajax({
    method: "GET",
    url: "http://localhost:8080/country",
    async: false,
    headers: { "Authorization": bearerToken },
}).done(function(response) {
    if (response != null && response != "") {
        countryList = response.data;
    }
});
$.ajax({
    method: "GET",
    url: "http://localhost:8080/city-province",
    async: false,
    headers: { "Authorization": bearerToken },
}).done(function(response) {
    if (response != null && response != "") {
        townCityList = response.data;
    }
});
// console.log("check phoneList :", phoneList);
// console.log("check addressList:", addressList);
// console.log("check countryList:", countryList);
// console.log("check townCityList:", townCityList);