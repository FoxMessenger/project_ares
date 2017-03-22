$(document).ready(function() {

    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyAAJtv2XWoOxQ_1czEw3u6DR5m8OTwC2Qo",
        authDomain: "projares-b990d.firebaseapp.com",
        databaseURL: "https://projares-b990d.firebaseio.com",
        storageBucket: "projares-b990d.appspot.com",
        messagingSenderId: "811073714607"
    };

    firebase.initializeApp(config);
    // var database = firebase.database();

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var providerData = user.providerData;
                user.getToken().then(function(accessToken) {
                    $(".login-container").addClass("invisible"); //hides login container if user is logged in
                    $(".signOut").removeClass("invisible"); //hides login container if user is logged in
                    $(".user-container").removeClass("invisible"); //unhides the user container
                    $(".movieFinder").removeClass("invisible"); //unhides the user container
                    $(".userName").html("Welcome " + displayName); //displays Welcome username
                    var signOutBtn = $("<button>");
                    signOutBtn.addClass("signOutBtn btn btn-danger");
                    signOutBtn.text("Sign Out");
                    $(".signOut").append(signOutBtn); //adds the signOut button for the user
                });
            } else {
                // User is signed out.
                $('#sign-in-status').text("Signed out");
                // document.getElementById('sign-in').textContent = 'Sign in';
                $('#account-details').text("null");
            }
        }, function(error) {
            console.log(error);
        });
    };
    //on click listener to unauth the user
    $(document).on("click", ".signOutBtn", function() {
        firebase.auth().signOut().then(function() {
            console.log("I am Signed out");
            $(".login-container").removeClass("invisible");
            $(".user-container").addClass("invisible");
            $(".movieFinder").addClass("invisible");
            window.open("/");
        }).catch(function(error) {
            // An error happened.
        });
    });

    window.addEventListener('load', function() {
        event.preventDefault();
        initApp()
    });
});