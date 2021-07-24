/**
 * CreateEvent.jsx
 *
 * The page to create an event
 */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { CreateEventFormLabels } from "../dashboard/CreateEventFormLabels";
import { AvailSports } from "../dashboard/AvailSports";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { PROJECT_ID, ADMIN_USER, ADMIN_SECRET } from "../../chatengine.js";

import CenteredContainer from "../misc/CenteredContainer";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false); // Loading State
  const [error, setError] = useState(""); // Error State
  const history = useHistory(); // redirect page
  const { currentUser } = useAuth();
  const sportData = AvailSports;
  const [input, setInput] = useState({
    title: "",
    sport: "Tennis",
    place: "",
    date: "",
    time: "",
    quota: "",
    img: sportData["Tennis"]["img"],
    description: "",
  });

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          // Redirect to edit profile
          console.log("No such user!");
          history.push("/edit-profile");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser, history]);

  function handleSubmit(event) {
    setLoading(true);

    // Create chat
    var formdata = new FormData();
    formdata.append("title", input.title);
    formdata.append("is_direct_chat", false);
    axios
      .post("https://api.chatengine.io/chats/", formdata, {
        headers: {
          "Project-ID": PROJECT_ID,
          "User-Name": ADMIN_USER,
          "User-Secret": ADMIN_SECRET,
        },
      })
      .then((res) => {
        const chatId = res.data.id;
        // Add user to chat
        var formdata = new FormData();
        formdata.append("username", currentUser.email);
        axios
          .post(
            `https://api.chatengine.io/chats/${chatId}/people/`,
            formdata,
            {
              headers: {
                "Project-ID": PROJECT_ID,
                "User-Name": ADMIN_USER,
                "User-Secret": ADMIN_SECRET,
              },
            }
          )
          .then((res) => console.log("RESPONSE", res))
          .catch((error) => console.log("Failed to put you in the chat"));
        // Save to DB
        if (input.title.length > 50) {
          setError("Title exceeded character count, ");
        } else {
          try {
            database.events.add({
              title: input.title,
              imgSrc: input.img,
              sport: input.sport,
              place: input.place,
              date: input.date,
              time: input.time,
              quota: input.quota,
              description: input.description,
              userId: currentUser.uid,
              participants: [currentUser.uid],
              createdAt: database.getCurrentTimeStamp(),
              chatId: chatId,
            });
            history.push("/");
          } catch {
            setError("Failed to create your event, please try again");
          }
        }
      })
      .catch((error) => console.log(error));

    setLoading(false);
    event.preventDefault();
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

  function generateForm(form, key) {
    return form.id === "sport" ? (
      // The dropdown form for the available sports
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
      // Normal Form
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
    <CenteredContainer>
      {/* <!-- If there is an error, it will render an error message --> */}
      {error && <Alert variant="danger">{error}</Alert>}
      <Card
        style={{
          border: "none",
          padding: "5%",
          boxShadow: "0 2px 5px #444444",
        }}
      >
        <h1 className="text-center mb-2 fw-normal h3">Create your own game</h1>
        <Form onSubmit={handleSubmit}>
          {CreateEventFormLabels.map(generateForm)}

          <Button
            className="w-100 btn-success mt-3"
            type="submit"
            disabled={loading}
          >
            Publish Game
          </Button>
        </Form>
      </Card>
    </CenteredContainer>
  );
}
