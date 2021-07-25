/**
 * Event.jsx
 *
 * Page to display the event
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { Button, Card, Alert } from "react-bootstrap";
import { PROJECT_ID, ADMIN_USER, ADMIN_SECRET } from "../../chatengine.js";
import { useParams } from "react-router-dom";

import useCollections from "../../hooks/useCollections.js";
import CenteredContainer from "../misc/CenteredContainer";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";
import { SportData } from "../dashboard/SportData";

export default function Event2() {
  const { currentUser } = useAuth(); // Authentication Context
  const { eventId } = useParams(); // The user Id from the URL
  const collections = useCollections("users"); // Get all the users
  const [error, setError] = useState(""); // Error State
  const [loading, setLoading] = useState(false); // Loading State
  const history = useHistory(); // redirect page

  const users = collections.data;

  const [userData, setUserData] = useState({
    sportsType: {},
    sportsPlayed: {},
  });
  const [event, setEvent] = useState({
    chatId: "",
    createdAt: "",
    date: "",
    description: "",
    imgSrc: "",
    participants: [],
    place: "",
    quota: "",
    sport: "",
    time: "",
    title: "",
    userId: "",
  });

  // Getting the user data from database
  useEffect(() => {
    console.log("Getting user info");
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData({
            sportsType: doc.data().sportsType,
            sportsPlayed: doc.data().sportsPlayed,
          });
        } else {
          // Redirect to edit profile
          console.log("No such user!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser]);

  // Getting the event data
  useEffect(() => {
    getEventData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getEventData() {
    console.log("Getting event info");
    var docRef = database.events.doc(eventId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setEvent({
            chatId: doc.data().chatId,
            createdAt: doc.data().createdAt,
            date: doc.data().date,
            description: doc.data().description,
            imgSrc: doc.data().imgSrc,
            participants: doc.data().participants,
            place: doc.data().place,
            quota: doc.data().quota,
            sport: doc.data().sport,
            time: doc.data().time,
            title: doc.data().title,
            userId: doc.data().userId,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such event!");
          history.push("/events");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  function joinGame(e) {
    // Function to join game
    setLoading(true);

    // Insert to chat
    console.log("Adding to chat")
    var formdata = new FormData();
    formdata.append("username", currentUser.email);
    axios
      .post(
        `https://api.chatengine.io/chats/${event.chatId}/people/`,
        formdata,
        {
          headers: {
            "Project-ID": PROJECT_ID,
            "User-Name": ADMIN_USER,
            "User-Secret": ADMIN_SECRET,
          },
        }
      )
      .then(
        // Insert to DB
        () => {
          console.log("Insert to DB");
          const temp = event.participants.slice(); // copy participants array
          temp.push(currentUser.uid);
          try {
            database.events.doc(eventId).update({ participants: temp });
          } catch {
            setError("Failed to join the event, please try again");
          }
          getEventData();

          // Update user stats
          const stat = SportData[event.sport]["type"];
          const sportStat = {};
          for (const [key, value] of Object.entries(stat)) {
            sportStat[key] = userData["sportsType"][key] + value;
          }
          const sportCount = userData["sportsPlayed"];
          sportCount[event.sport] = sportCount[event.sport] + 1;
          setUserData((prev) => ({
            sportsPlayed: sportCount,
            sportsType: sportStat,
          }));
          try {
            database.users
              .doc(currentUser.uid)
              .update({ sportsType: sportStat, sportsPlayed: sportCount });
          } catch {
            setError("Failed to update user status, please try again");
          }
        }
      )
      .catch((error) => console.log("Failed to put you in the chat"));
    setLoading(false);
    e.preventDefault();
  }
  function leaveGame(e) {
    // Function to leave game
    setLoading(true);

    // Remove from Chat
    console.log("Remove from chat")
    var formdata = new FormData();
    formdata.append("username", currentUser.email);
    axios
      .put(
        `https://api.chatengine.io/chats/${event.chatId}/people/`,
        formdata,
        {
          headers: {
            "Project-ID": PROJECT_ID,
            "User-Name": ADMIN_USER,
            "User-Secret": ADMIN_SECRET,
          },
        }
      )
      .then(() => {
        // Remove from db
        console.log("Remove from DB")
        var temp = event.participants.slice();
        temp = temp.filter((user) => user !== currentUser.uid);
        try {
          database.events.doc(eventId).update({ participants: temp });
        } catch {
          setError("Failed to join the event, please try again");
        }

        getEventData();

        // Update user stats
        const stat = SportData[event.sport]["type"];
        const sportStat = {};
        for (const [key, value] of Object.entries(stat)) {
          sportStat[key] = userData["sportsType"][key] - value;
        }
        const sportCount = userData["sportsPlayed"];
        sportCount[event.sport] = sportCount[event.sport] - 1;
        setUserData((prev) => ({
          sportsPlayed: sportCount,
          sportsType: sportStat,
        }));
        try {
          database.users
            .doc(currentUser.uid)
            .update({ sportsType: sportStat, sportsPlayed: sportCount });
        } catch {
          setError("Failed to update user status, please try again");
        }
      })
      .catch((error) => console.log("Failed to remove you from the chat"));

    setLoading(false);
    e.preventDefault();
  }

  function generateButton() {
    if (event.quota <= event.participants.length) {
      return (
        <Button
          className="w-100 btn-warning mt-3"
          disabled={true}
          onClick={joinGame}
        >
          Event Full
        </Button>
      );
    } else if (!event.participants.includes(currentUser.uid)) {
      return (
        <Button
          className="w-100 btn-success mt-3"
          disabled={loading}
          onClick={joinGame}
        >
          Join Now
        </Button>
      );
    } else {
      return (
        <div>
          <Button href="/chats" className="w-100 btn-primary mt-3">
            Chat
          </Button>
          <Button
            className="w-100 btn-danger mt-3"
            disabled={loading}
            onClick={leaveGame}
          >
            Leave Game
          </Button>
        </div>
      );
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
        <img src={event.imgSrc} alt="event" />
        <h1>{event.title}</h1>
        <h2>{event.sport}</h2>
        <hr></hr>
        <h4>Date</h4>
        <h6>{new Date(event.date).toDateString()}</h6>
        <br></br>
        <h4>Time</h4>
        <h6>{event.time}</h6>
        <br></br>
        <h4>Quota</h4>
        <p>
          <strong>{event.quota - event.participants.length}</strong> left out of{" "}
          {event.quota} players
        </p>
        <hr></hr>
        <h4>Description</h4>
        <p>{event.description}</p>
        <hr></hr>
        <h4>Participants</h4>
        <div>
          {users
            .filter((user) => event.participants.includes(user.uid))
            .map((user, id) => {
              return (
                <Button
                  href={`/profile/${user.uid}`}
                  className="clickable btn-light"
                  style={{ margin: "10px" }}
                  key={id}
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
