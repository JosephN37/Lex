import './styles/login-style.css'
import {
  FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from '@react-firebase/auth';
import { config } from './config/firebase';
import { firebase } from "@firebase/app";
import "@firebase/auth";
import React, { useState, useEffect } from 'react';
import {
  FirebaseDatabaseProvider, FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import "firebase/database"


//function to handle google log in, setting userProfileName as email
function handleGoogleLogIn(firebase) {
  // const profileRef = firebase.database().ref('profile');
  // const profile = {
  //   Name: email,
  //   Email: email,
  //   Proficiency: "",
  //   Sports: ""
  // };
  // profileRef.push(profile);
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(googleAuthProvider);
}

/*
* RegisterPage component for frontend
*/
function RegisterPage(props) {
  const { email, setEmail, password, setPassword, handleEmailLogIn, handleSignUp, hasAccount, setHasAccount, emailError,
    passwordError, confirmPassword, setConfirmPassword, userProfileName, setUserProfileName } = props;


  return (

    <FirebaseAuthProvider {...config} firebase={firebase}>
      <main className="form-signup">
        <div id="login-form">
          {/* <!-- The form header. --> */}
          <h1 style={{ textAlign: "center" }}><a href="/" class="logo">LEX</a></h1>
          <h1 style={{ textAlign: "center" }} className="h3 mb-3 fw-normal">Sign up for free to play</h1>
          <button
            className="w-100 btn btn-lg btn-outline-dark"
            type="submit"
            onClick={() => handleGoogleLogIn(firebase)}
          >
            <i className="fab fa-google"></i>
            Sign up with Google instead
          </button>
          <hr />
          <p className="error-message">{emailError}</p>
          <p className="error-message">{passwordError}</p>
          {/* <!-- The form --> */}
          <p clasNames="form-header"><strong>What's your email?</strong></p>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="emailField"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="emailField">Enter your email address.</label>
          </div>

          <p className="form-header"><strong>Create a password</strong></p>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="passwordField"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="passwordField">Create a password.</label>
          </div>

          <p className="form-header"><strong>Confirm your password</strong></p>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="confirmPasswordField"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label for="confirmPasswordField">Enter your password again.</label>
          </div>

          <p className="form-header"><strong>What should we call you?</strong></p>
          <div className="form-floating">
            <input
              type="profileName"
              className="form-control"
              id="nameField"
              placeholder="lex"
              value={userProfileName}
              onChange={(e) => setUserProfileName(e.target.value)}
            />
            <label for="nameField">Enter a profile name.</label>
          </div>

          <div>
            <p style={{ marginTop: "40px" }}>
              By clicking on sign-up, you agree to LEX's
              <a href="#" style={{ color: "grey" }}>Terms and Conditions</a>
            </p>
            {/* <!-- Buttons --> */}
            <FirebaseAuthConsumer>
              <button
                className="w-100 btn btn-lg btn-dark"
                type="submit"
                onClick={handleSignUp}
                id="signin-button"
              >
                Sign up
              </button>
            </FirebaseAuthConsumer>
            <p>Already have an account? <a style={{ color: "blue", textDecorationLine: "underline" }} onClick={() => setHasAccount(true)}>Log in</a></p>
            <p className="mt-5 mb-3 text-muted">&copy; LEX 2021</p>
          </div>
        </div>
      </main>

      {/* <div id="already-logged-in">
        <h1>You are already logged in</h1>
        <br />
        <button className="btn btn-lg btn-outline-dark" onclick="logout()">
          Log Out
        </button>
      </div> */}
    </FirebaseAuthProvider>

  )
}

export default RegisterPage
