/**
 * Profile.jsx
 *
 * The user Profile page
 */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.js";
import CenteredContainer from "../misc/CenteredContainer.jsx";

export default function Profile() {
  const { currentUser, logout } = useAuth(); // Authentication Context
  const [error, setError] = useState(""); // Error State
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="logo logo-big logo-white text-center">LEX</h1>
          </Link>
          <h1 className="text-center mb-3 fw-normal h3">Profile</h1>
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          {/* <!-- If there is an error, it will render an error message --> */}
          {error && <Alert variant="danger">{error}</Alert>}
        </Card.Body>
      </Card>
      <div className="text-center">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </CenteredContainer>
  );
}
