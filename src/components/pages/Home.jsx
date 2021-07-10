/**
 * Home.jsx
 *
 * The dashboard home page
 */

import React, { useState } from "react";
import { useHistory } from "react-router";
import "../dashboard/dashboard.scss";
import useCollections from "../../hooks/useCollections.js";

import EventCard from "../dashboard/EventCard";

export default function Home() {
  const collections = useCollections("events");
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory(); // redirect page

  function sortingComparator(e1, e2) {
    return Date.parse(e1.date) > Date.parse(e2.date);
  }

  if (!collections) {
    return <h1>Sorry we have no events for you yet 😓</h1>;
  }

  function redirectToEvent(event) {
    history.push({
      pathname:"/event",
      state: event
    })
  }

  var eventList = collections.data;
  eventList = eventList.sort(sortingComparator);

  return (
    <div className="wrapper">
      {eventList.map((event, id) => {
        return (
          <div onClick={() => redirectToEvent(event)}>
            <EventCard
              key={id}
              img={event.imgSrc}
              title={event.title}
              sport={event.sport}
              venue={event.place}
              date={event.date}
              time={event.time}
              quota={event.quota.curr + " / " + event.quota.max}
            />
          </div>
        );
      })}
    </div>
  );
}
