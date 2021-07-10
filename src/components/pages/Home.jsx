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

  if (!collections) {
    return;
  }

  const eventList = collections.data;

  return (
    <div className="wrapper">
      {eventList.map((event, id) => {
        return (
          <EventCard
            key={id}
            img={event.imgSrc}
            title={event.sport}
            sport={event.sport}
            date={event.date}
            time={event.time}
            quota={event.quota.curr + " / " + event.quota.max}
          />
        );
      })}
    </div>
  );
}
