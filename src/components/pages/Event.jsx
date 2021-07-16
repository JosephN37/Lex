/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { useHistory } from "react-router";
import CenteredContainer from '../misc/CenteredContainer';

export default function Event(props) {
    const { state } = props.location;
    const history = useHistory(); // redirect page

    if (!state) {
        history.push("/");
        return null;
    }

    return (
        <CenteredContainer>
            <img src={state.imgSrc} alt="event-image" />
            <h1>{state.title}</h1>
            <h2>{state.sport}</h2>
            <hr></hr>
            <h4>Date</h4>
            <h6>{new Date(state.date).toDateString()}</h6>
            <br></br>
            <h4>Time</h4>
            <h6>{state.time}</h6>
            <br></br>
            <h4>Quota</h4>
            <p><strong>{state.quota.max - state.quota.curr}</strong> Remaining slots out of {state.quota.max} players</p>
            <hr></hr>
            <h4>Description</h4>
            <p>{state.description}</p>
            <button>Join Now</button>
        </CenteredContainer>
    )
}
