/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <div className="min-h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold">ShafaShopy</div>
      <nav>
        <ul>
          {links.map((link, index) => (
            <li key={index} className="p-4">
              <NavLink to={link.path} className={({ isActive }) => (isActive ? "text-yellow-400" : "text-white")}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
