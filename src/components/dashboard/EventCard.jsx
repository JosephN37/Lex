/**
 * EventCard.jsx
 *
 * The component which displays the event cards
 */
import React from "react";
import "./dashboard.scss";

export default function EventCard({
  img,
  title,
  sport,
  venue,
  date,
  time,
  quota,
  blocked,
}) {
  return (
    <div className="eventcard">
      <img className="eventcard__img" src={img} alt="card_image" />
      <div className="eventcard__body">
        <h2 className="eventcard__title">{title}</h2>
        <h4 className="eventcard__sport">{sport}</h4>
        <p className="eventcard__venue">{venue}</p>
        <p className="eventcard__date">{date}</p>
        <p className="eventcard__time">{time}</p>
        {!blocked ? (
          <button className="eventcard__btn">
            Join Game <br /> {quota}
          </button>
        ) : 
        (
          <button className="eventcard__btn">
            You're In! <br /> {quota}
          </button>
        )}
      </div>
    </div>
  );
}
