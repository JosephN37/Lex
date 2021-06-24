/**
 * ForgotPassword.jsx
 * 
 * ForgotPassword page for Lex
 */

import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';

import { useAuth } from '../contexts/AuthContext';
import "../index.css";


function ForgotPassword() {
    /**
     * ForgotPassword component for the Forgot Password page.
     */

    const emailRef = useRef();                      // The given email
    const { resetPassword } = useAuth();            // Authentication Context
    const [error, setError] = useState('');         // Error State
    const [message, setMessage] = useState('');     // message State
    const [loading, setLoading] = useState(false);  // Loading State

    async function handleSubmit(event) {
        // Function that handles the submit event (user click reset password button)
        event.preventDefault(); // prevent our site from refreshing

        try {
            setMessage('');
            setError('');
            setLoading(true); // wait for the reset password to complete
            await resetPassword(emailRef.current.value);
            setMessage("Check your email for further instructions")
        } catch {;
            setError('Failed to reset password')
        }
        setLoading(false); // stop loading

    }

    return (
        <div>
            <Card style={{ border: "none" }}>
                {/* <!-- reset password page header --> */}
                <h1 className="logo text-center">LEX</h1>
                <h1 className="text-center mb-3 fw-normal h3">Password Reset</h1>
                <hr></hr>

                {/* <!-- If there is an error, it will render an error message --> */}
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    {/* <!-- reset password Form --> */}
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="mb-4" type="email" ref={emailRef} required />
                    </Form.Group>

                    <Button className="w-100 btn-dark mt-3" type="submit" disabled={loading}>Reset Password</Button>
                </Form>

                <div className="w-100 text-center mt-3">
                    <Link to="/login">Login</Link>
                </div>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    );
}

export default ForgotPassword;