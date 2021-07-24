import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { database } from "../../firebase";

export default function Chats() {
  const { currentUser } = useAuth();
  const { history } = useHistory();
  const [loading, setLoading] = useState(true);
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
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!currentUser) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "Project-ID": "dc7b1f60-5087-4ef6-b9e3-761ebc60898d",
          "User-Name": currentUser.email,
          "User-Secret": currentUser.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        console.log("YAY")
        var formdata = new FormData();
        formdata.append("email", currentUser.email);
        formdata.append("username", currentUser.email);
        formdata.append("secret", currentUser.uid);
        formdata.append("first_name", profile.username);

        getFile(profile.profilePictureUrl || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg").then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "9190a8bc-fa88-4d94-8e5e-64f8f01c5f1d",
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
        projectID="dc7b1f60-5087-4ef6-b9e3-761ebc60898d"
        userName={currentUser.email}
        userSecret={currentUser.uid}
      />
    </div>
  );
}
