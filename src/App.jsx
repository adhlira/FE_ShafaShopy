/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Components/Sidebar.jsx';

const links = [
  { name: 'Dashboard', path: '/' },
  { name: 'Categories', path: '/categories' },
];

function App() {
  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
