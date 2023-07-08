$(document).ready(function() {
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
    options.forEach(option => {
        option.addEventListener("change", function() {
            if (this.value === "newAddress") {
                console.log("Option new is selected");
                newAddressInput.style.display = 'block';
            }
            if (this.value !== "newAddress") {
                console.log("Option old is fail selected" + this.value);
                newAddressInput.style.display = 'none';
            }
        })
    })

    const numberOption = document.getElementsByName("numberOption");
    numberOption.forEach(option => {
        option.addEventListener("change", function() {
            if (this.value === "newNumber") {
                console.log("Option number new is selected");
                newNumberInput.style.display = 'block';
            }
            if (this.value !== "newNumber") {
                console.log("Option number old is fail selected" + this.value);
                newNumberInput.style.display = 'none';
            }
        })
    })
})