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
 * UX feature that allows users to press enter to submit the log-in form instead of pressing the "sign in" button.
 */
 var inputs = document.querySelectorAll(".form-floating");
 inputs.forEach((input) =>
   input.addEventListener("keyup", function (event) {
     if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("signin-button").click();
     }
   })
 );

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
      console.log(error.message);
    });
}

/**
 * Handle login with Google
 */
function googleLogin() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithRedirect(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      alert(errorMessage);
    });
}

/**
 * Google login redirect result.
 */
firebase.auth()
  .getRedirectResult()
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
