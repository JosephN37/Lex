/**
 * AuthContext.js
 * 
 * Setup authentication context for the app.
 * Handles signup, login, etc.
 */

import React, { useContext, useState, useEffect } from 'react';
import { auth } from "../firebase";

/**
 * The authentication context.
 * A context is just like an environment. Everything in it has access to the values in that context.
 */
const AuthContext = React.createContext();

export function useAuth() {
    // Function that allows us to use the context.
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    /**
     * Function that returns the context provider. 
     * The "children" will be in the same context and have access to the "value"
     */ 

    const [currentUser, setCurrentUser] = useState();   // set current user as null.
    const [loading, setLoading] = useState(true);       // set loading state as true.

    function signup(email, password) {
        // Function that handles firebase signup (creates a new user)
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        // Function that handles firebase login
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        // Function that handles firebase logout
        return auth.signOut();
    }

    function resetPassword(email) {
        // Function that handles firebase reset password
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        // Function that handles firebase update email
        return auth.updateEmail(email);
    }

    function updatePassword(password) {
        // Function that handles firebase update password
        return auth.updatePassword(password);
    }


    useEffect(() => {
        // When the authentication state changed (e.g. someone logged in), set the current user as the user.
        // When we call this method, it will unsubscribe (clean up) the onAuthStateChanged event
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false); // don't render application until we set the user.
        });
        return unsubscribe;
    }, [])

    
    // The available values in the context (export)
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    };

    // If it is not loading, we render out the children. else, we don't want to render.
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
