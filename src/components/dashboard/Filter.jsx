import React from "react";
import { Dropdown } from "react-bootstrap";

import "./dashboard.css";

export default function Filter({ setSport }) {
  function addFilter(event) {
      const key = event.target.innerText;
      if (key === "No Filter") {
          setSport("");
      } else {
          setSport(event.target.innerText)
      }
  }

  return (
    <div className="filter-bar">
      <Dropdown className="drop-menu">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          <i class="fas fa-sort"></i> Sort by
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
          <i class="fas fa-filter"></i> Filter Sports
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
  );
}
