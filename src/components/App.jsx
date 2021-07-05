/**
 * App.jsx
 *
 * Main web app of Lex
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext.js";

// Component imports
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./authentication/Profile";
import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import UpdateProfile from "./pages/UpdateProfile";
import EditProfile from "./pages/EditProfile";

function App() {
  /**
   * The main application component
   */
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Dashboard */}
          <PrivateRoute exact path="/" component={Dashboard} />

          {/* Profile */}
          <PrivateRoute exact path="/user" component={Profile} />

          {/* Display profile */}
          <PrivateRoute exact path="/update-profile" component={UpdateProfile} />

          {/* Edit profile */}
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />

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
