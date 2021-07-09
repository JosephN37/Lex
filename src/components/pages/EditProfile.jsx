/*
* EditProfile.jsx
* A page to edit user profile
*
*/

import { Form, Button, Card } from "react-bootstrap";
import {EditProfileFormLabels} from "./EditProfileFormLabels.js";
import { useAuth } from "../../contexts/AuthContext.js";
import React, {useState} from 'react';
import { database } from "../../firebase";
import CenteredContainer from "../misc/CenteredContainer";
import { storage } from "../../firebase";


function EditProfile() {

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading State
  const { currentUser } = useAuth(); // Authentication Context
  const [input, setInput] = useState({
    email: "",
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  // function to handle when user chooses file to upload
  function handleImageChange(event){
    if(event.target.files[0]){
      setImage(event.target.files[0]);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    console.log(input);
    setLoading(true);

    
    try {
      // upload image to firebase storage
    
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setImageUrl(url);
              console.log("Url:" ,imageUrl);
            });
        }
      );

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
      });

      alert("profile edited successfully!");

    } catch {
       alert("unable to edit profile");
    }

    setLoading(false);
    event.preventDefault();
  }

  return (
    <>
        <CenteredContainer>
        <Card style={{
          border: "none",
          padding: "5%",
          boxShadow: "0 2px 5px #444444",
        }}>
        <input type="file" onChange={handleImageChange}></input> 
        <img src={imageUrl} alt="profile" style={{borderRadius:"50%", height:"300px", width: "300px", marginRight: "auto", marginLeft: "auto"}}></img>
        <Form onSubmit={handleSubmit}>
        {EditProfileFormLabels.map((val, key) => {
            return (
                <Form.Group id={val.id} key={key}>
                <Form.Label>{val.title}</Form.Label>
                <Form.Control
                  name={val.name}
                  className="mb-4"
                  type={val.type}
                  onChange={handleChange}
                  placeholder={val.placeholder}
                  required
                />
              </Form.Group>
            );
        })}

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
    </>
  )
}

export default EditProfile
