import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../../index.css";

function DashboardNavbar() {
  const { logout } = useAuth(); // logout
  const history = useHistory(); // redirect page

  async function handleLogout() {
    try {
      await logout();
      history.push("/");
    } catch {
      console.log("Failed to log out");
    }
  }

  return (
    <Navbar bg="dark" expand="md" className="navbar-dark" id="dashboardNavbar">
      <Navbar.Brand
        href="/"
        className="logo"
        style={{ fontSize: "2.5rem", margin: "0 0 0 18px" }}
      >
        LEX
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link
            href="/Update-profile"
            style={{ padding: "0 18px", fontSize: "1.2rem" }}
          >
            Profile
          </Nav.Link>
          <Nav.Link
            onClick={handleLogout}
            style={{ padding: "0 18px", fontSize: "1.2rem" }}
          >
            Log out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DashboardNavbar;
