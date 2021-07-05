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


function EditProfile() {

  const [loading, setLoading] = useState(false); // Loading State
  const { currentUser } = useAuth(); // Authentication Context
  const [input, setInput] = useState({
    email: "",
    username: "",
    age: "",
    gender: "",
    preferredSports: "",
  });

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
      database.users.doc(currentUser.uid).set({
        email: input.email,
        username: Input.username,
        age: input.age,
        gender: input.gender,
        preferredSports: input.preferredSports,
        userId: currentUser.uid,
        createdAt: database.getCurrentTimeStamp(),
      });
    } catch {
      alert("unable to edit profile");
    }
    setLoading(false);
    event.preventDefault();
  }

  return (
    <>
      
        {/* <div className="card mx-auto">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" value={currentUser.email} onChange={e => e.target.val}></input>
            </div>
        </div> */}
        <CenteredContainer>
        <Card style={{
          border: "none",
          padding: "5%",
          boxShadow: "0 2px 5px #444444",
        }}>
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
