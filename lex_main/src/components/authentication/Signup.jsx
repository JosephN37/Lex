/**
 * Signup.jsx
 *
 * Signup page for Lex
 */

import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../index.css";

import Footer from "../Footer";
import SignupForm from "./SignupForm";

function Signup() {
  /**
   * Signup component for the Signup page.
   */

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
          <SignupForm />
          <Footer theme="light" />
        </div>
      </Container>
    </div>
  );
}

export default Signup;
