import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LandingPage from './LandingPage';
import About from './About';
import { FirebaseAuthProvider } from '@react-firebase/auth';
import { config } from './config/firebase';
import { firebase } from "@firebase/app";
import "@firebase/auth";
import LoginPage from "./LoginPage"
import LoginSystem from './LoginSystem'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import RegisterPage from "./RegisterPage"
import UserDashboard from './UserDashboard';


// Initialize firebase app
firebase.initializeApp(config);

//function for sending request from React frontend to node.js + Express backend
export var url = "http://localhost:3000/"
export function regularRequest(handler, method, body, callback) {
  const http = new XMLHttpRequest()
  http.responseType = 'json'
  http.open(method.url + handler, true)
  if (body != null) {
    http.setRequestHeader('Content-Type', 'application/json')
  }
  http.onload = function () {
    callback(http.response)
  }
  http.send(JSON.stringify(body))
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path='/'><LandingPage /></Route>
        <Route exact path='/LoginSystem'><LoginSystem /></Route>
        <Route exact path='/About'><About /></Route>
        <Route exact path='/UserDashboard'><UserDashboard /></Route>
        {/* <Route exact path='/Dashboard-event'><UserDashboard /></Route> */}
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

