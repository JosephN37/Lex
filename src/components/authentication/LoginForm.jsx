/**
 * LoginForm.jsx
 *
 * Loginform component
 */

import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import "../../index.css";

import GoogleLoginButton from "./GoogleLoginButton";

function LoginForm() {
  /**
   * Login form component
   */

  const emailRef = useRef(); // The given email
  const passwordRef = useRef(); // The given password
  const { login } = useAuth(); // Authentication Context
  const [error, setError] = useState(""); // Error State
  const [loading, setLoading] = useState(false); // Loading State
  const history = useHistory(); // redirect page

  async function handleSubmit(event) {
    // Function that handles the submit event (user click log in button)
    event.preventDefault(); // prevent our site from refreshing

    try {
      setError("");
      setLoading(true); // wait for the login to complete
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/"); // redirect to "/"
    } catch {
      setError("Failed to log in, please try again");
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
          {/* <!-- Log in page header --> */}
          <h1 className="text-center mb-2 fw-normal h3">Please log in</h1>
          <GoogleLoginButton />
          <hr></hr>

          {/* <!-- If there is an error, it will render an error message --> */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* <!-- Log in Form --> */}
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="mb-4"
                type="email"
                ref={emailRef}
                required
              />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="mb-4"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>

            <Button
              className="w-100 btn-dark mt-3"
              type="submit"
              disabled={loading}
            >
              Log in
            </Button>
          </Form>

          <div
            className="w-100 text-center mt-3"
            style={{ fontSize: "0.8rem" }}
          >
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <div className="w-100 text-center mt-2" style={{ fontSize: "1rem" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </Card>
      </div>
    </Container>
  );
}

export default LoginForm;
