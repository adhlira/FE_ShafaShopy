import { useState, useEffect } from "react";
import ModalCustomer from "./ModalCustomer.jsx";
import Pagination from "../Components/Pagination.jsx";
import axios from "axios";

const ResellerReport = () => {
  const [data, setData] = useState([]);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [customerID, setCustomerID] = useState();
  const [customerName, setCustomerName] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allResellerReport");
        setData(response.data);
        setTotalPages(response.data.length)
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

  const totalAmount = data.reduce((sum, item) => sum + item.Detail_Transaction[0].jumlah_beli, 0);
  console.log(totalAmount);

  const handleCustomerSelect = (itemCustomer) => {
    setCustomerID(itemCustomer.id);
    setCustomerName(itemCustomer.name);
  };

  const DatabyName = () => {
    const filteredData = data.filter((item) => item.Customer.id == customerID);
    setData(filteredData);
    console.log(filteredData);
  };

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Reseller Report</h1>
      </div>
      <div className="flex justify-between gap-2 mt-5">
        <button onClick={() => setShowModalCustomer(true)} className="bg-blue-500 w-5/6 text-white p-2 rounded">
          Choose Reseller
        </button>
        <ModalCustomer showModalCustomer={showModalCustomer} setShowModalCustomer={setShowModalCustomer} onCustomerSelect={handleCustomerSelect} />
        <input type="number" hidden className="border" name="customer_id" value={customerID} />
        <input
          className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price_per_piece"
          type="text"
          name="price_per_piece"
          value={customerName}
          placeholder="Reseller name"
          readOnly
        />
        <button onClick={DatabyName} className="bg-blue-500 rounded-lg p-2 text-white">Filter</button>
      </div>
      <table className="border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Transaction Date</th>
            <th className="border">Name</th>
            <th className="border">Level</th>
            <th className="border">Purchase Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{indexOfFirstPost + index + 1}</td>
              <td className="border">{formatDate(item.tanggal)}</td>
              <td className="border">{item.Customer.name}</td>
              <td className="border">{item.Customer.Level.level}</td>
              <td className="border">{item.Detail_Transaction[0].jumlah_beli} Pcs</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td colSpan={4} className="border text-center">
              Total Purchase Amount
            </td>
            <td className="text-center">{totalAmount} Pcs</td>
          </tr>
        </tbody>
      </table>
      <div className="text-center mt-10">
        <Pagination totalPosts={totalPages} postsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  );
};
export default ResellerReport;
