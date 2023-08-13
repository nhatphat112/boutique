var phoneList;
let addressList;
var userId;
$(document).ready(function () {
    /*Kết thúc đếm số lượng items trong cart */
    $("#profile").show();
    // Ẩn hiện các trang khi bấm vào các đề mục
    $('.toggle-link').click(function (event) {
        event.preventDefault();
        var target = $(this).data('target');
        $('.toggle-page').hide();
        $('#' + target).show();
    });
    //Kết thúc ẩn hiện các trang khi bấm vào các đề mục

    //Bắt đầu getId
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getid",
        headers: { "Authorization": bearerToken },
        async: false,
        data: {
            token: localStorage.getItem("token")
        }

    })
        .done(function (response) {
            if (response != "" && response != null) {
                if (response.statusCode == 200) {
                    userId = response.data;
                    console.log('userIdFromToken ' + userId);
                } else if (response.statusCode == 403) {
                    window.location.href = "403.html"
                } else if (response.statusCode == 401) {
                    localStorage.setItem("accessLinkContinue", "account.html")
                    window.location.href = "login.html?#"
                } else {
                    console.log("check response user/getId/token:", response)
                }
            } else {
                window.location.href = "login.html?#"
            }
        });
    // Kết thúc getId
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/user/getUser",
        headers: { "Authorization": bearerToken },
        data: {
            token: localStorage.getItem("token"),
        },
        async: false,
    })
        .done(function (response) {
            if (response != "" && response != null) {
                if (response.statusCode == 200) {
                    var user = response.data;
                    var email = user.email;
                    $('.username').text(user.name);
                    $('.email').text(user.email);
                    $('input#username').val(user.name);
                } else if (response.statusCode == 403) {
                    window.location.href = "403.html"
                } else if (response.statusCode == 401) {
                    localStorage.setItem("accessLinkContinue", "account.html")
                    window.location.href = "login.html?#"
                } else {
                    console.log("check response user/getUser/token:", response);
                }
            }
        });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/phone/user?id=" + userId,
        async: false,
        headers: { "Authorization": bearerToken }
    }).done(function (response) {
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

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/address/user?id=" + userId,
        headers: { "Authorization": bearerToken },
        async: false,
    }).done(function (response) {
        if (response != null && response != "") {
            if (response.statusCode == 200) {
                addressList = response.data;
            } else if (response.statusCode == 401) {
                window.location.href = "login.html?#"
            } else if (response.statusCode == 403) {

            } else {
                console.log("response:", response)
            }
        }

    });
    console.log(addressList + ' addressList')

    //Kiểm tra xem có số địa chỉ để show không
    if (addressList != undefined && addressList != "") {
        //show hàng address
        var showAddress = document.getElementById("show-address-list");
        showAddress.classList.remove("d-none");
        //thêm address trong list
        var addressShowContent = "";
        addressList.map(function (currentItem, index) {
            if (currentItem.cityOrProvinceName == "") {
                addressShowContent +=
                    `<p id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.countryName}
        </p>`;
            } else {
                addressShowContent +=
                    `<p id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}
        </p>`;
            }
        });
        $('#info-address-list').append(addressShowContent);
    }
    //Kết thúc kiểm tra xem có địa chỉ để show không

    //Kiểm tra xem có số điện thoại để show không
    if (phoneList != undefined && phoneList != "") {
        //show hàng phone number
        var showPhone = document.getElementById("show-phone-list");
        showPhone.classList.remove("d-none");
        //thêm số trong list
        var phoneShowContent = "";
        phoneList.map(function (currentItem, index) {
            phoneShowContent +=
                `<p id="${currentItem.id}">${currentItem.phoneNumber}
            </p>`;
        });
        $('#info-phone-list').append(phoneShowContent);

    }
    //Kết thúc kiểm tra xem có số điện thoại để show không

});

//Bắt đầu thay đổi mật khẩu
$("#change-pass-form").on("submit", function (event) {
    event.preventDefault();
    var currentPass = $('#currentPass').val();
    var newPass = $('#newPass').val();
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/user/changepass",
        headers: { "Authorization": bearerToken },
        async: false,
        data: {
            id: userId,
            currentPass: currentPass,
            newPass: newPass
        },
        success: function (response) {
            console.log(response.data);
            if (response.statusCode == 200) {
                if (response.data == true) {
                    bootbox.alert('Your password has been successfully changed!');
                } else {
                    bootbox.alert('Please enter a correct password');
                }
                $('#change-pass-form')[0].reset();
            } else if (response.statusCode == 401) {
                window.location.href = "login.html?#"
            } else if (response.statusCode == 403) { window.location.href = "403.html" } else {
                console.log("response:", response)
            }

        },
        error: function (error) {
            console.error("change pass error", error);
        }

    })
})

