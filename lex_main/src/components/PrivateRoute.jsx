/**
 * PrivateRoute.jsx
 * 
 * Only accessible if user is logged in.
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
    /**
     * The PrivateRoute (only for logged in users) component
     */
    const { currentUser } = useAuth();                    // Authentication Context

    return (
        <Route {...rest} render={ props => {
            return currentUser ? <Component {...props} /> : <Redirect to={"/landing"} />
        }}>
        </Route>
    )
}
