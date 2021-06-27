import React from 'react'
import "firebase/database"
import { useState, useEffect } from 'react';
import { firebase } from "@firebase/app";

function CreateEvent(props) {
    const{sport, setSport, place, setPlace, date, setDate, time, setTime, quota, setQuota} = props;
    const eventRef= firebase.database().ref("event");
    const clearInputs = () => {
        setSport("");
        setPlace("");
        setDate("");
        setTime("");
        setQuota("");
    }
    const handleCreateEvent = (e) => {
    const eventInstance = {
        Sport: {sport},
        Place: {place},
        Date: {date},
        Time: {time},
        Quota: {quota}
    }
    e.preventDefault();
    eventRef.push(eventInstance);
    clearInputs();
    }


    return (
        <div className="form-with-bg" style={{ paddingLeft: "25%", paddingRight: "100%", height: "100vh" }}>
            <form style={{ paddingLeft: "35%", paddingRight: "0%", width: "400px" }}>
                <div className="row mb-3">
                    <label for="inputSport" className="col-sm-4 col-form-label text-white fs-9">Sport</label>
                    <div className="col-sm-10">
                        <input type="sport" className="form-control" id="inputSport" value={sport} onChange={(e) => setSport(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputPlace" className="col-sm-4 col-form-label text-white fs-9">Place</label>
                    <div className="col-sm-10">
                        <input type="place" className="form-control" id="inputPlace" value={place} onChange={(e) => setPlace(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputDate" className="col-sm-4 col-form-label text-white fs-9">Date</label>
                    <div className="col-sm-10">
                        <input type="date" className="form-control" id="inputDate" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputTime" className="col-sm-4 col-form-label text-white fs-9">Time</label>
                    <div className="col-sm-10">
                        <input type="time" className="form-control" id="inputTime" value={time} onChange={(e) => setTime(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label for="inputQuota" className="col-sm-4 col-form-label text-white fs-9">Quota</label>
                    <div className="col-sm-10">
                        <input type="quota" className="form-control" id="inputQuota" value={quota} onChange={(e) => setQuota(e.target.value)}></input>
                    </div>
                </div>
                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0 text-white fs-9"></legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input " type="radio"  id="gridRadiosPublic" ></input>
                            <label className="form-check-label text-white fs-9" >
                                Public
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input " type="radio"  id="gridRadiosPrivate"></input>
                            <label className="form-check-label text-white fs-9" >
                                Private
                            </label>
                        </div>
                    </div>
                </fieldset>

                {/* checkbox */}
                {/* <div className="row mb-3">
                <div className="col-sm-10 offset-sm-2">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck1"></input>
                        <label className="form-check-label text-white fs-9" for="gridCheck1">
                            Example checkbox
                        </label>
                    </div>
                </div>
            </div> */}
                <button type="submit" className="btn btn-primary text-white" style={{ marginLeft: "55px" }} onClick = {(e) =>handleCreateEvent(e)}>Create</button>
            </form>
        </div>

    )
}

export default CreateEvent
