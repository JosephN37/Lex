import React, { useState } from "react";

import { SportData } from "./SportData";
import { UserData } from "./UserData";
import "./test.css";

export default function TestMatch() {
  const [sportCount, setSportCount] = useState({
    Tennis: 0,
    Badminton: 0,
    Basketball: 0,
    Frisbee: 0,
    Soccer: 0,
    __TOTAL__: 0,
  });
  const [userData, setUserData] = useState(UserData["type"]);
  const [match, setMatch] = useState({
    Tennis: 0,
    Badminton: 0,
    Basketball: 0,
    Frisbee: 0,
    Soccer: 0,
  });

  function addSportCount(event) {
    const key = event.target.innerText;
    const dict = { ...sportCount };
    dict[key] = sportCount[key] + 1;
    dict["__TOTAL__"] = sportCount["__TOTAL__"] + 1;
    setSportCount(dict);

    // Add to userdata
    // Get data from sportdata
    const stat = SportData[key]["type"];
    const temp = {};
    for (const [key, value] of Object.entries(stat)) {
      temp[key] = userData[key] + value;
    }
    setUserData(temp);
    calculateMatch();
  }

  function resetCounter() {
    setSportCount({
      Tennis: 0,
      Badminton: 0,
      Basketball: 0,
      Frisbee: 0,
      Soccer: 0,
      __TOTAL__: 0,
    });
    setUserData(UserData["type"]);
    setMatch({
        Tennis: 0,
        Badminton: 0,
        Basketball: 0,
        Frisbee: 0,
        Soccer: 0,
      })
  }

  function scalarProduct(d1, d2) {
    var sum = 0;
    console.log("d1: ", d1)
    console.log("d2: ", d2)
    for (const [key, value] of Object.entries(d1)) {
        console.log("key: ", key)
        console.log("value: ", value)
        console.log("d2[key]: ", d2[key])
      sum += value * d2[key];
    }
    return sum;
  }

  function calculateMatch() {
    if (sportCount["__TOTAL__"] === 0) {
      const temp = { ...match };
      temp[UserData["preferredSports"]] = 1;
      setMatch(temp);
    } else {
      const temp = { ...match };
      for (const [key, value] of Object.entries(temp)) {
        temp[key] = scalarProduct(userData, SportData[key]["type"]) ;
      }
      setMatch(temp);
    }
  }

  return (
    <div>
      <div className="left">
        <h1 style={{ textAlign: "left" }}>Sport Count</h1>
        <table>
          {Object.keys(sportCount).map((s, i) => {
            return (
              <tr key={i}>
                <td>{s}</td>
                <td>{sportCount[s]}</td>
              </tr>
            );
          })}
        </table>
        <br></br>

        <h1 style={{ textAlign: "left" }}>User Data</h1>
        <table>
          {Object.keys(userData).map((s, i) => {
            return (
              <tr key={i}>
                <td>{s}</td>
                <td>{userData[s] / sportCount["__TOTAL__"]}</td>
              </tr>
            );
          })}
        </table>
        <br></br>

        <h1 style={{ textAlign: "left" }}>Matching</h1>
        <table>
          {Object.keys(match).map((s, i) => {
            return (
              <tr key={i}>
                <td>{s}</td>
                <td>{match[s]}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="right">
        <button onClick={addSportCount}>Tennis</button>
        <button onClick={addSportCount}>Badminton</button>
        <button onClick={addSportCount}>Basketball</button>
        <button onClick={addSportCount}>Frisbee</button>
        <button onClick={addSportCount}>Soccer</button>
        <button onClick={resetCounter} style={{backgroundColor: "red"}}>Reset</button>
      </div>
    </div>
  );
}
