/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Pagination from "../Components/Pagination";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";

const MonthlyReport = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/transactions");
        setData(response.data);
        setTotalPages(response.data.length);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format tanggal saja
  };

  const setToStartOfDay = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  const DatabyDate = () => {
    if (startDate || endDate) {
      const filteredData = data.filter(item => {
        const itemDate = setToStartOfDay(new Date(item.tanggal));
        const start = setToStartOfDay(new Date(startDate));
        const end = setToStartOfDay(new Date(endDate));
        return (!start || itemDate >= start) && (!end || itemDate <= end)
      });
      setData(filteredData);
      console.log(filteredData);
    }
  };

  const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
  console.log(totalAmount);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  return (
    <>
      <div className="justify-between">
        <h1 className="text-2xl">Monthly Report</h1>
      </div>
      <div className="justify-between">
        <div className="flex justify-between mt-6">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="total"
            type="datetime-local"
            name="tanggal"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
          />
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="total"
            type="datetime-local"
            name="tanggal"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
          />
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white" onClick={DatabyDate}>
            <FaFilter/>
          </button>
        </div>
      </div>

      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Transaction Date</th>
            <th className="border">Product Name</th>
            <th className="border">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{indexOfFirstPost + index + 1}</td>
              <td className="border">{formatDate(item.tanggal)}</td>
              <td className="border">{item.Product?.name}</td>
              <td className="border">{formatRupiah(item.total)}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td colSpan={3} className="border text-center">
              Total
            </td>
            <td className="text-center">{formatRupiah(totalAmount)}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-10">
        <Pagination totalPosts={totalPages} postsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  );
};
export default MonthlyReport;
