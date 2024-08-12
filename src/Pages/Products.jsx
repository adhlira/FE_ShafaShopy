import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa6";
import axios from "axios";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProduct(response.data);
        setFilteredData(response.data);
        setTotalPages(response.data.length)
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredData(product);
    } else {
      const data = product.filter((item) => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredData(data);
    }
  };

  const deleteData = async (id) => {
    const check = confirm("Anda yakin ingin menghapus data ini ? ");
    if (check == true) {
      try {
        await axios.delete(`http://localhost:4000/products/${id}`);
        setProduct(product.filter((item) => item.id !== id));
        alert("Data berhasil dihapus");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = product.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Products</h1>
        <input
          className="shadow appearance-none border rounded w-1/2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search product by product name . . ."
        />
        <Link to={"/app/products/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white"><FaPlus/></button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Name</th>
            <th className="border">Color</th>
            <th className="border">Stock</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{item.name}</td>
              <td className="border">{item.Color?.name}</td>
              <td className="border">{item.stock}</td>
              <td className="border">
                <Link to={`/app/products/${item.id}`}>
                  <button className="border p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white"><FaInfo/></button>
                </Link>
                <Link to={`/app/products/edit/${item.id}`}>
                  <button className="border p-2 ml-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white"><FaPenToSquare/></button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white" onClick={() => deleteData(item.id)}>
                    <FaTrash/>
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
export default Products;
