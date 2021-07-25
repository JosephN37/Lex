/**
 * Chats.jsx
 *
 * The chat page
 */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { database } from "../../firebase";
import { PROJECT_ID, PRIVATE_KEY } from "../../chatengine.js";

export default function Chats() {
  // States
  const { currentUser } = useAuth(); // The current user
  const { history } = useHistory(); // Redirect page
  const [loading, setLoading] = useState(true); // Is the page loading?
  const [profile, setProfile] = useState({
    // The profile
    email: "",
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
    profilePictureUrl: "",
  });

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
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
          history.push("/edit-profile");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser, history]);

  const getFile = async (url) => {
    // Fetching a file from a URL
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  // The chat engine
  useEffect(() => {
    if (!currentUser) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "Project-ID": PROJECT_ID,
          "User-Name": currentUser.email,
          "User-Secret": currentUser.uid,
        },
      })
      .then(() => {
        // User is found, no need to make a new user, proceed to chat
        setLoading(false);
      })
      .catch(() => {
        // User not found, create a new user for the chat engine
        var formdata = new FormData();
        formdata.append("email", currentUser.email);
        formdata.append("username", currentUser.email);
        formdata.append("secret", currentUser.uid);
        formdata.append("first_name", profile.username);

        getFile(
          profile.profilePictureUrl ||
            "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        ).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": PRIVATE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [profile, currentUser, history]);

  if (!currentUser || loading) return "Loading...";

  return (
    <div className="chats-page">
      <ChatEngine
        projectID={PROJECT_ID}
        userName={currentUser.email}
        userSecret={currentUser.uid}
        height="calc(100vh - 80px)"
      />
    </div>
  );
}
