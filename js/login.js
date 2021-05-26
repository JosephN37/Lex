/**
 * Setting which depends whether the user is signed in or not.
 */
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("signed in");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("already-logged-in").style.display = "block";
  } else {
    // No user is signed in.
    document.getElementById("login-form").style.display = "block";
    document.getElementById("already-logged-in").style.display = "none";
  }
});

/**
 * Handles login -- when the "Sign in" button is pressed or when the user enters the email and password.
 */
function login() {
  var userEmail = document.getElementById("emailField").value;
  var userPassword = document.getElementById("passwordField").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("successfully logged in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      document.querySelector(".error-message").textContent = errorMessage;
      console.log(errorMessage);
    });
}

/**
 * Handles logout -- when the "log out button is pressed."
 */
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("successfully logged out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message)
    });
}

/**
 * UX feature that allows users to press enter to submit the log-in form instead of pressing the "sign in" button.
 */
var inputs = document.querySelectorAll(".form-floating");
inputs.forEach(input => input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("signin-button").click();
  }
}));