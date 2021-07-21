import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

import "./dashboard.css";

export default function Filter({ setSport }) {
  const [filterSports, setFilterSports] = useState([]);

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

  return (
    <div>
      <div className="filter-bar">
        <Dropdown className="drop-menu">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            <i className="fas fa-sort"></i> Sort by
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>date low-high</Dropdown.Item>
            <Dropdown.Item>date high-low</Dropdown.Item>
            <Dropdown.Item>players joined low-high</Dropdown.Item>
            <Dropdown.Item>players joined high-low</Dropdown.Item>
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
