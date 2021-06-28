/**
 * Login.jsx
 *
 * Login page for Lex
 */

import React from "react";
import { Link } from "react-router-dom";

import "../../index.css";
import Footer from "../misc/Footer";
import LoginForm from "../authentication/LoginForm";
import CenteredContainer from "../misc/CenteredContainer";

function Login() {
  /**
   * Login component for the Login page.
   */

  return (
    <div className="gradient-background">
      <CenteredContainer>
        <Link to="/landing" style={{ textDecoration: "none" }}>
          <h1 className="logo logo-big logo-white text-center">LEX</h1>
        </Link>
        <LoginForm />
        <Footer theme="light" />
      </CenteredContainer>
    </div>
  );
}

export default Login;
