$(document).ready(function () {
  // data test
  // userId =1
  localStorage.setItem("userId", "1");

  let userId = localStorage.getItem("userId");
  console.log("check userId :", userId);
  // get list phone and list address by userId from localstorage
  let phoneList;
  let addressList;

  //
  let newPhoneNumber
  let idPhoneNumberSelected
  let addressIsSelected = false;
  let idAddressSelected 
  let idCountryAddress
  let newDetailAddress
  let idTownAddress=""
  let newAddress = false
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/phone/user?id=" + userId,
    async: false,
  }).done(function (response) {
    if (response != null && response != "") {
      phoneList = response.data;
    }
  });
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/address/user?id=" + userId,
    async: false,
  }).done(function (response) {
    if (response != null && response != "") {
      addressList = response.data;
    }
  });
  // get list country and town/city
  let countryList
  let townCityList
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/country" ,
    async: false,
  }).done(function (response) {
    if (response != null && response != "") {
      countryList = response.data;
    }
  });
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/city-province" ,
    async: false,
  }).done(function (response) {
    if (response != null && response != "") {
      townCityList = response.data;
    }
  });
  console.log("check phoneList :", phoneList);
  console.log("check addressList:", addressList);
  console.log("check countryList:", countryList);
  console.log("check townCityList:", townCityList);

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
    content += `
        <input
        type="radio"
        id="${currentItem.id}"
        name="addressOption"
        value="${currentItem.id}"
    />
    <label for=""
        >${currentItem.detail}, ${currentItem.cityOrProvinceName}, ${currentItem.countryName}</label
    ><br />
  `;
  });
  document.getElementById("address-id").innerHTML = content;
  // show country
  content = ""
  countryList.map(function(currentItem,index){
    content+=`<option value=${currentItem.id}>${currentItem.name}</option>`
  })
  document.getElementById("country").insertAdjacentHTML("beforeend",content)

  // show town/city
  content=""
  townCityList.map(function(currentItem,index){
    content+=`<option value=${currentItem.id}>${currentItem.name}</option>`
  })
  document.getElementById("townCity").insertAdjacentHTML("beforeend",content)


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

  // 
  $("#country").change(function(){
    idCountryAddress = $(this).val()
      let townCityContainer = Array.from($("#townCity-container"))
      if(idCountryAddress=="191"){
       townCityContainer.map(function(currentItem){
        currentItem.classList.remove("d-none")
       })
      }else{
        townCityContainer.map(function(currentItem){
          currentItem.classList.add("d-none")
         })
      
      }
      let addressLineContainer = Array.from($("#address-line-container")).map(function(currentItem){
        currentItem.classList.remove("d-none")
      })
   })
   $("#townCity").change(function(){
    idTownAddress = $(this).val()
    console.log("check idtownAddress :",idTownAddress)
   })
  


  $('#place-order').click(function(event){
    // hidden message require select phone number
    Array.from(document.getElementsByClassName('phone-required')).map(function(currentItem){
      currentItem.classList.add('d-none')
  })
      // hidden message require input text address line
  document.getElementById("address-line-warnning").classList.add("d-none")
        // hidden message require select address
  document.getElementById("address-required").classList.add('d-none')
        // hidden message require select country address if select new address
  document.getElementById("country-address-required").classList.add("d-none")
   // hidden message require select town-city address if select new address
   document.getElementById("town-ity-address-required").classList.add("d-none")


    let  checkoutPhoneValid = true
    let  checkoutAddressValid = true
    let phoneIsSelect = false
    event.preventDefault()
    let phoneNumbers = document.getElementsByName("numberOption")
     console.log("check phoneNumbers",phoneNumbers)
     Array.from(phoneNumbers).map(function(currentItem){   
       if(currentItem.checked){
        
        console.log("check currentItem :",currentItem.value)
        if(currentItem.value!="newNumber"){
          idPhoneNumberSelected = currentItem.value;
        }else{
          newPhoneNumber =document.getElementById('newPhoneNumber').value
          console.log("checkout newPhoneNumber:",newPhoneNumber)
          if(newPhoneNumber==null||newPhoneNumber==""){
            checkoutPhoneValid = false
            // document.getElementsByClassName('phone-warnning')[0].classList.remove('d-none')
            // console.log(document.getElementsByClassName('phone-warnning'))
            Array.from(document.getElementsByClassName('phone-warnning')).map(function(currentItem){
              currentItem.classList.remove('d-none')
          })
          }else{
            Array.from(document.getElementsByClassName('phone-warnning')).map(function(currentItem){
                currentItem.classList.add('d-none')
            })
          }
          
        }
        phoneIsSelect = true
       }
     
     })
      // no any radio was selected
     if(phoneIsSelect==false){
      checkoutPhoneValid =false
      Array.from(document.getElementsByClassName('phone-required')).map(function(currentItem){
        currentItem.classList.remove('d-none')
    })
     }

     // address
    
     let address = document.getElementsByName("addressOption")
     console.log("check phoneNumbers",address)
     Array.from(address).map(function(currentItem){   
       if(currentItem.checked){
        console.log("check currentItem :",currentItem.value)
        if(currentItem.value!="newAddress"){
          idAddressSelected = currentItem.value;
        }else{
          //////
          newAddress = true
          
        }
        addressIsSelected = true
       }
     
     })
     if(addressIsSelected==false){
        document.getElementById("address-required").classList.remove('d-none')
     }
     if(newAddress == true){
      newDetailAddress = document.getElementById("address").value
     }
     
       // check validAddress
       if(addressIsSelected==false||phoneIsSelect==false){
        checkoutAddressValid = false
       }
     if(newAddress==true){
    
    
      if(idCountryAddress==null||idCountryAddress==""){
        checkoutAddressValid =false
       document.getElementById("country-address-required").classList.remove("d-none")
      }
      if(idCountryAddress=="191"){
        if(idTownAddress==null||idTownAddress==""){
       
          checkoutAddressValid =false
          document.getElementById("town-ity-address-required").classList.remove("d-none")
        }
      }
      if(newDetailAddress==null||newDetailAddress==""){
        checkoutAddressValid = false
        document.getElementById("address-line-warnning").classList.remove("d-none")
      }
     }else{
       if(idAddressSelected==""||idAddressSelected==""){
        checkoutAddressValid = false;
       }
     }
     if(checkoutAddressValid==true&&checkoutPhoneValid){
      if(idPhoneNumberSelected==null||idPhoneNumberSelected==""){
        $.ajax({
          method: "POST",
          url: "http://localhost:8080/phone/save",
          async: false,
          dataType: "json", // Cấu hình kiểu dữ liệu là JSON
          contentType: "application/json; charset=utf-8", 
          data :JSON.stringify(
            {
              "userId":userId,
              "phoneNumber":newPhoneNumber
            }
          )
        }).done(function (response) {
          if (response != null && response != "") {
            idPhoneNumberSelected=response.data.id
          }
        });
       }
       console.log("check idPhoneNumberSelected:",idPhoneNumberSelected)
       if(newAddress==true){
        idTownAddress = (idTownAddress==""||idTownAddress=="null")?64:idTownAddress;
        console.log(userId)
        console.log(idCountryAddress)
        console.log(idTownAddress)
        console.log(newDetailAddress)
  
        $.ajax({
          method: "POST",
          url: "http://localhost:8080/address/save",
          async: false,
          dataType: "json", // Cấu hình kiểu dữ liệu là JSON
          contentType: "application/json; charset=utf-8", 
          data :JSON.stringify(
            {
              "userId":userId,
              "countryId":idCountryAddress,
              "cityProvinceId":idTownAddress,
              "detail":newDetailAddress
          }
          //   {
          //     "userId":userId,
          //     "countryId":idCountryAddress,
          //     "cityProvinceId":idTownAddress,
          //     "detail":newDetailAddress
          // }
          )
        }).done(function (response) {
          if (response != null && response != "") {
            idAddressSelected=response.data.id
           
          }
        });
       }
       console.log("check idAddressSelected:",idAddressSelected)

      console.log("Validation")

     }
     
    
  })
  



});
