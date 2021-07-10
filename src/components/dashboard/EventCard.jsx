/**
 * EventCard.jsx
 * 
 * The component which displays the event cards
 */
import React from "react";
import "./dashboard.scss";

export default function EventCard({ img, title, sport, date, time, quota }) {
  return (
    <div className="eventcard">
      <img
        className="eventcard__img"
        src="https://photoresources.wtatennis.com/photo-resources/2019/08/15/dbb59626-9254-4426-915e-57397b6d6635/tennis-origins-e1444901660593.jpg?width=1200&height=630"
        alt="card_image"
      />
      <div className="eventcard__body">
        <h2 className="eventcard__title">{title}</h2>
        <h4 className="eventcard__sport">{sport}</h4>
        <p className="eventcard__date">{date}</p>
        <p className="eventcard__time">{time}</p>
        <button className="eventcard__btn">Join Game <br/> {quota}</button>
      </div>
    </div>
  );
}
