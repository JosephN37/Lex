/**
 * CreateEvent.jsx
 * 
 * The page to create an event
 */

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { CreateEventFormLabels } from "../dashboard/CreateEventFormLabels";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

import CenteredContainer from "../misc/CenteredContainer";

export default function CreateEvent() {
  const [loading, setLoading] = useState(false); // Loading State
  const { currentUser } = useAuth();
  const [input, setInput] = useState({
    sport: "",
    place: "",
    date: "",
    time: "",
    quota: "",
  });

  function handleSubmit(event) {
    console.log(input);
    setLoading(true);

    const maxQuota = parseInt(input.quota);
    const temp = {
      curr: 0,
      max: maxQuota,
    };
    input.quota = temp;

    try {
      database.events.add({
        sport: input.sport,
        place: input.place,
        date: input.date,
        time: input.time,
        quota: input.quota,
        userId: currentUser.uid,
        createdAt: database.getCurrentTimeStamp(),
      });
    } catch {
      alert("failed to create an event");
    }
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

  return (
    <CenteredContainer>
      <Card
        style={{
          border: "none",
          padding: "5%",
          boxShadow: "0 2px 5px #444444",
        }}
      >
        <h1 className="text-center mb-2 fw-normal h3">Create your own game</h1>
        <Form onSubmit={handleSubmit}>
          {CreateEventFormLabels.map((val, key) => {
            return (
              <Form.Group id={val.id} key={key}>
                <Form.Label>{val.title}</Form.Label>
                <Form.Control
                  name={val.name}
                  className="mb-4"
                  type={val.type}
                  onChange={handleChange}
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
            Publish Game
          </Button>
        </Form>
      </Card>
    </CenteredContainer>
  );
}
