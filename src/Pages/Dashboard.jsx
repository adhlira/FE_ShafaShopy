/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [bestProduct, setBestProduct] = useState([]);
  const [bestReseller, setBestReseller] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bestreseller");
        setBestReseller(response.data);
        console.log("best reseller : ",response.data)
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bestSellingProduct");
        setBestProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("erro", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const totalAmount = transactions.reduce((sum, item) => sum + item.total, 0);
  console.log(totalAmount);

  const totalSold = transactions.reduce((sum, item) => sum + item.Detail_Transaction[0].jumlah_beli, 0);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Dapatkan tanggal saat ini
  const today = new Date();

  // Format tanggal menjadi string
  const formattedDate = today.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl">Dashboard</h1>
          <p className="text-sm mt-1">{formattedDate}</p>
        </div>
        <button className="border w-10 h-10 rounded-full bg-blue-400">A</button>
      </div>
      <div className="grid grid-cols-4 gap-4 h-screen mt-10">
        <div className="border w-full h-1/2 text-center place-content-center bg-green-400 text-white rounded-lg p-2">
          <h5 className="text-xl">Total Sales</h5>
          <h1 className="text-3xl font-bold">{formatRupiah(totalAmount)}</h1>
        </div>
        <div className="border w-full h-1/2 place-content-center bg-yellow-400 text-white text-center rounded-lg p-2">
          <h5 className="text-xl">Product Sold</h5>
          <h1 className="text-3xl font-bold">{totalSold} Pcs</h1>
        </div>
        <div className="border w-full place-content-center bg-blue-400 text-white text-center h-1/2 rounded-lg p-2">
          <h5 className="text-xl">Best Selling Product</h5>
          {bestProduct.map((item, index) => (
            <h1 key={index} className="text-3xl font-bold">
              {item.productName} {item.colorName}
            </h1>
          ))}
        </div>
        <div className="border w-full place-content-center bg-red-400 text-white text-center h-1/2 rounded-lg p-2">
          <h5 className="text-xl">Best Reseller</h5>
          {bestReseller.map((item, index) => (
            <h1 key={index} className="text-3xl font-bold">
              {item.name}
            </h1>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
