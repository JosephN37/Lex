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
import { useParams } from "react-router-dom";

function Profile() {
  // States
  const { currentUser } = useAuth(); // Authentication Context
  const { userId } = useParams(); // The user Id from the URL
  const [profile, setProfile] = useState({
    email: "",
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
    profilePictureUrl: "",
  });

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(userId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
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
  }, [userId]);

  function displayProfilePicture() {
    // Display the profile picture
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
          <h1 style={{ textAlign: "center" }}>{profile.username}</h1>
          <br></br>
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
                <td colSpan="1">Age</td>
                <td>{profile.age}</td>
              </tr>
              <tr>
                <td colSpan="1">Gender</td>
                <td>{profile.gender}</td>
              </tr>
              <tr>
                <td colSpan="1">Preferred Sports</td>
                <td>{profile.preferredSports}</td>
              </tr>
            </tbody>
          </Table>
          {currentUser.uid === userId ? (
            <Button href="/edit-profile">Edit Profile</Button>
          ) : null}
        </Card>
      </CenteredContainer>
    </div>
  );
}

export default Profile;
