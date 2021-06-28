import React, { useState } from "react";
import "../dashboard/dashboard.css";

import DashboardNavbar from "../dashboard/DashboardNavbar";
import Sidebar from "../dashboard/Sidebar";
import Home from "../dashboard/Home";
import CreateEvent from "../dashboard/CreateEvent";

export default function Dashboard() {
  
  const [page, setPage] = useState(<Home />);
  const [link, setLink] = useState("home");

  function handleSidebarNav(link) {
    setLink(link);
    switch (link) {
      case "home":
        setPage(<Home />);
        break;
      case "createEvent":
        setPage(<CreateEvent />);
        break;
      default:
        setPage(<Home />);
        setLink("home");
    }
  }

  return (
    <div>
      <DashboardNavbar></DashboardNavbar>
      <div className="mainContainer">
        <Sidebar onClick={handleSidebarNav} currPage={link}/>
        <div className="others">
          {page}
        </div>
      </div>
    </div>
  );
}
