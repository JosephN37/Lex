import React from "react";
import "../dashboard/dashboard.css";
import { Container, Row, Col } from "react-bootstrap";
import useCollections from "../../hooks/useCollections.js";

import EventCard from "../dashboard/EventCard";

export default function Home() {
  const collections = useCollections("events");

  if (!collections) {
    return;
  }

  const eventList = collections.data;

  return (
    <div className="home">
      <Container>
        <Row className="align-items-center">
          {eventList.map((event) => {
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
  );
}
