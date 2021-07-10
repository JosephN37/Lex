/**
 * App.jsx
 *
 * Main web app of Lex
 */
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext.js";

// Misc Component imports
import PrivateRoute from "./misc/PrivateRoute";
import Navbar from "./misc/Navbar";

// Page imports
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import YourEvents from "./pages/YourEvents";
import Event from "./pages/Event";

function App() {
  /**
   * The main application component
   */
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          {/* Dashboard */}
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/create-event" component={CreateEvent} />
          <PrivateRoute path="/your-event" component={YourEvents} />
          <PrivateRoute path="/event" component={Event} />

          {/* Profile */}
          <PrivateRoute path="/profile" component={Profile} />

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
