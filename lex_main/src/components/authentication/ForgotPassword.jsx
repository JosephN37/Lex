/**
 * ForgotPassword.jsx
 *
 * ForgotPassword page for Lex
 */

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";

import { useAuth } from "../../contexts/AuthContext";
import "../../index.css";
import Footer from "../Footer";

function ForgotPassword() {
  /**
   * ForgotPassword component for the Forgot Password page.
   */

  const emailRef = useRef(); // The given email
  const { resetPassword } = useAuth(); // Authentication Context
  const [error, setError] = useState(""); // Error State
  const [message, setMessage] = useState(""); // message State
  const [loading, setLoading] = useState(false); // Loading State

  async function handleSubmit(event) {
    // Function that handles the submit event (user click reset password button)
    event.preventDefault(); // prevent our site from refreshing

    try {
      setMessage("");
      setError("");
      setLoading(true); // wait for the reset password to complete
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false); // stop loading
  }

  return (
    <div className="gradient-background">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Link to="/landing" style={{ textDecoration: "none" }}>
            <h1 className="logo logo-big logo-white text-center">LEX</h1>
          </Link>
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
                {/* <!-- reset password page header --> */}
                <h1 className="text-center mb-5 fw-normal h3">
                  Password Reset
                </h1>

                {/* <!-- If there is an error, it will render an error message --> */}
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                  {/* <!-- reset password Form --> */}
                  <Form.Group id="email">
                    <Form.Label>What is your email?</Form.Label>
                    <Form.Control
                      className="mb-4"
                      type="email"
                      ref={emailRef}
                      required
                    />
                  </Form.Group>

                  <Button
                    className="w-100 btn-dark mt-3"
                    type="submit"
                    disabled={loading}
                  >
                    Reset Password
                  </Button>
                </Form>

                <div className="w-100 text-center mt-3">
                  <Link to="/login">Login</Link>
                </div>
                <div className="w-100 text-center mt-2">
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </div>
              </Card>
            </div>
          </Container>
          <Footer theme="light" />
        </div>
      </Container>
    </div>
  );
}

export default ForgotPassword;
