/* eslint-disable no-unused-vars */
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard.jsx';
import Category from '../Pages/Category.jsx';
import AddCategory from '../Pages/AddCategory.jsx';
import App from '../App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/categories', element: <Category /> },
      { path: '/categories/add', element: <AddCategory /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
