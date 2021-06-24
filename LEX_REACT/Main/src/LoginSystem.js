import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { config } from "./config/firebase";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function LoginSystem() {
  function handleEmailLogIn() {
    clearErrors();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }

  function handleSignUp() {
    clearErrors();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        if (confirmPassword !== password) {
          setPasswordError("Passwords do not match");
        } else {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              console.log(err.message);
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              console.log(err.message);
              setPasswordError(err.message);
              break;
          }
        }
      });
  }

  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const clearInputs = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };
  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return user ? (
    <button
      className="btn btn-lg btn-outline-dark"
      onClick={() => {
        firebase.app().auth().signOut();
      }}
    >
      Log Out
    </button>
  ) : hasAccount ? (
    <LoginPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleEmailLogIn={handleEmailLogIn}
      handleSignUp={handleSignUp}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
    >
      {" "}
    </LoginPage>
  ) : (
    <RegisterPage
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleEmailLogIn={handleEmailLogIn}
      handleSignUp={handleSignUp}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
    >
      {" "}
    </RegisterPage>
  );
}

export default LoginSystem;
