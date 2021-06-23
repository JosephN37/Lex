import { firebase } from "@firebase/app";
import "@firebase/auth";
import { useState, useEffect } from 'react';
import React from "react";
import './styles/UserDashboard-style.css'
import EventsList from "./EventsList";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserDashboardNavbar from "./UserDashboardNavbar";
import LeftSidebar from "./LeftSidebar";
import LandingPage from "./LandingPage";


function UserDashboard() {
    return (
        // <>
        //     <UserDashboardNavbar></UserDashboardNavbar>
        //     <div className="d-flex" id="wrapper">
        //         <LeftSidebar></LeftSidebar>
        //         <EventsList />
        //     </div>
        // </>

        <Router>
            <UserDashboardNavbar></UserDashboardNavbar>
            <div className="d-flex" id="wrapper">
                <LeftSidebar></LeftSidebar>
                <Switch>
                    <Route exacth path="/Dashboard-event"><EventsList /></Route>
                    <Route exact path="/"><LandingPage /></Route>
                    <Route path="*"><EventsList /></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default UserDashboard
