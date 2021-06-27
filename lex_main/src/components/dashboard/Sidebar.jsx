import React from "react";
import { SidebarData } from "./SidebarData.js";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            {SidebarData.map((val, key) => {
              return (
                <li
                  key={key}
                  className="sidebarListItem"
                  id={
                    window.location.pathname === val.link ? "side-active" : ""
                  }
                  onClick={() => {
                    window.location.pathname = val.link;
                  }}
                >
                  <div className="sidebarIcon">{val.icon}</div>
                  <div className="sidebarTitle">{val.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
