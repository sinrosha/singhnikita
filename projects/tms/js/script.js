$(document).ready(function() {
    $("#login_popup .closee").on("click", function() {
        $("#login_popup").hide();
        $(".overlay").hide();
    });

    var loggedIn = JSON.parse(localStorage.getItem("login")) || "false";

    if(loggedIn == true) {
        $("#login_popup").hide();
        $(".post-login").show();
        $(".overlay").hide();
        $(".hide-post-login").hide();
        $("#register-btn").text("log Out");
        $("#register-btn").show();
    } else {
        $("#login_popup").show();
        $(".post-login").hide();
        $(".overlay").show();
        $(".hide-post-login").show();
        $("#register-btn").hide();
    }

    $("#register_form").submit(function(e) {
        e.preventDefault();
        
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var subject = $("#subject").children("option").filter(":selected").text();
        var message = $("#message").val();

       var studentRecord = {
           name,
           email,
           password,
           subject,
           message
       }

       var recordArray = JSON.parse(localStorage.getItem("students")) || [];
       recordArray.push(studentRecord);
       $(".register-success").show();
       localStorage.setItem("students", JSON.stringify(recordArray));

       var studentEntries = JSON.parse(localStorage.getItem("students"));
       console.log(studentEntries);

    });

    $(".login-pop").on("click", function(e) {
        e.preventDefault();
        $("#login_popup").show();
        $(".post-login").hide();
        $(".overlay").show();
        $(".hide-post-login").show();
    });

    $("#register-btn").on("click", function(e) {
        e.preventDefault();
        localStorage.setItem("login", false);
        location.reload();
    });

    $("#login").on("submit", function(e) {
        e.preventDefault();
        let auth = false;
        $("#error").fadeOut();
        $("#error ul li").remove();

        var username = $("#login-username").val();
        var password = $("#login-password").val();

        if(username.length == 0 && password.length == 0) {
            $("#error").fadeIn();
            $("#error ul").append("<li>Please enter your email address</li><li>Please enter you password</li>");
        } else if(username.length == 0) {
            $("#error").fadeIn();
            $("#error ul").append("<li>Please enter your email address</li>");
        } else if(password.length == 0) {
            $("#error").fadeIn();
            $("#error ul").append("<li>Please enter you password</li>");
        } else {
            var studentEntries = JSON.parse(localStorage.getItem("students")) || [];

            studentEntries.forEach(element => {
                if(element.email == username && element.password == password) {
                    auth = true;
                    localStorage.setItem("user", JSON.stringify(element) )
                }
            });

            if(auth) {
                $(".error-login").hide();
                $("#login_popup").hide();
                $(".post-login").show();
                $(".overlay").hide();
                $("body").addClass("loggedIn");
                $(".hide-post-login").hide();
                localStorage.setItem("login", "true");
                $("#register-btn").text("Log Out");

                $("#register-btn").show();

            } else {
                $("#error").fadeIn();
                $("#error ul").append("<li>No User found, please register to login</li>");
            }
            console.log(studentEntries, auth);
        }
    });
});