/**
 * Login.jsx
 * 
 * Login page for Lex
 */

import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import "../index.css";
import Footer from './Footer';


function Login() {
    /**
     * Login component for the Login page.
     */

    const emailRef = useRef();                      // The given email
    const passwordRef = useRef();                   // The given password
    const { login } = useAuth();                    // Authentication Context
    const [error, setError] = useState('');         // Error State
    const [loading, setLoading] = useState(false);  // Loading State
    const history = useHistory();                   // redirect page

    async function handleSubmit(event) {
        // Function that handles the submit event (user click log in button)
        event.preventDefault(); // prevent our site from refreshing

        try {
            setError('');
            setLoading(true); // wait for the login to complete
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/"); // redirect to "/"
        } catch {;
            setError('Failed to log in, please try again')
        }
        setLoading(false); // stop loading

    }

    return (
        <div>
            <Card style={{ border: "none" }}>
                {/* <!-- Log in page header --> */}
                <Link to="/" style={{ textDecoration: 'none' }}><h1 className="logo text-center">LEX</h1></Link>
                <h1 className="text-center mb-3 fw-normal h3">Please log in</h1>
                <hr></hr>

                {/* <!-- If there is an error, it will render an error message --> */}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {/* <!-- Log in Form --> */}
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="mb-4" type="email" ref={emailRef} required />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="mb-4" type="password" ref={passwordRef} required />
                    </Form.Group>

                    <Button className="w-100 btn-dark mt-3" type="submit" disabled={loading}>Log in</Button>
                </Form>

                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
            <Footer theme="light"/>
        </div>
    );
}

export default Login;