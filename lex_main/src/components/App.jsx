/**
 * App.jsx
 * 
 * Main web app of Lex
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext.js";

// Component imports
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import Profile from "./authentication/Profile";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import Landing from "./Landing";

function App() {
  /**
   * The main application component
   */
  return (
    <Router>
      <AuthProvider>
        <Switch>

          {/* Profile */}
          <PrivateRoute exact path="/" component={Profile} />

          {/* Auth */}
          <Route path="/landing" component={Landing} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
