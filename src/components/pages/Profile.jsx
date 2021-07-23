/*
 * UpdateProfile.jsx
 *
 * Page to edit user profile
 */

import { database } from "../../firebase";
import { Table, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext.js";
import React, { useState, useEffect } from "react";
import CenteredContainer from "../misc/CenteredContainer";

function Profile() {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
    profilePictureUrl: "",
  });
  const { currentUser } = useAuth(); // Authentication Context

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setProfile({
            email: doc.data().email,
            username: doc.data().username,
            age: doc.data().age,
            gender: doc.data().gender,
            preferredSports: doc.data().preferredSports,
            profilePictureUrl: doc.data().profilePictureUrl,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  function displayProfilePicture() {
    if (profile.profilePictureUrl) {
      return (
        <img
          src={profile.profilePictureUrl}
          alt="profile"
          style={{ borderRadius: "50%", height: "300px", width: "300px" }}
        ></img>
      );
    } else {
      return (
        <img
          src="../../../images/default-profile.png"
          alt="profile" //display default profile
          style={{ borderRadius: "50%", height: "300px", width: "300px" }}
        ></img>
      );
    }
  }

  return (
    <div className="gradient-background">
      <CenteredContainer>
        <Card
          style={{
            border: "none",
            padding: "5%",
            boxShadow: "0 2px 5px #444444",
          }}
        >
          <div
            className="card-img-top"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {displayProfilePicture()}
          </div>
          <br></br>
          <Table>
            <tbody>
              <tr>
                <td colspan="1">Email</td>
                <td>{profile.email}</td>
              </tr>
              <tr>
                <td colspan="1">Username</td>
                <td>{profile.username}</td>
              </tr>
              <tr>
                <td colspan="1">Age</td>
                <td>{profile.age}</td>
              </tr>
              <tr>
                <td colspan="1">Gender</td>
                <td>{profile.gender}</td>
              </tr>
              <tr>
                <td colspan="1">Preferred Sports</td>
                <td>{profile.preferredSports}</td>
              </tr>
            </tbody>
          </Table>
          <Button href="/edit-profile">Edit Profile</Button>
        </Card>
      </CenteredContainer>
    </div>
  );
}

export default Profile;
