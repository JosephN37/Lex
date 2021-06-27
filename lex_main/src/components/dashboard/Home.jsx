import React from 'react'
import "./dashboard.css";
import { EventData } from './EventData';
import EventCard from './EventCard';

export default function Home() {
    return (
        <div className="home">
            {EventData.map(event => {
                return (
                    <EventCard sport={event.sport} place={event.place} time={event.time} date={event.date} quota={event.quota} imgSrc={event.imgSrc} />
                )
            })}
            
        </div>
    )
}
