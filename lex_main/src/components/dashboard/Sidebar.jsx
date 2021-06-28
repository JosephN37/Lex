import React from "react";
import { SidebarData } from "./SidebarData.js";

export default function Sidebar(props) {
  return (
    <div className="sidebar" id="dashboardSidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <ul className="sidebarList">
            {SidebarData.map((val, key) => {
              return (
                <li
                  key={key}
                  className="sidebarListItem"
                  id={
                    props.currPage === val.link ? "side-active" : ""
                  }
                  onClick={() => props.onClick(val.link)}
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
