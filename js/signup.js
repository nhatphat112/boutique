$(document).ready(function () {
    // catch event click button submit
    $("#btn-submit").click(function (envent) {
        envent.preventDefault()
        let formIsValue = true
        // get all item in form
        let email = $("#email").val()
        let username = $("#username").val()
        let password = $("#pass").val()
        let confirmPassword = $("#confirmPass").val()
        let alternateAddressCheckbox = $("#alternateAddressCheckbox").prop("checked")
        // catch exception email
        let emailWarning = $("#email-warning")
        if (email == "") {
            formIsValue = false;
            emailWarning.text("The email is not empty!")
            emailWarning.removeClass("d-none")

        } else if (!isValidEmail(email)) {
            formIsValue = false;
            emailWarning.text("The email is not valid!")
            emailWarning.removeClass("d-none")
        }
        else {
            emailWarning.addClass("d-none")
        }
        // catch exception username
        let usernameWarning = $("#username-warning")
        if (username == "") {
            formIsValue = false;
            usernameWarning.text("The username is not empty!")
            usernameWarning.removeClass("d-none")
        } else if (username.length < 6) {
            formIsValue = false;
            usernameWarning.text("The username must have at least 6 characters.")
            usernameWarning.removeClass("d-none")
        } else if (isSpecialCharacter(username)) {
            // The username must not have special characters.
            formIsValue = false;
            usernameWarning.text("The username must not have special characters.")
            usernameWarning.removeClass("d-none")
        } else if (isWhitespace(username)) {
            formIsValue = false;
            usernameWarning.text("The username must not have white space characters.")
            usernameWarning.removeClass("d-none")
        }
        else {
            usernameWarning.addClass("d-none")

        }
        // catch exception password
        let passwordWarning = $("#pass-warning")
        if (password == "") {
            formIsValue = false;
            passwordWarning.text("The password is not empty!")
            passwordWarning.removeClass("d-none")
        } else if (password.length < 8) {
            formIsValue = false;
            passwordWarning.text("The password must have at least 8 characters.")
            passwordWarning.removeClass("d-none")
        } else if (!isSpecialCharacter(password)) {
            // The username must not have special characters.
            formIsValue = false;
            passwordWarning.text("The password must have special characters.")
            passwordWarning.removeClass("d-none")
        } else if (isWhitespace(username)) {
            formIsValue = false;
            passwordWarning.text("The password must not have white space characters.")
            passwordWarning.removeClass("d-none")
        }
        else {
            passwordWarning.addClass("d-none")

        }
        // catch exception confirm-password
        let confirmPasswordWarning = $("#confirmPass-warning")
        if (confirmPassword != password) {
            formIsValue = false;
            confirmPasswordWarning.text("The confirm password does not match the password.")
            confirmPasswordWarning.removeClass("d-none")
        } else {
            confirmPasswordWarning.addClass("d-none")
        }
        // catch exception checked policy
        alternateAddressCheckboxWarning = $("#alternateAddressCheckbox-warning")
        if (!alternateAddressCheckbox) {
            formIsValue = false;
            alternateAddressCheckboxWarning.text("You must agree to the BOTIQUE's TERMS OF USE and PRIVACY POLICY.")
            alternateAddressCheckboxWarning.removeClass("d-none")
        } else {
            alternateAddressCheckboxWarning.addClass("d-none")
        }

        if (alternateAddressCheckbox == true && formIsValue == true) {
            let submitWarning = $("#submit-warning")
            $.ajax({
                url: 'http://localhost:8080/signup',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(
                    {
                        "username": username,
                        "password": password,
                        "email": email
                    }
                ),
                contentType: 'application/json',
                async: false,
                success: function (response) {
                    if (response != "" && response != "") {
                        if (response.statusCode == 200) {
                            localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo))
                            localStorage.setItem("token", response.data.token)
                            window.location.href = "index.html"
                        } else if (response.statusCode == 500) {

                            submitWarning.text(response.message)
                            submitWarning.removeClass("d-none")
                        } else {
                            submitWarning.addClass("d-none")
                        }

                    }
                }
            });
        }

    })
})
function isValidEmail(email) {
    // Regex kiểm tra định dạng email
    var emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}
function isSpecialCharacter(char) {
    // Sử dụng biểu thức chính quy để kiểm tra ký tự đặc biệt
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    return specialCharacterRegex.test(char);
}
function isWhitespace(str) {
    return str.indexOf(" ") !== -1;
}

