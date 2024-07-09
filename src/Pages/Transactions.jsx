import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import axios from "axios";

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/transactions/`);
        setTransaction(response.data);
        setTotalPages(response.data.length);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [currentPage]);

  // Fungsi untuk memformat tanggal
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format tanggal saja
  };

  const deleteData = async (id) => {
    const check = confirm("Anda yakin ingin menghapus data ini ? ");
    if (check == true) {
      try {
        await axios.delete(`http://localhost:4000/transactions/${id}`);
        setTransaction(transaction.filter((item) => item.id !== id));
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
  const currentPosts = transaction.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts)

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Transactions</h1>
        <Link to={"/transactions/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Add Data</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Product Name</th>
            <th className="border">Date</th>
            <th className="border">Purchase Amount</th>
            <th className="border">Total</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{indexOfFirstPost + index + 1}</td>
              <td className="border">{item.Product?.name}</td>
              <td className="border">{formatDate(item.tanggal)}</td>
              <td className="border">{item.Detail_Transaction?.[0]?.jumlah_beli}</td>
              <td className="border">Rp. {item.total}</td>
              <td className="border">
                <Link to={`/transactions/detail/${item.id}`}>
                  <button className="border p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white">Detail</button>
                </Link>
                <Link to={`/transactions/edit/${item.id}`}>
                  <button className="border p-2 ml-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white">Edit</button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white" onClick={() => deleteData(item.id)}>
                    Hapus
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
export default Transaction;
