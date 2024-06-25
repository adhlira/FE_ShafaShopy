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
import AddProduct from "../Pages/AddProduct.jsx";
import EditProduct from "../Pages/EditProduct.jsx";
import SellingPrice from "../Pages/SellingPrice.jsx"
import AddSellingPrice from "../Pages/AddSellingPrice.jsx";
import EditSellingPrice from "../Pages/EditSellingPrice.jsx"
import Customer from "../Pages/Customers.jsx";
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
      { path: "/products/add", element: <AddProduct /> },
      { path: "/products/edit/:id", element: <EditProduct /> },
      { path: "/products/:id", element: <DetailProduct /> },
      { path: "/sellingPrice/product/:id", element: <DetailSellingPrice /> },
      { path: "/sellingPrices", element: <SellingPrice /> },
      { path: "/sellingprice/add", element: <AddSellingPrice /> },
      { path: "/sellingprice/edit/:id", element: <EditSellingPrice /> },
      { path: "/customers", element: <Customer /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
