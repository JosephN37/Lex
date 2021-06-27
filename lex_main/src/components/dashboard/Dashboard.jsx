import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./dashboard.css";

import DashboardNavbar from "./DashboardNavbar";
import Sidebar from "./Sidebar";
import Home from "./Home";
import CreateEvent from "./CreateEvent";

export default function Dashboard() {
  return (
    <div>
      <DashboardNavbar></DashboardNavbar>
      <div className="mainContainer">
        <Sidebar />
        <div className="others">
          <Router>
            <Switch>
              <Route exact path="/" component={CreateEvent} />
              <Route path="/create-event" component={CreateEvent} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}
