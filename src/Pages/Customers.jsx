import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import axios from "axios";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/customers");
        setCustomer(response.data);
        setFilteredData(response.data);
        setTotalPages(response.data.length)
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const deleteData = async (id) => {
    const check = confirm("Anda yakin ingin menghapus data ini ? ");
    if (check == true) {
      try {
        await axios.delete(`http://localhost:4000/customers/${id}`);
        setCustomer(customer.filter((item) => item.id !== id));
        alert("Data berhasil dihapus");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredData(customer);
    } else {
      const data = customer.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredData(data);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = customer.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Customers</h1>
        <input
          className="shadow appearance-none border rounded w-1/2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by customer name . . ."
        />
        <Link to={"/customers/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Add Data</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Name</th>
            <th className="border">Address</th>
            <th className="border">Telp</th>
            <th className="border">Status</th>
            <th className="border">Level</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{item.name}</td>
              <td className="border">{item.address}</td>
              <td className="border">{item.telp}</td>
              <td className="border">{item.status}</td>
              <td className="border">{item.Level?.level}</td>
              <td className="border">
                <Link to={`/customers/edit/${item.id}`}>
                  <button className="border p-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white">Edit</button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white" onClick={() => deleteData(item.id)}>
                    Delete
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-10">
        <Pagination totalPosts={totalPages} postsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </>
  );
};
export default Customer;
