/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import "./Components/Sidebar";
import Sidebar from "./Components/Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="p-4">
        <div className="bg-teal-200">header</div>
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}
