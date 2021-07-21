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
  const [comparator, setComparator] = useState(undefined); //default sorter 
  

  function sortingDateComparator(e1, e2) {
    if(Date.parse(e1.date) > Date.parse(e2.date)){
      return 1;
    } else if (Date.parse(e1.date) === Date.parse(e2.date)){
      let t1_hr = parseInt(e1.time[0] + e1.time[1]);
      let t1_min = parseInt(e1.time[3] + e1.time[4]);
      let t2_hr = parseInt(e2.time[0] + e2.time[1]);
      let t2_min = parseInt(e2.time[3] + e2.time[4]);
        if(t1_hr > t2_hr){
          return 0;
        } else if (t1_hr === t2_hr){
          if(t1_min > t2_min){
            return 1;
          } else {
            return -1
          }
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  }

  function sortingPlayersJoinedComparator(e1, e2){
    console.log("e1:" + e1);
    console.log("e2:" + e2);
    if(e1.participants.length > e2.participants.length){
      return 1;
    } else {
      return -1;
    }
  
  }

  function sortingQuotaComparator(e1, e2){
    if(e1.quota > e2.quota){
      return 1;
    } else {
      return -1;
    }
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
  eventList = eventList.sort(comparator);
  console.log(eventList);

  if(filterSport.length !== 0) {
    eventList = eventList.filter(event => filterSport.includes(event.sport))
  }

  return (
    <div>
      <Filter setSport={setFilterSport} comparator = {comparator} setComparator={setComparator} />
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
