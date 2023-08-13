import { getBearerToken, getToken } from "./token.js";

$(document).ready(function () {
    // get userId by jwt
    let userId = getUserId()
    let phoneList;
    let addressList;
    // get checkedCartList
    var checkedCartList = JSON.parse(localStorage.getItem("checkedCart"));
    if (checkedCartList == null || checkedCartList == "") {
        $("#place-order").addClass("d-none")
        $("#order-warning").removeClass("d-none")
    } else {
        $("#place-order").removeClass("d-none")
        $("#order-warning").addClass("d-none")
    }
    //
    let feeAddress = 0;
    let newPhoneNumber;
    let idPhoneNumberSelected;
    let addressIsSelected = false;
    let idAddressSelected;
    let idCountryAddress;
    let newDetailAddress;
    let idTownAddress = "";
    let newAddress = false;
    let isConfirmAddress = false;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/phone/user?id=" + userId,
        async: false,
        headers: { "Authorization": getBearerToken() }
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
            addressList = response.data;
        }

    });
    // get list country and town/city
    let countryList;
    let townCityList;
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/country",
        async: false,
        headers: { "Authorization": getBearerToken() },
    }).done(function (response) {
        if (response != null && response != "") {
            countryList = response.data;
        }
    });
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/city-province",
        async: false,
        headers: { "Authorization": getBearerToken() },
    }).done(function (response) {
        if (response != null && response != "") {
            townCityList = response.data;
        }
    });
    // show phone number
    let content = "";
    phoneList.map(function (currentItem, index) {
        content += `
          <input
          type="radio"
          id="${currentItem.id}"
          name="numberOption"
          value="${currentItem.id}"
        />
        <label for="">${currentItem.phoneNumber}</label><br />
          `;
    });
    document.getElementById("phone-number-id").innerHTML = content;
    // show address
    content = "";
    addressList.map(function (currentItem, index) {
        if (currentItem.cityOrProvinceName == "") {
            content += `
          <input
          fee-express=${currentItem.fee}
          type="radio"
          id="${currentItem.id}"
          name="addressOption"
          value="${currentItem.id}"
      />
      <label for=""
          >${currentItem.detail}, ${currentItem.countryName}</label
      ><br />
    `;
        } else {
            content += `
          <input
          fee-express=${currentItem.fee}
          type="radio"
          id="${currentItem.id}"
          name="addressOption"
          value="${currentItem.id}"
      />
      <label for=""
          >${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}</label
      ><br />
    `;
        }
    });
    document.getElementById("address-id").innerHTML = content;
    // show country
    content = "";
    countryList.map(function (currentItem, index) {
        content += `<option value=${currentItem.id}>${currentItem.name}</option>`;
    });
    document.getElementById("country").insertAdjacentHTML("beforeend", content);

    // show town/city
    content = "";
    townCityList.map(function (currentItem, index) {
        content += `<option value=${currentItem.id}>${currentItem.name}</option>`;
    });
    document.getElementById("townCity").insertAdjacentHTML("beforeend", content);

    // show list order
    content = "";
    let totalOrder = 0;
    let subTotal = 0;
    let total = 0;
    //$.each(list, function(currentItem)
    if (checkedCartList != null && checkedCartList != "") {
        checkedCartList.forEach(function (currentItem) {
            //checkedCartList.map(function(currentItem, index, arr) {
            subTotal = currentItem.quantity * currentItem.price;
            totalOrder += subTotal;
            content += `    
                          <li
                            class="d-flex align-items-center justify-content-between"
                          >
                            <strong class="small fw-bold"
                              >${currentItem.name} x ${currentItem.quantity}</strong
                            ><span class="text-muted small">$${subTotal}</span>
                          </li>
                          <li class="border-bottom my-2"></li>
                      `;
        });
    }
    content += `    
    <li
      class="d-flex align-items-center justify-content-between"
    >
      <strong class="small fw-bold"
        >Fee Express</strong
      ><span id="fee-address" class="text-muted small">$${feeAddress}</span>
    </li>
    <li class="border-bottom my-2"></li>
  `;

    total = totalOrder + Number(feeAddress);
    content += `
  
              <li
              class="d-flex align-items-center justify-content-between"
            >
              <strong class="text-uppercase small fw-bold">Total</strong
              ><span id="total-order">$${total}</span>
            </li>
            `;
    document
        .getElementById("your-order-container")
        .insertAdjacentHTML("beforeend", content);
    const options = document.getElementsByName("addressOption");
    // $("input[name = 'addressOption']").change(function() {
    //     alert("hello")
    //         // kiểm tra xem option nào được chọn
    //     if ($(this).val() == "newAdress") {
    //         newAddressInput.style.display = 'none';
    //     } else {
    //         newAddressInput.style.display = 'block';
    //     }

    // })
    options.forEach((option) => {
        option.addEventListener("change", function () {
            if (this.value === "newAddress") {
                newAddressInput.style.display = "block";
            }
            if (this.value !== "newAddress") {
                newAddressInput.style.display = "none";
            }
        });
    });

    const numberOption = document.getElementsByName("numberOption");
    numberOption.forEach((option) => {
        option.addEventListener("change", function () {
            if (this.value === "newNumber") {
                newNumberInput.style.display = "block";
            }
            if (this.value !== "newNumber") {
                newNumberInput.style.display = "none";
            }
        });
    });

    // reset follow fee address
    $("input[name='addressOption']").click(function (event) {
        // event.preventDefault()

        if ($(this).val() != "newAddress") {
            feeAddress = $(this).attr("fee-express");
            total = totalOrder + Number(feeAddress);
            $("#fee-address").text("$" + feeAddress);
            $("#total-order").text("$" + total);
        } else {
            newAddress = true;
        }
    });

    $("#country").change(function () {
        idCountryAddress = $(this).val();
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
    });
    $("#townCity").change(function () {
        idTownAddress = $(this).val();
    });

    let checkoutPhoneValid = true;
    let checkoutAddressValid = true;
    let phoneIsSelect = false;
    $("#place-order").click(function (event) {
        checkoutAddressValid = true;
        checkoutPhoneValid = true;
        // hidden message require select phone number
        Array.from(document.getElementsByClassName("phone-required")).map(function (
            currentItem
        ) {
            currentItem.classList.add("d-none");
        });
        // hidden message require input text address line
        document.getElementById("address-line-warnning").classList.add("d-none");
        // hidden message require select address
        document.getElementById("address-required").classList.add("d-none");
        // hidden message require select country address if select new address
        document.getElementById("country-address-required").classList.add("d-none");
        // hidden message require select town-city address if select new address
        document
            .getElementById("town-ity-address-required")
            .classList.add("d-none");


        event.preventDefault();
        let phoneNumbers = document.getElementsByName("numberOption");
        Array.from(phoneNumbers).map(function (currentItem) {
            if (currentItem.checked) {
                if (currentItem.value != "newNumber") {
                    idPhoneNumberSelected = currentItem.value;
                } else {
                    newPhoneNumber = document.getElementById("newPhoneNumber").value;
                    if (newPhoneNumber == null || newPhoneNumber == "") {
                        checkoutPhoneValid = false;
                        Array.from(document.getElementsByClassName("phone-warnning")).map(
                            function (currentItem) {
                                currentItem.classList.remove("d-none");
                            }
                        );
                    } else {
                        Array.from(document.getElementsByClassName("phone-warnning")).map(
                            function (currentItem) {
                                currentItem.classList.add("d-none");
                            }
                        );
                    }
                }
                phoneIsSelect = true;
            }
        });
        // no any radio was selected
        if (phoneIsSelect == false) {
            checkoutPhoneValid = false;
            Array.from(document.getElementsByClassName("phone-required")).map(
                function (currentItem) {
                    currentItem.classList.remove("d-none");
                }
            );
        }

        // address
        let address = document.getElementsByName("addressOption");
        Array.from(address).map(function (currentItem) {
            if (currentItem.checked) {
                if (currentItem.value != "newAddress") {
                    idAddressSelected = currentItem.value;
                } else {
                    //////
                    newAddress = true;
                }
                addressIsSelected = true;
            }
        });
        if (addressIsSelected == false) {
            document.getElementById("address-required").classList.remove("d-none");
        }
        if (newAddress == true) {
            if (!isConfirmAddress) {
                checkoutAddressValid = false;
                $("#confirm-address-warnning").removeClass("d-none")
            } else {
                checkoutAddressValid = true;

                $("#confirm-address-warnning").addClass("d-none")
            }
        }

        // check validAddress
        if (addressIsSelected == false || phoneIsSelect == false) {
            checkoutAddressValid = false;
        }
        if (newAddress == true) {
            if (idCountryAddress == null || idCountryAddress == "") {
                checkoutAddressValid = false;
                document
                    .getElementById("country-address-required")
                    .classList.remove("d-none");
            }
            if (idCountryAddress == "191") {
                if (idTownAddress == null || idTownAddress == "") {
                    checkoutAddressValid = false;
                    document
                        .getElementById("town-ity-address-required")
                        .classList.remove("d-none");
                } else {
                    document
                        .getElementById("town-ity-address-required")
                        .classList.add("d-none");
                }
            }
            if (newDetailAddress == null || newDetailAddress == "") {
                checkoutAddressValid = false;
                document
                    .getElementById("address-line-warnning")
                    .classList.remove("d-none");
            }
        } else {
            if (idAddressSelected == "" || idAddressSelected == "") {
                checkoutAddressValid = false;
            }
        }
        if (checkoutAddressValid == true && checkoutPhoneValid == true) {

            if (idPhoneNumberSelected == null || idPhoneNumberSelected == "") {
                $.ajax({
                    method: "POST",
                    url: "http://localhost:8080/phone/save",
                    async: false,
                    headers: { "Authorization": getBearerToken() },
                    dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        userId: userId,
                        phoneNumber: newPhoneNumber,
                    }),
                }).done(function (response) {
                    if (response != null && response != "") {
                        idPhoneNumberSelected = response.data.id;
                    }
                });
            }
            if (newAddress == true) {
                idTownAddress =
                    idTownAddress == "" || idTownAddress == "null" ? 64 : idTownAddress;
                $.ajax({
                    method: "POST",
                    url: "http://localhost:8080/address/save",
                    headers: { "Authorization": getBearerToken() },
                    async: false,
                    dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        userId: userId,
                        countryId: idCountryAddress,
                        cityProvinceId: idTownAddress,
                        detail: newDetailAddress,
                    }
                    ),
                }).done(function (response) {
                    if (response != null && response != "") {
                        idAddressSelected = response.data.id;
                    }
                });
            }
            // save orderDetail
            checkedCartList.forEach(function (currentItem) {
                currentItem.price =
                    Number(currentItem.price) * Number(currentItem.quantity);
            });
            // save order
            let idOrderSaved = "";
            let saveOrderIsSuccess = false;
            let saveOrderDetailIsSuccess = false;
            let message = ""
            $.ajax({
                method: "POST",
                headers: { "Authorization": getBearerToken() },
                url: "http://localhost:8080/order/save",
                async: false,
                dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    userId: userId,
                    addressId: Number(addressIsSelected),
                    phoneId: idPhoneNumberSelected,
                    statusId: 1,
                    total: total,
                    orderDetailSaveRequests: checkedCartList
                }),
            }).done(function (response) {
                if (response != null && response != "") {
                    message = response.message
                    saveOrderIsSuccess = (response.statusCode == 200) ? true : false
                }
            });
            if (saveOrderIsSuccess) {
                console.log(JSON.stringify({
                    checkedCartListIds: checkedCartList
                }))
                // delete cart at database
                $.ajax({
                    method: "POST",
                    headers: { "Authorization": getBearerToken() },
                    url: "http://localhost:8080/cart/delete/ids",
                    async: true,
                    dataType: "json", // Cấu hình kiểu dữ liệu là JSON
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        ids: checkedCartList
                    }),
                }).done(function (response) {
                    if (response != null && response != "") {
                        message = response.message

                    }
                });
                localStorage.setItem("checkedCart", null)
                window.location.href = "purchase.html";
                $("#place-order-warning").addClass("d-none")
            } else {
                $("#place-order-warning").text(message)
                $("#place-order-warning").removeClass("d-none")

            }
        }
    });
    $("#confirm-address").click(function (event) {
        event.preventDefault()
        checkoutAddressValid = true
        if (newAddress == true) {
            newDetailAddress = document.getElementById("address").value;
            if (idCountryAddress == null || idCountryAddress == "") {
                checkoutAddressValid = false;
                document
                    .getElementById("country-address-required")
                    .classList.remove("d-none");
            } else {
                document
                    .getElementById("country-address-required")
                    .classList.add("d-none");
            }

            if (idCountryAddress == "191") {
                if (idTownAddress == null || idTownAddress == "") {
                    checkoutAddressValid = false;
                    document
                        .getElementById("town-ity-address-required")
                        .classList.remove("d-none");
                } else {
                    document
                        .getElementById("town-ity-address-required")
                        .classList.add("d-none");
                }
            }
            if (newDetailAddress == null || newDetailAddress == "") {
                checkoutAddressValid = false;
                document
                    .getElementById("address-line-warnning")
                    .classList.remove("d-none");
            } else {
                document
                    .getElementById("address-line-warnning")
                    .classList.add("d-none");
            }
        }
        if (idCountryAddress == 191) {
            feeAddress = (idTownAddress == 58) ? 0 : 30;
        } else {
            feeAddress = 50;
        }
        isConfirmAddress = (checkoutAddressValid) ? true : false;
        total = totalOrder + Number(feeAddress)
        $("#fee-address").text("$" + feeAddress)
        $("#total-order").text("$" + total)
    })
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
                    window.location.href = "403.html"
                } else if (response.statusCode == 401) {
                    localStorage.setItem("accessLinkContinue", "checkout.html")
                    window.location.href = "login.html?#"
                }
            }
        },
        error: function (error) {
            console.error("Error getting user ID", error);
        }
    });
    return userId;
}