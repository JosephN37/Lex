/**
 * Filter.jsx
 *
 * A button that filters the events
 */
import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

export default function Filter({ setSport, comparator, setComparator }) {
  // States
  const [filterSports, setFilterSports] = useState([]); // filter sports based on this
  const [sortBy, setSortBy] = useState([]); // sort based on this

  function changeSorter(event) {
    // Change the sorting comparator
    const key = event.target.innerText;
    if (key === "Oldest") {
      setComparator(() => sortingDateComparator);
    }
    if (key === "Recent") {
      setComparator(() => sortingDateComparatorReverse);
    }
    if (key === "players joined low-high") {
      setComparator(() => sortingPlayersJoinedComparator);
    }
    if (key === "players joined high-low") {
      setComparator(() => sortingPlayersJoinedComparatorReverse);
    }
    if (key === "quota low-high") {
      setComparator(() => sortingQuotaComparator);
    }
    if (key === "quota high-low") {
      setComparator(() => sortingQuotaComparatorReverse);
    }
  }

  function removeSorter(event) {
    // Remove the sort condition
    setSortBy([]);
    setComparator(undefined);
  }

  function sortingDateComparator(e1, e2) {
    // Sort the date from oldest first
    setSortBy(["Oldest"]);
    if (Date.parse(e1.date) > Date.parse(e2.date)) {
      return 1;
    } else if (Date.parse(e1.date) === Date.parse(e2.date)) {
      let t1_hr = parseInt(e1.time[0] + e1.time[1]);
      let t1_min = parseInt(e1.time[3] + e1.time[4]);
      let t2_hr = parseInt(e2.time[0] + e2.time[1]);
      let t2_min = parseInt(e2.time[3] + e2.time[4]);
      if (t1_hr > t2_hr) {
        return 1;
      } else if (t1_hr === t2_hr) {
        if (t1_min > t2_min) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return -1;
      }
    } else {
      return -1;
    }
  }

  function sortingDateComparatorReverse(e1, e2) {
    // Sort the date from the most recent event
    const res = -sortingDateComparator(e1, e2);
    setSortBy(["Most Recent"]);
    return res;
  }

  function sortingPlayersJoinedComparator(e1, e2) {
    // Sort the events based on the amt of players joined (ascending)
    setSortBy(["Ascending player count"]);
    if (e1.participants.length > e2.participants.length) {
      return 1;
    } else {
      return -1;
    }
  }

  function sortingPlayersJoinedComparatorReverse(e1, e2) {
    // Sort the events based on the amt of players joined (descending)
    const res = -sortingPlayersJoinedComparator(e1, e2);
    setSortBy(["Descending player count"]);
    return res;
  }

  function sortingQuotaComparator(e1, e2) {
    // Sort the events based on the smallest quota first
    setSortBy(["Ascending quota"]);
    if (e1.quota > e2.quota) {
      return 1;
    } else {
      return -1;
    }
  }

  function sortingQuotaComparatorReverse(e1, e2) {
    // Sort the events based on the largest quota first
    const res = -sortingQuotaComparator(e1, e2);
    setSortBy(["Descending quota"]);
    return res;
  }

  function removeFilter(event) {
    // Remove the filter
    const key = event.target.name;
    setFilterSports(filterSports.filter((item) => item !== key));
    setSport(filterSports.filter((item) => item !== key));
  }

  function addFilter(event) {
    // Add a filter
    const key = event.target.innerText;
    if (key === "No Filter") {
      setSport([]);
      setFilterSports([]);
    } else {
      if (!filterSports.includes(key)) {
        setFilterSports((prev) => [...prev, key]);
        setSport((prev) => [...prev, key]);
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
            <Dropdown.Item onClick={changeSorter}>Recent</Dropdown.Item>
            <Dropdown.Item onClick={changeSorter}>Oldest</Dropdown.Item>
            <Dropdown.Item onClick={changeSorter}>
              players joined low-high
            </Dropdown.Item>
            <Dropdown.Item onClick={changeSorter}>
              players joined high-low
            </Dropdown.Item>
            <Dropdown.Item onClick={changeSorter}>quota low-high</Dropdown.Item>
            <Dropdown.Item onClick={changeSorter}>quota high-low</Dropdown.Item>
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
            <Button
              key={id}
              className="btn-warning filter-menu"
              onClick={removeFilter}
              name={sport}
            >
              <i className="fas fa-times"></i> {sport}
            </Button>
          );
        })}
        {sortBy.map((sport, id) => {
          return (
            <Button
              key={id}
              className="btn-info filter-menu"
              onClick={removeSorter}
            >
              <i className="fas fa-times"></i> {sport}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
