/**
 * Home.jsx
 * 
 * The dashboard home page
 */

import React from "react";
import "../dashboard/dashboard.scss";
import useCollections from "../../hooks/useCollections.js";

import EventCard from "../dashboard/EventCard";

export default function Home() {
  const collections = useCollections("events");

  function sortingComparator(e1, e2) {
    return Date.parse(e1.date) > Date.parse(e2.date)
  }

  if (!collections) {
    return (
      <h1>Sorry we have no events for you yet 😓</h1>
    );
  }

  var eventList = collections.data;
  eventList = eventList.sort(sortingComparator)

  return (
    <div className="wrapper">
      {eventList.map((event, id) => {
        return (
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
        );
      })}
    </div>
  );
}
