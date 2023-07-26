$(document).ready(function () {
  // data test
  // userId =1
  localStorage.setItem("userId", "1");

  let userId = localStorage.getItem("userId");
  console.log("check userId :", userId);
  // get list phone and list address by userId from localstorage
  let phoneList
  let addressList
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/phone/user?id=" + userId,
    async: false,
  }).done(function (response) {
    if(response!=null&& response!=""){
        phoneList =response.data;
    }
  });
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/address/user?id=" + userId,
    async: false,
  }).done(function (response) {
    if(response!=null&& response!=""){
        addressList =response.data;
    }
  });
  console.log('check phoneList :',phoneList)
  console.log('check addressList:',addressList)
  // show phone number
  let content = "";
   phoneList.map(function(currentItem,index){
        content +=
        `
        <input
        type="radio"
        id="${currentItem.id}"
        name="numberOption"
        value="savedNumber"
      />
      <label for="">${currentItem.phoneNumber}</label><br />
        `
   })
   document.getElementById('phone-number-id').innerHTML=content
  // show address
  content = ""
  addressList.map(function(currentItem,index){
    content+=
    `
        <input
        type="radio"
        id="${currentItem.id}"
        name="addressOption"
        value="savedAddress"
    />
    <label for=""
        >${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}</label
    ><br />
  `
  })
  document.getElementById('address-id').innerHTML=content

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
        console.log("Option new is selected");
        newAddressInput.style.display = "block";
      }
      if (this.value !== "newAddress") {
        console.log("Option old is fail selected" + this.value);
        newAddressInput.style.display = "none";
      }
    });
  });

  const numberOption = document.getElementsByName("numberOption");
  numberOption.forEach((option) => {
    option.addEventListener("change", function () {
      if (this.value === "newNumber") {
        console.log("Option number new is selected");
        newNumberInput.style.display = "block";
      }
      if (this.value !== "newNumber") {
        console.log("Option number old is fail selected" + this.value);
        newNumberInput.style.display = "none";
      }
    });
  });
});
