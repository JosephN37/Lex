import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../dashboard/dashboard.css";

import DashboardNavbar from "../dashboard/DashboardNavbar";
import Sidebar from "../dashboard/Sidebar";
import Home from "../dashboard/Home";
import CreateEvent from "../dashboard/CreateEvent";

export default function Dashboard() {
  return (
    <div>
      <DashboardNavbar></DashboardNavbar>
      <div className="mainContainer">
        <Sidebar />
        <div className="others">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create-event" component={CreateEvent} />
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}
