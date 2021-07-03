import React from "react";

function EventCard(props) {
  const {
    sport,
    place,
    date,
    time,
    quota,
    
  } = props;

  // a component representing an event, consists of sports, pace, date, time

  return (
    <div className="card" style={{ width: "18rem", textAlign: "center", margin: "50px"}}>
      <img className="card-img-top" src="https://photoresources.wtatennis.com/photo-resources/2019/08/15/dbb59626-9254-4426-915e-57397b6d6635/tennis-origins-e1444901660593.jpg?width=1200&height=630" alt=" "></img>
      <div className="card-body">
        {sport && <h3 className="card-title">{sport}</h3>}
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
