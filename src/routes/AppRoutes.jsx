/* eslint-disable no-unused-vars */
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../Pages/Dashboard.jsx";
import Category from "../Pages/Category.jsx";
import AddCategory from "../Pages/AddCategory.jsx";
import EditCategory from "../Pages/EditCategory.jsx";
import Colors from "../Pages/Colors.jsx";
import AddColor from "../Pages/AddColor.jsx";
import EditColor from "../Pages/EditColor.jsx";
import Products from "../Pages/Products.jsx";
import DetailProduct from "../Pages/DetailProduct.jsx";
import DetailSellingPrice from "../Pages/DetailSellingPrice.jsx";
import App from "../App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/categories", element: <Category /> },
      { path: "/categories/add", element: <AddCategory /> },
      { path: "/categories/edit/:id", element: <EditCategory /> },
      { path: "/colors", element: <Colors /> },
      { path: "/colors/add", element: <AddColor /> },
      { path: "/colors/edit/:id", element: <EditColor /> },
      { path: "/products", element: <Products /> },
      { path: "/product/:id", element: <DetailProduct /> },
      { path: "/sellingPrice/product/:id", element: <DetailSellingPrice /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
