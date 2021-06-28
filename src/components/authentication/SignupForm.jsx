/**
 * SignupForm.jsx
 *
 * SignupForm page for Lex
 */

import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import "../../index.css";

import GoogleLoginButton from "./GoogleLoginButton";

function SignupForm() {
  /**
   * Signup component for the Signup page.
   */

  const emailRef = useRef(); // The given email
  const passwordRef = useRef(); // The given password
  const passwordConfirmRef = useRef(); // The given confirmation password
  const { signup } = useAuth(); // Authentication Context
  const [error, setError] = useState(""); // Error State
  const [loading, setLoading] = useState(false); // Loading State
  const history = useHistory(); // redirect page

  async function handleSubmit(event) {
    // Function that handles the submit event (user click sign up button)
    event.preventDefault(); // prevent our site from refreshing

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true); // wait for the user to be created
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/"); // redirect to "/"
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false); // stop loading
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card
          style={{
            border: "none",
            padding: "5%",
            boxShadow: "0 2px 5px #444444",
          }}
        >
          {/* <!-- Sign Up page header --> */}
          <h1 className="text-center mb-3 fw-normal h3">Sign up and play</h1>
          <hr></hr>

          {/* <!-- If there is an error, it will render an error message --> */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* <!-- Sign up Form --> */}
            <Form.Group id="email">
              <Form.Label>What's your email?</Form.Label>
              <Form.Control
                className="mb-4"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Create a password</Form.Label>
              <Form.Control
                className="mb-4"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                className="mb-4"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>

            <Button
              className="w-100 btn-success btn-lg mt-3"
              type="submit"
              disabled={loading}
            >
              <strong>Play Now</strong>
            </Button>
          </Form>
          <div className="text-center" style={{ fontSize: "0.8rem" }}>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
          <GoogleLoginButton />
        </Card>
      </div>
    </Container>
  );
}

export default SignupForm;