$('#edit-profile-link').click(function (event) {
    event.preventDefault();
    console.log("day la edit profile");

    var content = "";
    if (addressList != null) {
        addressList.map(function (currentItem, index) {
            if (currentItem.cityOrProvinceName == "") {
                content +=
                    `<p style="display: flex; align-items: center;">
        <button class="delete-address btn btn-sm btn-secondary" style="margin-right: 7px;height: 20px;font-size: 15px; display: flex;
        align-items: center; " type="button" >x</button>
        <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.countryName}</span>
        </p>`;
            } else {
                content +=
                    `<p style="display: flex; align-items: center;">
        <button class="delete-address btn btn-sm btn-secondary" style="margin-right: 7px; height: 20px;font-size: 15px; display: flex;
        align-items: center; " type="button" >x</button>
        <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}</span>
        </p>`;
            }
        });
    }
    document.getElementById("address-id").innerHTML = content;
    //Bắt đầu xoá address
    var addressRemoveIdList = [];
    $('.delete-address').click(function () {
        var pElement = $(this).parent();
        pElement.remove();
        var span = $(pElement).find('span');
        var removeAddressId = parseInt($(span).attr('id'));
        addressRemoveIdList.push(removeAddressId);
    })
    let phoneContent = "";
    if (phoneList != null) {
        phoneList.map(function (currentItem, index) {
            phoneContent +=
                `<p style="display: flex; align-items: center;" class="">
                <button class="delete-phone btn btn-sm btn-secondary" style="margin-right: 7px; height: 20px;font-size: 15px; display: flex;
                align-items: center; " type="button" >x</button>
                <span id="${currentItem.id}" style="white-space: nowrap;">${currentItem.phoneNumber}</span>
                </p>`;
        });
    }

    document.getElementById("phone-number-id").innerHTML = phoneContent;
    //Bắt đầu xoá phone
    var phoneRemoveIdList = [];
    $('.delete-phone').click(function () {
        var pElement = $(this).parent();
        pElement.remove();
        var span = $(pElement).find('span');
        var removePhoneId = parseInt($(span).attr('id'));
        phoneRemoveIdList.push(removePhoneId);
    })
    $('#save-changes-submit').click(function () {
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
            }).done(function (response) {
                if (response != null && response != "") {
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

            }).done(function (response) {
                if (response != null && response != "") {
                    console.log("check response address/delete:", response)

                }
            });
        }
        //Bắt đầu thêm phone number
        var newPhoneNumber = $('#newPhoneNumber').val();
        if (newPhoneNumber !== null && newPhoneNumber !== "") {
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/phone/save",
                async: false,
                headers: { "Authorization": bearerToken },
                dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    userId: userId,
                    phoneNumber: newPhoneNumber,
                }),
            }).done(function (response) {
                if (response != null && response != "") {
                    console.log("success add phone number " + response.data.id);
                }
            });
        }
        //Kết thúc thêm phone number

        //Bắt đầu save địa chị
        var validCountry = $('#country').val() !== null && $('#country').val() !== "";
        console.log(validCountry + ' contryValid?')
        var validAddressDetail = $('#address').val() !== null && $('#address').val() !== "";
        console.log(validAddressDetail + ' validAddressDetail?')
        var cityProvinceId;
        if ($('#country').val() != 191) {
            cityProvinceId = 64;
        } else {
            cityProvinceId = $('#townCity').val()
        }
        if (validCountry && validAddressDetail) {
            console.log('Bắt đầu lưu địa chỉ');
            $.ajax({
                method: "POST",
                url: "http://localhost:8080/address/save",
                headers: { "Authorization": bearerToken },
                async: false,
                dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    userId: userId,
                    countryId: $('#country').val(),
                    cityProvinceId: cityProvinceId,
                    detail: $('#address').val(),
                }),
            }).done(function (response) {
                if (response != null && response != "") {
                    console.log(response.data.id);
                }
            });
        }
        window.location.href = "account.html"
        //Kết thúc save địa chỉ
    })

})
$('#addNumber').click(function () {
    newNumberInput.style.display = "block";
})

$('#addAdress').click(function () {
    newAddressInput.style.display = "block";
    let countryList;
    let townCityList;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/country",
        async: false,
        headers: { "Authorization": bearerToken },
    }).done(function (response) {
        if (response != null && response != "") {
            countryList = response.data;
            console.log(countryList)
        }
    });

    var selectOption = "";
    var selectCountry = $('select#country');
    $.each(countryList, function (index, currentItem) {
        selectOption += `<option value=${currentItem.id}>${currentItem.name}</option>`;
    });
    document.getElementById("country").insertAdjacentHTML("beforeend", selectOption);
    selectCountry.append(selectOption);
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/city-province",
        async: false,
        headers: { "Authorization": bearerToken },
    }).done(function (response) {
        if (response != null && response != "") {
            townCityList = response.data;
        }
    });
    //Bắt đầu cho chọn town city
    var selectOption = "";
    townCityList.map(function (currentItem, index) {
        selectOption += `<option value=${currentItem.id}>${currentItem.name}</option>`;
    });
    document.getElementById("townCity").insertAdjacentHTML("beforeend", selectOption);
    //Kết thúc cho chọn town city
    $("#country").change(function () {
        var idCountryAddress = $(this).val();
        let townCityContainer = Array.from($("#townCity-container"));
        if (idCountryAddress == "191") {
            townCityContainer.map(function (currentItem) {
                currentItem.classList.remove("d-none");
            });
        } else {
            townCityContainer.map(function (currentItem) {
                currentItem.classList.add("d-none");
            });
        }
        let addressLineContainer = Array.from($("#address-line-container")).map(
            function (currentItem) {
                currentItem.classList.remove("d-none");
            }
        );
    })
})