import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function LandingNavbar() {
    return (
        <Navbar bg="dark" expand="md" className="navbar-dark" >
            <Navbar.Brand href="/landing" className="logo" style={{fontSize: "2.5rem", margin: "0 0 0 18px"}}>LEX</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                <Nav.Link href="/login" style={{padding: "0 18px", fontSize: "1.2rem"}}>Log in</Nav.Link>
                <Nav.Link href="/signup" style={{padding: "0 18px", fontSize: "1.2rem"}}>Sign up</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    );
}
