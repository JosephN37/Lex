import React from 'react';
import useCollections from "../../hooks/useCollections.js";
import { useAuth } from "../../contexts/AuthContext.js";
import EventCard from "../dashboard/EventCard";
import { Container, Row, Col } from "react-bootstrap";

function YourEvents() {
    const collections = useCollections("events");
    const { currentUser } = useAuth(); // Authentication Context

    if (!collections) {
        return;
      }
    
    const eventList = collections.data;

    function yourEventFilter(list){
        return list.includes(currentUser.uid);
    }

    return (
        <div className="home">
            <Container>
            <Row className="align-items-center">
            {eventList.filter((event) => event.participants.includes(currentUser.uid)) // include yourEventFilter here
            .map((event) => {
                return (
                  <Col xs={12} sm={6} md={3}>
                    <EventCard
                      sport={event.sport}
                      place={event.place}
                      time={event.time}
                      date={event.date}
                      quota={event.quota}
                      imgSrc={event.imgSrc}
                    />
                  </Col>
                );
              })}
              </Row>
              </Container>
        </div>
    )
}

export default YourEvents
