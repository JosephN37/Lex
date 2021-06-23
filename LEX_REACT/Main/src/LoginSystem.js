
import {
    FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed,
    IfFirebaseUnAuthed
} from '@react-firebase/auth';
import { config } from './config/firebase';
import { firebase } from "@firebase/app";
import "@firebase/auth";
import React, { useState, useEffect } from 'react';
import LoginPage from "./LoginPage";
import RegisterPage from './RegisterPage';
import UserDashboard from './UserDashboard';

/*
* A loginSystem component, passing props to LoginPage.js and RegisterPage.js, handling authentication 
*/
function LoginSystem() {
    // function to handle email login
    function handleEmailLogIn() {
        clearErrors();
        firebase.auth().signInWithEmailAndPassword(email, password).catch((err) => {
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

    // function to handle email password signup
    function handleSignUp() {
        clearErrors();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((err) => {
            if (confirmPassword !== password) {
                setPasswordError('Passwords do not match');

            } else {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        console.log("error message: " + err.message);
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        console.log(err.message);
                        setPasswordError("error message: " + err.message);
                        break;
                }
            }
        });

    }

    //Setting up the states 
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);
    const [userProfileName, setUserProfileName] = useState("");
    const [isNewUser, setIsNewUser] = useState(true);


    // function to clear email, password, and confirmPassword state
    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    // function to clear email error and password error states
    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    }

    // function which detects a state change regarding authentication (whether user has signed up / logged in / logged out), 
    // and modifies the user state accordingly
    const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                clearInputs();
                // console.log("user: " + user);
                // console.log("a: " + user.additionalUserInfo.isNewUser);
                // setIsNewUser(user.additionalUserInfo.isNewUser);
                setUser(user);
            } else {
                setUser("");
            }
        })
    }

    // implementation of authlistener function 
    useEffect(() => {
        authListener();
    }, []);

    return (
        user ? <UserDashboard /> : (
            hasAccount ? (
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
                    userProfileName={userProfileName}
                    setUserProfileName={setUserProfileName}> </LoginPage>
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
                    userProfileName={userProfileName}
                    setUserProfileName={setUserProfileName}> </RegisterPage>
            ))
    );
}

export default LoginSystem