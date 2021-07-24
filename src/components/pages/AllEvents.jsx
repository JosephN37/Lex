/**
 * AllEvents.jsx
 *
 * The dashboard AllEvents page
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "../dashboard/dashboard.css";
import useCollections from "../../hooks/useCollections.js";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../firebase";

import NotFound from "../misc/NotFound";
import EventCard from "../dashboard/EventCard";
import Filter from "../misc/Filter";

export default function AllEvents() {
  const { currentUser } = useAuth();
  const collections = useCollections("events");
  const history = useHistory(); // redirect page
  const [filterSport, setFilterSport] = useState([]);
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
  }, [currentUser]);

  if (!collections) {
    return <NotFound
    title="Nothing Here"
    subtitle="No events were found"
    body="Be the first to create an event!"
    buttonText="Create Event"
    buttonLink="/create-event"
  />;
  }

  function redirectToEvent(event) {
    history.push({
      pathname: "/event",
      state: event,
    });
  }

  function checkIfJoined(participants) {
    return participants && participants.includes(currentUser.uid);
  }

  var eventList = collections.data;
  eventList = eventList.sort(comparator);

  if (eventList.length === 0) {
    return <NotFound
    title="Nothing Here"
    subtitle="No events were found"
    body="You haven't joined any events yet!"
    buttonText="Join Event"
    buttonLink="/event"
  />;
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
