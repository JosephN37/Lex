/**
 * Home.jsx
 *
 * The dashboard home page
 */

import React, { useState } from "react";
import { useHistory } from "react-router";
import "../dashboard/dashboard.css";
import useCollections from "../../hooks/useCollections.js";
import { useAuth } from "../../contexts/AuthContext";

import EventCard from "../dashboard/EventCard";
import Filter from "../dashboard/Filter";

export default function Home() {
  const { currentUser } = useAuth();
  const collections = useCollections("events");
  const history = useHistory(); // redirect page
  const [filterSport, setFilterSport] = useState([]);

  function sortingComparator(e1, e2) {
    return Date.parse(e1.date) > Date.parse(e2.date);
  }

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
  eventList = eventList.sort(sortingComparator);

  if(filterSport.length !== 0) {
    eventList = eventList.filter(event => filterSport.includes(event.sport))
  }

  return (
    <div>
      <Filter setSport={setFilterSport} />
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
