/*
 * EditProfile.jsx
 * A page to edit user profile
 *
 */

import { Form, Button, Card } from "react-bootstrap";
import { EditProfileFormLabels } from "./EditProfileFormLabels.js";
import { useAuth } from "../../contexts/AuthContext.js";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { database } from "../../firebase";
import CenteredContainer from "../misc/CenteredContainer";
import { storage } from "../../firebase";
import { AvailSports } from "../dashboard/AvailSports.js";
import { SportData } from "../dashboard/SportData.js";
import axios from "axios";
import { PROJECT_ID, PRIVATE_KEY } from "../../chatengine.js";

function EditProfile() {
  const [loading, setLoading] = useState(false); // Loading State
  const history = useHistory(); // redirect page
  const { currentUser } = useAuth(); // Authentication Context
  const [input, setInput] = useState({
    email: currentUser.email,
    username: "",
    age: "",
    gender: "",
    preferredSports: "Tennis",
  });
  const [imageUrl, setImageUrl] = useState("");
  const [profile, setProfile] = useState({
    email: currentUser.email,
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
    profilePictureUrl: "",
  });
  const sportData = AvailSports;
  const sportData2 = SportData;

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
          setImageUrl(doc.data().profilePictureUrl)
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  // function to handle when user chooses file to upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && file !== null) {
      const fileRef = storage.ref(`images/${file.name}`);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleChangeSport(event) {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
        img: sportData[value]["img"],
      };
    });
  }

  function setSportType(sport) {
    const type = sportData2[sport]["type"];
    for (const field in type) {
      type[field] = type[field] * 2;
    }
    return type;
  }

  function setSportsPlayed() {
    const res = {};
    for (const sport in sportData2) {
      res[sport] = 0;
    }
    res["TOTAL"] = 0;
    return res;
  }

  function checkValidInput() {
    return input.username !== "" && input.age !== "" && input.gender !== "";
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  function handleSubmit(event) {
    setLoading(true);

    if (checkValidInput()) {
      try {
        //updating data on database
        database.users.doc(currentUser.uid).set({
          email: input.email,
          username: input.username,
          age: input.age,
          gender: input.gender,
          preferredSports: input.preferredSports,
          userId: currentUser.uid,
          createdAt: database.getCurrentTimeStamp(),
          profilePictureUrl: imageUrl,
          sportsType: setSportType(input.preferredSports),
          sportsPlayed: setSportsPlayed(),
        });

        // Create Chat acc if there is none
        axios
          .get("https://api.chatengine.io/users/me", {
            headers: {
              "Project-ID": PROJECT_ID,
              "User-Name": currentUser.email,
              "User-Secret": currentUser.uid,
            },
          })
          .then(() => {
            // Update the ChatEngine profile
            console.log("updating profile")
            var formdata = new FormData();
            formdata.append("first_name", input.username);
            getFile(
              imageUrl ||
                "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            ).then((avatar) => {
              formdata.append("avatar", avatar, avatar.name);
              console.log("updating profile2")

              axios
                .patch(
                  `https://api.chatengine.io/users/${currentUser.email}/`,
                  formdata,
                  {
                    headers: {
                      "private-key": PRIVATE_KEY,
                    },
                  }
                )
                .catch((error) => console.log(error));
            });
          })
          .catch(() => {
            // There is no user yet in the ChatEngine. Create a new one
            var formdata = new FormData();
            formdata.append("email", currentUser.email);
            formdata.append("username", currentUser.email);
            formdata.append("secret", currentUser.uid);
            formdata.append("first_name", input.username);

            getFile(
              imageUrl ||
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

        alert("profile edited successfully!");
      } catch (error) {
        console.log(error);
        alert("unable to edit profile");
      }
    } else {
      alert("There are some missing fields!");
    }

    setLoading(false);
    event.preventDefault();
    history.push(`/profile/${currentUser.uid}`);
  }

  function generateForm(form, key) {
    return form.id === "email" ? (
      // Disable email change
      <Form.Group id={form.id} key={key}>
        <Form.Label>{form.title}</Form.Label>
        <Form.Control
          name={form.name}
          className="mb-4"
          type={form.type}
          onChange={handleChange}
          placeholder={profile.email}
          disabled
        />
      </Form.Group>
    ) : form.id === "preferredSports" ? (
      // Dropdown form
      <Form.Group id={form.id} key={key}>
        <Form.Label>{form.title}</Form.Label>
        <Form.Control
          name={form.name}
          className="mb-4"
          type={form.type}
          onChange={handleChangeSport}
          required
          as="select"
        >
          {Object.keys(sportData).map((sport, id) => {
            return <option key={id}>{sportData[sport]["label"]}</option>;
          })}
        </Form.Control>
      </Form.Group>
    ) : (
      // Normal form
      <Form.Group id={form.id} key={key}>
        <Form.Label>{form.title}</Form.Label>
        <Form.Control
          name={form.name}
          className="mb-4"
          type={form.type}
          onChange={handleChange}
          required={form.required}
          as={form.as}
        />
      </Form.Group>
    );
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
          <input type="file" onChange={handleImageChange}></input>
          <img
            src={
              imageUrl ||
              profile.profilePictureUrl ||
              "../../../images/default-profile.png"
            }
            alt="profile"
            style={{
              borderRadius: "50%",
              height: "300px",
              width: "300px",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          ></img>
          <Form onSubmit={handleSubmit}>
            {EditProfileFormLabels.map(generateForm)}

            <Button
              className="w-100 btn-success mt-3"
              type="submit"
              disabled={loading}
            >
              Edit profile
            </Button>
          </Form>
        </Card>
      </CenteredContainer>
    </div>
  );
}

export default EditProfile;
