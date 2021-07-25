/**
 * YourEvents.jsx
 *
 * The page where users can view their events
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../dashboard/dashboard.css";
import useCollections from "../../hooks/useCollections.js";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

import NotFound from "../misc/NotFound.jsx";
import EventCard from "../dashboard/EventCard";
import Filter from "../misc/Filter";

export default function YourEvents() {
  // States
  const { currentUser } = useAuth(); // The current user
  const collections = useCollections("events"); // All the events
  const history = useHistory(); // redirect page
  const [filterSport, setFilterSport] = useState([]); // Set the filter
  const [comparator, setComparator] = useState(undefined); //default sorter

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

  if (!collections) {
    return (
      <NotFound
        title="Nothing Here"
        subtitle="No events were found"
        body="Be the first to create an event!"
        buttonText="Create Event"
        buttonLink="/create-event"
        style={{ width: "100vw" }}
      />
    );
  }

  function redirectToEvent(event) {
    // Redirect to the clicked event
    history.push(`/event/${event.uid}`)
  }

  function checkIfJoined(participants) {
    // Check if the user has joined
    return participants && participants.includes(currentUser.uid);
  }

  var eventList = collections.data;
  eventList = eventList
    .filter(
      (event) =>
        "participants" in event && event.participants.includes(currentUser.uid)
    )
    .sort(comparator);

  if (eventList.length === 0) {
    return (
      <NotFound
        title="Nothing Here"
        subtitle="No events were found"
        body="You haven't joined any events yet!"
        buttonText="Join Event"
        buttonLink="/events"
      />
    );
  }

  if (filterSport.length !== 0) {
    eventList = eventList.filter((event) => filterSport.includes(event.sport));
  }

  return (
    <div>
      <Filter
        setSport={setFilterSport}
        comparator={comparator}
        setComparator={setComparator}
      />
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
