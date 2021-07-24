/* eslint-disable jsx-a11y/img-redundant-alt */
/**
 * Event.jsx
 *
 * Page to display the event
 */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button, Card, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import useCollections from "../../hooks/useCollections.js";
import CenteredContainer from "../misc/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import { SportData } from "../dashboard/SportData";

export default function Event(props) {
  const [loading, setLoading] = useState(false); // Loading State
  const collections = useCollections("users");
  const [error, setError] = useState(""); // Error State
  const { state } = props.location;
  const [participants, setParticipants] = useState(state.participants);
  const { currentUser } = useAuth();
  const history = useHistory(); // redirect page
  const [userData, setUserData] = useState({
    sportsType: {},
    sportsPlayed: {},
  });
  const [userList, setUserList] = useState([]);

  const users = collections.data;

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          setUserData({
            sportsType: doc.data().sportsType,
            sportsPlayed: doc.data().sportsPlayed,
          });
        } else {
          // doc.data() will be undefined in this case
          // Redirect to edit profile
          console.log("No such user!");
          <Redirect to={"/landing"} />;
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  useEffect(() => {
    console.log("USE EFFECT CALLED");
    getParticipants();
  }, [users]);

  function getParticipants() {
    console.log("GET PARTICIPANTS", participants);
    setUserList(users.filter((user) => participants.includes(user.uid)));
  }

  function joinGame(event) {
    // Function to join game
    setLoading(true);

    const temp = participants.slice(); // copy participants array
    temp.push(currentUser.uid);
    try {
      database.events.doc(state.uid).update({ participants: temp });
      setParticipants([...participants, currentUser.uid]);
    } catch {
      setError("Failed to join the event, please try again");
    }

    // Update the user stats
    const stat = SportData[state.sport]["type"];
    const temp2 = {};
    for (const [key, value] of Object.entries(stat)) {
      temp2[key] = userData["sportsType"][key] + value;
    }
    const temp3 = userData["sportsPlayed"];
    temp3[state.sport] = temp3[state.sport] + 1;
    setUserData((prev) => ({ sportsPlayed: temp3, sportsType: temp2 }));

    try {
      database.users
        .doc(currentUser.uid)
        .update({ sportsType: temp2, sportsPlayed: temp3 });
    } catch {
      setError("Failed to join the event, please try again");
    }

    // Add to participant list
    console.log("SET USER LIST");
    const username = users.filter((user) => user.uid === currentUser.uid)[0];
    setUserList((prev) => [...prev, username]);

    setLoading(false);
    event.preventDefault();
  }

  function leaveGame(event) {
    // Function to leave game
    setLoading(true);

    var temp = participants.slice();
    temp = temp.filter((user) => user !== currentUser.uid);
    try {
      database.events.doc(state.uid).update({ participants: temp });
      setParticipants(participants.filter((user) => user !== currentUser.uid));
    } catch {
      setError("Failed to join the event, please try again");
    }

    // Update the user stats
    const stat = SportData[state.sport]["type"];
    const temp2 = {};
    for (const [key, value] of Object.entries(stat)) {
      temp2[key] = userData["sportsType"][key] - value;
    }
    const temp3 = userData["sportsPlayed"];
    temp3[state.sport] = temp3[state.sport] - 1;
    setUserData((prev) => ({ sportsPlayed: temp3, sportsType: temp2 }));

    try {
      database.users
        .doc(currentUser.uid)
        .update({ sportsType: temp2, sportsPlayed: temp3 });
    } catch {
      setError("Failed to join the event, please try again");
    }

    // Remove user from participant list
    setUserList(userList.filter((user) => user.uid !== currentUser.uid));

    setLoading(false);
    event.preventDefault();
  }

  if (!state) {
    history.push("/");
    return null;
  }

  function generateButton() {
    if (state.quota >= participants.length) {
      return (
        <Button
        className="w-100 btn-warning mt-3"
        disabled={true}
        onClick={joinGame}
      >
        Event Full
      </Button>
      )
    } else if (!participants.includes(currentUser.uid)) {
      return (<Button
        className="w-100 btn-success mt-3"
        disabled={loading}
        onClick={joinGame}
      >
        Join Now
      </Button>)
    } else {
      return (<Button
        className="w-100 btn-danger mt-3"
        disabled={loading}
        onClick={leaveGame}
      >
        Leave Game
      </Button>)
    }
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
          <strong>{state.quota - participants.length}</strong> left out of{" "}
          {state.quota} players
        </p>
        <hr></hr>
        <h4>Description</h4>
        <p>{state.description}</p>
        <hr></hr>
        <h4>Participants</h4>
        <div>
          {userList.map((user, id) => {
            return (
              <Button
                href={`/profile/${user.uid}`}
                className="clickable btn-light"
                style={{ margin: "10px" }}
              >
                {user.profilePictureUrl ? (
                  <img
                    src={user.profilePictureUrl}
                    alt="profile"
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      marginRight: "15px",
                    }}
                  ></img>
                ) : (
                  <img
                    src="../../../images/default-profile.png"
                    alt="profile"
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      marginRight: "15px",
                    }}
                  ></img>
                )}
                {user.username}
              </Button>
            );
          })}
        </div>

        {generateButton()}
      </Card>
    </CenteredContainer>
  );
}
