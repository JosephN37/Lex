import { firebase } from "@firebase/app";
import "@firebase/auth";
import { useState, useEffect } from 'react';
import React from "react";
import './styles/UserDashboard-style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserDashboardNavbar from "./UserDashboardNavbar";
import LeftSidebar from "./LeftSidebar";
import LandingPage from "./LandingPage";
import CreateEvent from "./CreateEvent";
import EventCard from "./EventCard";


function UserDashboard() {

    const [ sport, setSport ] = useState ('sport');
        const [ place, setPlace ] = useState ('place');
        const [ date, setDate ] = useState ('date');
        const [ time, setTime ] = useState ('time');
        const [ quota, setQuota ] = useState ('quota');

    const eventRef= firebase.database().ref("event");

    // function dataMap() {eventRef.on("value", function(snapshot){
    //     snapshot.forEach(function(evt){
    //         console.log(evt.val().Sport)
    //         return(<div>a</div>)
        // return (<EventCard 
        // sport= {evt.val().Sport}
        // setSport = {setSport}
        // place ={evt.val().Place}
        // setPlace = {setPlace}
        // date={evt.val().Date}
        // setDate={setDate}
        // time = {evt.val().Time}
        // setTime={setTime}
        // quota = {evt.val().Quota}
        // setQuota = {setQuota}/>)
//         }
//         )
// })}  
        // const [dataArr,setDataArr] = useState({event:[]});
        // function helper(snapshot){
        //     var data = snapshot.val();
        //     var newState = [];
        //     for(let i in data){
        //         newState.push({
        //             Sport: data[i].Sport,
        //             Place: data[i].Place,
        //             Date: data[i].Date,
        //             Time: data[i].Time,
        //             Quota: data[i].Quota
        //         })
        //     }
        //     setDataArr({ event: newState});
        //     console.log(dataArr);
        // }
        // function dataMap() { eventRef.on("value", helper)}

        // function A () {eventRef.on('value', (snapshot) => {
        //     let newEventState = [];
        //     snapshot.forEach(data => {
        //       const datas = data.val();
        //       const [dataArr,setDataArr] = useState({event:[]});
        //       newEventState.push({
        //         Sport: datas.Sport,
        //         Place: datas.Place,
        //         Date: datas.Date,
        //         Time: datas.Time,
        //         Quota: datas.Quota
        //       })
        //     })
        //     setDataArr({event: newEventState});

        //   })}


    return (
        <Router>
            <UserDashboardNavbar></UserDashboardNavbar>
            <div className="d-flex" id="wrapper">
                <LeftSidebar></LeftSidebar>
                <Switch>
                    {/* <Route path="/testing" id="EventCards"><div>{A()}</div></Route> */}
                    <Route exact path="/Dashboard-event"><div className="container-fluid px-3"><EventCard sport= {sport}
                    setSport = {setSport}
                    place ={place}
                    setPlace = {setPlace}
                    date={date}
                    setDate={setDate}
                    time = {time}
                    setTime={setTime}
                    quota = {quota}
                    setQuota = {setQuota}/><EventCard/><EventCard/><EventCard/></div></Route>
                    <Route exact path="/Create-event"><CreateEvent 
                    sport = {sport}
                    setSport = {setSport}
                    place ={place}
                    setPlace = {setPlace}
                    date={date}
                    setDate={setDate}
                    time = {time}
                    setTime={setTime}
                    quota = {quota}
                    setQuota = {setQuota}/></Route>
                    <Route path="*"><EventCard
                    sport = {sport}
                    setSport = {setSport}
                    place ={place}
                    setPlace = {setPlace}
                    date={date}
                    setDate={setDate}
                    time = {time}
                    setTime={setTime}
                    quota = {quota}
                    setQuota = {setQuota}/><EventCard/><EventCard/></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default UserDashboard
