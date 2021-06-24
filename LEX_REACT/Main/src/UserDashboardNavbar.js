import React from 'react'
import { firebase } from "@firebase/app";
import "@firebase/auth";

function UserDashboardNavbar() {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <a data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <i class="fas fa-align-left icon-color fs-1 " id="menu-toggle"></i>
            </a>
            <a className="navbar-brand logo" style={{ paddingLeft: "2.5%" }} href="/UserDashboard">LEX</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/ProfileSetting">Profile</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href='/' onClick={() => { firebase.app().auth().signOut() }}>Log out</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default UserDashboardNavbar
