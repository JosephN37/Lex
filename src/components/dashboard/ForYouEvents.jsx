import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { SportData } from "./SportData";
import { useAuth } from "../../contexts/AuthContext.js";
import { database } from "../../firebase";
import useCollections from "../../hooks/useCollections.js";
import "../dashboard/dashboard.css";
import EventCard from "../dashboard/EventCard";
import SortEvents from "../misc/SortEvents";

export default function ForYouEvents() {
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
    return participants && participants.includes(currentUser.uid);
  }

  function redirectToEvent(event) {
    history.push({
      pathname: "/event",
      state: event,
    });
  }

  function scalarProduct(userData, SportData) {
    var sum = 0;
    for (const [key, value] of Object.entries(userData)) {
      sum += value * SportData[key];
    }
    return sum;
  }

  function calculateMatch() {
    const temp = { ...match };
    for (const key in temp) {
      temp[key] = scalarProduct(userData, SportData[key]["type"]);
    }
    setMatch(temp);
    findTopThree();
  }

  function findTopThree() {
    var result = [];
    for (var sport in match) {
      result.push([sport, match[sport]]);
    }
    console.log("Result", result)
    result.sort((a, b) => b[1] - a[1]);
    result = result.map(a => a[0]);
    setTop(result.slice(0, 3));
    console.log("final", result)
  }

  // Getting the user data from database
  useEffect(() => {
    var docRef = database.users.doc(currentUser.uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          setUserData(doc.data().sportsType);
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

  useEffect(() => {
    calculateMatch();
  }, [])

  if (!collections) {
    return <h1>Sorry we have no events for you yet 😓</h1>;
  }

  

  var eventList = collections.data;
  eventList = eventList.filter((event) => top.includes(event.sport));
  eventList = eventList.sort(comparator)

  return (
    <div>
        <SortEvents setComparator={setComparator}/>
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
