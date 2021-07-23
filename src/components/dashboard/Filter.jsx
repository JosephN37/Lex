import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

import "./dashboard.css";

export default function Filter({ setSport , comparator, setComparator}) {
  const [filterSports, setFilterSports] = useState([]);
  // const [sorter, setSorter] = useState([]);

  function removeFilter(event) {
    const key = event.target.name;
    setFilterSports(filterSports.filter(item => item !== key));
    setSport(filterSports.filter(item => item !== key));
  }

  function addFilter(event) {
    const key = event.target.innerText;
    if (key === "No Filter") {
      setSport([]);
      setFilterSports([]);
    } else {
      if (!filterSports.includes(key)) {
        setFilterSports((prev) => [...prev, key]);
        setSport((prev) => [...prev, key])
      }
    }
  }

  function changeSorter(event){
    const key = event.target.innerText;
    if(key === "date low-high"){
      setComparator(()=>sortingDateComparator);
    }
    if(key === "date high-low"){
      setComparator(()=>sortingDateComparatorReverse);
    }
    if(key === "players joined low-high"){
      setComparator(()=>sortingPlayersJoinedComparator);
    }
    if(key === "players joined high-low"){
      setComparator(()=>sortingPlayersJoinedComparatorReverse);
    }
    if(key === "quota low-high"){
      setComparator(()=>sortingQuotaComparator);
    }
    if(key === "quota high-low"){
      setComparator(()=>sortingQuotaComparatorReverse);
    }
  }

  function sortingDateComparator(e1, e2) {
    if(Date.parse(e1.date) > Date.parse(e2.date)){
      return 1;
    } else if (Date.parse(e1.date) === Date.parse(e2.date)){
      let t1_hr = parseInt(e1.time[0] + e1.time[1]);
      let t1_min = parseInt(e1.time[3] + e1.time[4]);
      let t2_hr = parseInt(e2.time[0] + e2.time[1]);
      let t2_min = parseInt(e2.time[3] + e2.time[4]);
        if(t1_hr > t2_hr){
          return 1;
        } else if (t1_hr === t2_hr){
          if(t1_min > t2_min){
            return 1;
          } else {
            return -1
          }
        } else {
          return -1;
        }
    } else {
      return -1;
    }
  }

  function sortingDateComparatorReverse(e1, e2){
    return -(sortingDateComparator(e1,e2));
  }

  function sortingPlayersJoinedComparator(e1, e2){
    console.log("e1:" + e1);
    console.log("e2:" + e2);
    console.log("comparator:" + comparator);
    console.log()
    if(e1.participants.length > e2.participants.length){
      return 1;
    } else {
      return -1;
    }
  }

  function sortingPlayersJoinedComparatorReverse(e1,e2){
    return -sortingPlayersJoinedComparator(e1,e2);
  }

  function sortingQuotaComparator(e1, e2){
    if(e1.quota > e2.quota){
      return 1;
    } else {
      return -1;
    }
  }

  function sortingQuotaComparatorReverse(e1,e2){
    return -sortingQuotaComparator(e1,e2);
  }

  return (
    <div>
      <div className="filter-bar">
        <Dropdown className="drop-menu">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i className="fas fa-sort"></i> Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick = {changeSorter}>date low-high</Dropdown.Item>
            <Dropdown.Item onClick = {changeSorter}>date high-low</Dropdown.Item>
            <Dropdown.Item onClick = {changeSorter}>players joined low-high</Dropdown.Item>
            <Dropdown.Item onClick = {changeSorter}>players joined high-low</Dropdown.Item>
            <Dropdown.Item onClick = {changeSorter}>quota low-high</Dropdown.Item>
            <Dropdown.Item onClick = {changeSorter}>quota high-low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown className="drop-menu">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i className="fas fa-filter"></i> Filter Sports
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={addFilter}>Tennis</Dropdown.Item>
            <Dropdown.Item onClick={addFilter}>Badminton</Dropdown.Item>
            <Dropdown.Item onClick={addFilter}>Basketball</Dropdown.Item>
            <Dropdown.Item onClick={addFilter}>Frisbee</Dropdown.Item>
            <Dropdown.Item onClick={addFilter}>Soccer</Dropdown.Item>
            <Dropdown.Item onClick={addFilter}>No Filter</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter-bar">
        {filterSports.map((sport, id) => {
          return (
            <Button key={id} className="btn-warning filter-menu" onClick={removeFilter} name={sport} >
              <i className="fas fa-times"></i> {sport}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
