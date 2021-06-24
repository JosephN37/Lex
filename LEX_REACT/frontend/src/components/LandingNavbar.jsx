import React from "react";
import "./styles/landing-styles.css";

function LandingNavbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand logo" href="/">
        LEX
      </a>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/About">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/LoginSystem">
              Log in
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/LoginSystem">
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default LandingNavbar;
