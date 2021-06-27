import React from "react";

function EventCard(props) {
  const {
    sport,
    setSport,
    place,
    setPlace,
    date,
    setDate,
    time,
    setTime,
    quota,
    setQuota,
    imgSrc
  } = props;

  // a component representing an event, consists of sports, pace, date, time

  return (
    <div className="card" style={{ width: "18rem", textAlign: "center", margin: "50px"}}>
      <img className="card-img-top" src={imgSrc} alt=" "></img>
      <div className="card-body">
        <h3 className="card-title">{sport}</h3>
        <p className="card-text">{place}</p>
        <p className="card-text">{date}</p>
        <p className="card-text">{time}</p>
        {quota && <p className="card-text">Remaining Quota: {quota.curr}/{quota.max}</p>}
        <a href="/" className="btn btn-primary">
          Join Game
        </a>
      </div>
    </div>
  );
}

export default EventCard;
