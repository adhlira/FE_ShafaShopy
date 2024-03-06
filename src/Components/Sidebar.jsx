/* eslint-disable no-unused-vars */
import React from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-neutral-900 w-60 p-3 text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcSalesPerformance fontSize={24} />
        <span className="text-neutral-100 text-lg">ShafaShopy</span>
      </div>
      <div className="flex-1"></div>
      <div>Bottom Part</div>
    </div>
  );
}
