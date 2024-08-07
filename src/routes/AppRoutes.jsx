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
import SellingPrice from "../Pages/SellingPrice.jsx";
import AddSellingPrice from "../Pages/AddSellingPrice.jsx";
import EditSellingPrice from "../Pages/EditSellingPrice.jsx";
import Customer from "../Pages/Customers.jsx";
import AddCustomer from "../Pages/AddCustomer.jsx";
import EditCustomer from "../Pages/EditCustomer.jsx";
import Transaction from "../Pages/Transactions.jsx";
import AddTransaction from "../Pages/AddTransaction.jsx";
import DetailTransaction from "../Pages/DetailTransaction.jsx";
import MonthlyReport from "../Pages/MonthlyReport.jsx";
import ResellerReport from "../Pages/ResellerReport.jsx";
import EditTransaction from "../Pages/EditTransaction.jsx";
import Login from "../Pages/Login.jsx";
import App from "../App.jsx";

const router = createBrowserRouter([
  {path:"/", element:<Login/>},
  {
    path: "/dashboard",
    element: <App />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "categories", element: <Category /> },
      { path: "categories/add", element: <AddCategory /> },
      { path: "categories/edit/:id", element: <EditCategory /> },
      { path: "colors", element: <Colors /> },
      { path: "colors/add", element: <AddColor /> },
      { path: "colors/edit/:id", element: <EditColor /> },
      { path: "products", element: <Products /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      { path: "products/:id", element: <DetailProduct /> },
      { path: "sellingPrice/product/:id", element: <DetailSellingPrice /> },
      { path: "sellingPrices", element: <SellingPrice /> },
      { path: "sellingprice/add", element: <AddSellingPrice /> },
      { path: "sellingprice/edit/:id", element: <EditSellingPrice /> },
      { path: "customers", element: <Customer /> },
      { path: "customers/add", element: <AddCustomer /> },
      { path: "customers/edit/:id", element: <EditCustomer /> },
      { path: "transactions", element: <Transaction /> },
      { path: "transactions/add", element: <AddTransaction /> },
      { path: "transactions/detail/:id", element: <DetailTransaction /> },
      { path: "transactions/edit/:id", element: <EditTransaction /> },
      { path: "monthlyreport", element: <MonthlyReport /> },
      { path: "resellerreport", element: <ResellerReport /> },
    ],
  },
]);

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
