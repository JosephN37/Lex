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

import EventCard from "../dashboard/EventCard";
import Filter from "../misc/Filter";

export default function YourEvents() {
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
        if (doc.exists) {
          // console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
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
    return <h1>Sorry we have no events for you yet 😓</h1>;
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
  console.log(eventList);

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
        {eventList
          .filter(
            (event) =>
              "participants" in event &&
              event.participants.includes(currentUser.uid)
          )
          .map((event, id) => {
            return (
              <div
                className={
                  checkIfJoined(event.participants) ? "greyCard" : null
                }
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
