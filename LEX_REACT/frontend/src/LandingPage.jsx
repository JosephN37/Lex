import React from "react";
import LandingNavbar from "./components/LandingNavbar";
import Footer from "./components/Footer";
import "./components/styles/landing-styles.css";

function LandingPage() {
  return (
    <div className="LandingPage">
      <LandingNavbar />

      {/* <!-- Main Body --> */}
      <div className="main-container">
        <h1 className="quote">
          YOU PLAY <br />
          WE <div className="organize-quote">ORGANIZE</div>
        </h1>
        <a href="/LoginSystem">
          <button className="btn btn-success btn-lg">
            <strong>PLAY NOW</strong>
          </button>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default LandingPage;
