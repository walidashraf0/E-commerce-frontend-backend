import React from "react";
import TopBar from "../../Components/Dashboard/TopBar";
import SideBar from "../../Components/Dashboard/SideBar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="position-relative dashboard">
        <TopBar />
        <SideBar />
        <Outlet />
      </div>
    </>
  );
}
