import {UserManager} from "../../src/usersManager/UserManager.js";
import {User} from "../../src/usersManager/User.js";
//
let userManager = new UserManager();

$(document).on("readystatechange", () => {
    resetSignInForm()
    let turn = sessionStorage.getItem("turn");
    if (turn === "signup") {
        $("#first").hide(function () {
            $("#second").show();
        });
    }

});


function resetSignUpForm() {
    console.log("ủa có vào đây k")
    $("form[name='registration'] input").each((index, input) => {
        $(input).val("");
    })
    $("form[name='registration'] label.error").each((index, input) => {
        $(input).hide();
    })
    // $("#email-alert").hide();
}


function resetSignInForm() {
    $("form[name='login'] input").each((index, input) => {
        $(input).val("");
    })

    $("form[name='login'] label.error").each((index, input) => {
        $(input).hide();
    })

}


function fadeOutSignIn() {
    sessionStorage.setItem("turn", "signup");
    $("#first").fadeOut("fast", function () {
        $("#second").fadeIn("fast");
    });
}

function fadeOutSignUp() {
    sessionStorage.setItem("turn", "signin");
    $("#second").fadeOut("fast", function () {
        $("#first").fadeIn("fast");
    });

}

// Set cookies for authentication

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


$("#signup").on("click", function () {
    $("#email-alert").hide();
    resetSignUpForm();
    fadeOutSignIn();

});

$("#signin").on("click", function () {
    $("#login-alert").hide();
    resetSignInForm();
    fadeOutSignUp();
});


$(function () {
    $("form[name='login']").validate({
        rules: {

            email: {
                required: true,
                email: true
            },
            password: {
                required: true,

            }
        },
        messages: {
            email: "Please enter a valid email address",

            password: {
                required: "Please enter password",

            }

        },
        submitHandler: function (form) {
            let userEmail = $("#user-email").val();
            let userPassword = $("#user-password").val();

            if (userManager.authenticateUser(userEmail, userPassword)) {
                $("#login-alert").hide();
                setCookie("userEmail", userEmail, 1);
                window.location.href = "./index.html"
            } else {
                $("#login-alert").removeAttr("hidden").show();
            }
        }
    });
});


$(function () {

    $("form[name='registration']").validate({
        rules: {
            firstname: "required",
            lastname: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },

        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 5 characters long"
            },
            email: "Please enter a valid email address"
        },

        submitHandler: function (form) {
            let firstName = $("#firstname").val();
            let lastName = $("#lastname").val();
            let email = $("#email").val();
            let password = $("#password").val();
            // console.log(firstName,lastName, email, password  )
            if (!userManager.validateEmailSignUp(email)) {
                $("#email-alert").hide();
                try {
                    userManager.saveUser(firstName, lastName, email, password);
                    fadeOutSignUp();

                } catch (e) {
                    console.log(e)
                }
            } else {
                $("#email-alert").removeAttr("hidden").show();
            }
        }
    });
});
