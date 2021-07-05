/*
* UpdateProfile.jsx
*
* Page to edit user profile
*/

import { Table, Button, Card } from "react-bootstrap";
import CenteredContainer from "../misc/CenteredContainer.jsx";
import DashboardNavbar from "../dashboard/DashboardNavbar.jsx";
import { useAuth } from "../../contexts/AuthContext.js";
import React from 'react'


function UpdateProfile() {
  const { currentUser} = useAuth(); // Authentication Context

  return (
    <>
    <DashboardNavbar></DashboardNavbar>
      <div style={{paddingTop:"7%"}}>
        <div className="card mx-auto" style={{width:"700px"}}>
            <div className="card-body">
          <Table>
            <tbody>
              <tr>
                <td colspan="1">Email</td>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <td colspan="1">Username</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td colspan="1">Age</td>
                <td>21</td>
              </tr>
              <tr>
                <td colspan="1">Gender</td>
                <td>21</td>
              </tr>
              <tr>
                <td colspan="1">Preferred Sports</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
          <a className="btn btn-primary text-center" style={{display:"grid"}} href="/edit-profile" role="button">Edit profile</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateProfile
