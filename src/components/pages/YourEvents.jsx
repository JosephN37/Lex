/**
 * YourEvents.jsx
 * 
 * The page where users can view their events
 */

 import React from "react";
 import { useHistory } from "react-router";
 import "../dashboard/dashboard.css";
 import useCollections from "../../hooks/useCollections.js";
 import { useAuth } from "../../contexts/AuthContext";
 
 import EventCard from "../dashboard/EventCard";
 
 export default function YourEvents() {
   const { currentUser } = useAuth();
   const collections = useCollections("events");
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
 
   function checkIfJoined(participants) {
     return participants && participants.includes(currentUser.uid);
   }
 
   var eventList = collections.data;
   eventList = eventList.sort(sortingComparator);

   eventList = eventList.filter((event) => 'participants' in event && event.participants.includes(currentUser.uid))

   if (eventList.length === 0) {
    return <h1>You haven't joined any event 😓</h1>;
  }
 
   return (
     <div className="wrapper">
       {eventList.filter((event) => 'participants' in event && event.participants.includes(currentUser.uid)).map((event, id) => {
         return (
           <div onClick={() => redirectToEvent(event)} key={id}> 
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
   );
 }
