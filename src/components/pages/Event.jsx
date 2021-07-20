/* eslint-disable jsx-a11y/img-redundant-alt */
/**
 * Event.jsx
 *
 * Page to display the event
 */
import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Card, Alert } from "react-bootstrap";

import CenteredContainer from "../misc/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

export default function Event(props) {
  const [loading, setLoading] = useState(false); // Loading State
  const [error, setError] = useState(""); // Error State
  const { state } = props.location;
  const [participants, setParticipants] = useState(state.participants);
  const { currentUser } = useAuth();
  const history = useHistory(); // redirect page

  function joinGame(event) {
    // Function to join game
    setLoading(true);

    const temp = participants.slice();
    temp.push(currentUser.uid);
    setParticipants([...participants, currentUser.uid]);
    try {
      database.events.doc(state.uid).update({ participants: temp });
    } catch {
      setError("Failed to join the event, please try again");
    }
    setLoading(false);
    event.preventDefault();
  }

  function leaveGame(event) {
    // Function to leave game
    setLoading(true);

    var temp = participants.slice();
    temp = temp.filter((user) => user !== currentUser.uid);
    setParticipants(participants.filter((user) => user !== currentUser.uid));
    try {
      database.events.doc(state.uid).update({ participants: temp });
    } catch {
      setError("Failed to join the event, please try again");
    }
    setLoading(false);
    event.preventDefault();
  }

  if (!state) {
    history.push("/");
    return null;
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
        <img src={state.imgSrc} alt="event-image" />
        <h1>{state.title}</h1>
        <h2>{state.sport}</h2>
        <hr></hr>
        <h4>Date</h4>
        <h6>{new Date(state.date).toDateString()}</h6>
        <br></br>
        <h4>Time</h4>
        <h6>{state.time}</h6>
        <br></br>
        <h4>Quota</h4>
        <p>
          <strong>{state.quota - participants.length}</strong> left out of {state.quota} players
        </p>
        <hr></hr>
        <h4>Description</h4>
        <p>{state.description}</p>
        {!participants.includes(currentUser.uid) ? (
          <Button
            className="w-100 btn-success mt-3"
            disabled={loading} onClick={joinGame}
          >
            Join Now
          </Button>
        ) : (
          <Button
            className="w-100 btn-danger mt-3"
            disabled={loading} onClick={leaveGame}
          >
            Leave Game
          </Button>
        )}
      </Card>
    </CenteredContainer>
  );
}
