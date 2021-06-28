/**
 * Landing.jsx
 * 
 * The landing page.
 */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LandingNavbar from '../misc/LandingNavbar';
import Footer from '../misc/Footer';
import SignupForm from '../authentication/SignupForm';


export default function Landing() {
    return (
        <div>
            <LandingNavbar />

            <Container fluid className="landing-main gradient-background">
                <Row className="align-items-center">
                    <Col xs={12} md={7} >
                        <h1 className="quote">
                            DO SPORTS <br />
                            WE ORGANIZE
                        </h1>
                    </Col>
                    <Col xs={12} md={5} >
                        <div className="align-middle">
                            <SignupForm />
                        </div>
                    </Col>
                </Row>
            </Container>

            <Footer theme="dark"/>
        </div>
    );
}
