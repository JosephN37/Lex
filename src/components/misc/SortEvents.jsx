/**
 * SortEvents.jsx
 *
 * A button to sort events
 */
import React, { useState } from "react";
import { Dropdown, Button } from "react-bootstrap";

export default function SortEvents({ setComparator }) {
  const [sortBy, setSortBy] = useState([]); // this is the sorter

  function changeSorter(event) {
    // Change the comparator for the sorter
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
    // Removes the sorter
    setSortBy([]);
    setComparator(undefined);
  }

  function sortingDateComparator(e1, e2) {
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
    const res = -sortingDateComparator(e1, e2);
    setSortBy(["Most Recent"]);
    return res;
  }

  function sortingPlayersJoinedComparator(e1, e2) {
    setSortBy(["Ascending player count"]);
    if (e1.participants.length > e2.participants.length) {
      return 1;
    } else {
      return -1;
    }
  }

  function sortingPlayersJoinedComparatorReverse(e1, e2) {
    const res = -sortingPlayersJoinedComparator(e1, e2);
    setSortBy(["Descending player count"]);
    return res;
  }

  function sortingQuotaComparator(e1, e2) {
    setSortBy(["Ascending quota"]);
    if (e1.quota > e2.quota) {
      return 1;
    } else {
      return -1;
    }
  }

  function sortingQuotaComparatorReverse(e1, e2) {
    const res = -sortingQuotaComparator(e1, e2);
    setSortBy(["Descending quota"]);
    return res;
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
      </div>
      <div className="filter-bar">
        {sortBy.map((sport, id) => {
          return (
            <Button
              key={id}
              className="btn-info filter-menu"
              onClick={removeSorter}
              name={sport}
            >
              <i className="fas fa-times"></i> {sport}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
