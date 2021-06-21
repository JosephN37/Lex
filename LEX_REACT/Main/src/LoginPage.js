
import './styles/login-style.css'
import { FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed,
    IfFirebaseUnAuthed } from '@react-firebase/auth';
import { config } from './config/firebase';
import { firebase } from "@firebase/app";
import "@firebase/auth";
import React, {useState, useEffect} from 'react';
import LoginSystem from './LoginSystem';
import LandingPage from './LandingPage';

//function to handle google log in
function handleGoogleLogIn(firebase) {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
}

/*
*LoginPage component for frontend, using firebase for authentication
*/
function LoginPage(props) {
    const {email, setEmail, password, setPassword, handleEmailLogIn, handleSignUp, hasAccount, setHasAccount, emailError,
        passwordError, confirmPassword, setConfirmPassword} = props;
  return (
      <div className="login-body">
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <IfFirebaseAuthed>
          <div id="already-logged-in">
        <h1>You are already logged in</h1>
        <br />
         <button className="btn btn-lg btn-outline-dark" onClick={()=>{firebase.app().auth().signOut()}}>
          Log Out
        </button> 
      </div>
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
    <body className="text-center">
    <main className="form-signin">
      <div id="login-form">
        {/* <!-- The form header. --> */}
        <h1><a href="/LandingPage" className="logo">LEX</a></h1>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <p className="error-message">{emailError}</p>
        <p className="error-message">{passwordError}</p>
        {/* <!-- The form --> */}
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="emailField"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="emailField">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="passwordField"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="passwordField">Password</label>
        </div>

        {/* <!-- Buttons --> */}
        <button
          className="w-100 btn btn-lg btn-dark"
          type="submit"
          onClick={handleEmailLogIn}
          id="signin-button"
        >
          Sign in
        </button>

        <FirebaseAuthConsumer>
            {({firebase}) => (
            <button
            className="w-100 btn btn-lg btn-outline-dark"
            type="submit"
            onClick={()=>handleGoogleLogIn(firebase)}
            >
            <i className="fab fa-google"></i>
             Sign in with Google
            </button>
            )}
        </FirebaseAuthConsumer>
        <hr></hr>
        <h6>
          Don't have an account? <a style={{color: "blue", textDecorationLine: "underline"}} onClick={() => setHasAccount(false)}>Sign up for LEX</a>
        </h6>
        <p className="mt-5 mb-3 text-muted">&copy; LEX 2021</p>
      </div>
      <div id="already-logged-in">
        {/* <h1>You are already logged in</h1> */}
        <br />
        {/* <button class="btn btn-lg btn-outline-dark" onclick="logout()">
          Log Out
        </button> */}
      </div>
    </main>
  </body>
  </IfFirebaseUnAuthed>
  </FirebaseAuthProvider>
  </div>
  
  )
}

export default LoginPage
