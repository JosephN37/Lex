/**
 * GoogleLoginButton.jsx
 *
 * A Button for Google sign in
 */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

export default function GoogleLoginButton() {
  /**
   *  The google button component
   */

  const { signInWithGoogle } = useAuth(); // Authentication Context
  const [loading, setLoading] = useState(false); // Loading State
  const history = useHistory(); // redirect page

  async function handleSubmit(event) {
    // Function that handles the submit event (user click sign up button)
    event.preventDefault(); // prevent our site from refreshing

    try {
      setLoading(true); // wait for the user to be created
      await signInWithGoogle();
      history.push("/"); // redirect to "/"
    } catch {
      console.log("Google sign in fail");
    }
    setLoading(false); // stop loading
  }

  return (
    <Button
      className="w-100 btn-danger btn-md mt-3"
      type="submit"
      disabled={loading}
      onClick={handleSubmit}
    >
      <i className="fab fa-google"></i> Sign in with Google
    </Button>
  );
}
