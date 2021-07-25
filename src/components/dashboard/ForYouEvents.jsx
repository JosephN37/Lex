/**
 * ForYouEvents.jsx
 *
 * Shows the recommended events for you
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { SportData } from "./SportData";
import { useAuth } from "../../contexts/AuthContext.js";
import { database } from "../../firebase";
import useCollections from "../../hooks/useCollections.js";
import "../dashboard/dashboard.css";
import EventCard from "../dashboard/EventCard";
import SortEvents from "../misc/SortEvents";
import NotFound from "../misc/NotFound";

export default function ForYouEvents() {
  // States
  const collections = useCollections("events");
  const { currentUser } = useAuth(); // Authentication Context
  const [userData, setUserData] = useState({});
  const history = useHistory(); // redirect page
  const [match, setMatch] = useState({
    Tennis: 0,
    Badminton: 0,
    Basketball: 0,
    Frisbee: 0,
    Soccer: 0,
  });
  const [top, setTop] = useState([]);
  const [comparator, setComparator] = useState(undefined); //default sorter

  function checkIfJoined(participants) {
    // See whether the participant joined the game
    return participants && participants.includes(currentUser.uid);
  }

  function redirectToEvent(event) {
    // When an event is clicked, redirect to the event
    history.push(`/event/${event.uid}`)
  }

  function scalarProduct(userData, SportData) {
    // Does a scalar product between 2 JS objects
    var sum = 0;
    for (const [key, value] of Object.entries(userData)) {
      sum += value * SportData[key];
    }
    return sum;
  }

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data().sportsType);
        } else {
          // Redirect to edit profile
          console.log("No such user!");
          history.push("/edit-profile");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [currentUser, history]);

  // Calculate and find the recommended events
  useEffect(() => {
    const temp = { ...match };
    // Do a matrix multiplication to calculate the match percentage of the event and user
    for (const key in temp) {
      temp[key] = scalarProduct(userData, SportData[key]["type"]);
    }
    setMatch(temp);
    var result = [];
    // Sort the list of matching events based on the match percentage
    for (var sport in match) {
      result.push([sport, match[sport]]);
    }
    result.sort((a, b) => b[1] - a[1]);
    result = result.map((a) => a[0]);
    // Only take the top 3 matches
    setTop(result.slice(0, 3));
  }, [userData, history, match]);

  if (!collections) {
    return (
      <NotFound
        title="Nothing Here"
        subtitle="No events were found"
        body="Be the first to create an event!"
        buttonText="Create Event"
        buttonLink="/create-event"
      />
    );
  }

  var eventList = collections.data;
  eventList = eventList.filter((event) => top.includes(event.sport));
  eventList = eventList.sort(comparator);

  if (eventList.length === 0) {
    return (
      <NotFound
        title="Nothing Here"
        subtitle="We don't have what you want"
        body="Look for other sports"
        buttonText="All Events"
        buttonLink="/events"
      />
    );
  }

  return (
    <div>
      <SortEvents setComparator={setComparator} />
      <div className="wrapper">
        {eventList.map((event, id) => {
          return (
            <div
              className={checkIfJoined(event.participants) ? "greyCard" : null}
              onClick={() => redirectToEvent(event)}
              key={id}
            >
              <EventCard
                key={id}
                img={event.imgSrc}
                title={event.title}
                sport={event.sport}
                venue={event.place}
                date={event.date}
                time={event.time}
                quota={event.participants.length + " / " + event.quota}
                blocked={checkIfJoined(event.participants)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
