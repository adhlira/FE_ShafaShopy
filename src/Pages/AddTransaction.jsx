import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AddTransaction = () => {
  const [data, setData] = useState({ product_id: "", customer_id: "", tanggal: "", total: "", jumlah_beli: "", subtotal: "" });
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);

  const url = "http://localhost:4000/transactions";
  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    FetchData();
  }, []);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/customers");
        setCustomer(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    FetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      product_id: +data.product_id,
      customer_id: +data.customer_id,
      tanggal: new Date(data.tanggal),
      total: data.total,
      jumlah_beli: +data.jumlah_beli,
      subtotal: +data.subtotal,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Add Transaction</h1>
        <Link to={"/transactions"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Back</button>
        </Link>
      </div>
      <form className="w-full  mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex">
            <div className="mb-4 mt-5">
              <label htmlFor="customer_type" className="block text-gray-700 md:text-sm text-base font-bold mb-2">
                Customer
              </label>
              <input className="form-radio" id="customer_type" type="radio" name="customer_type" value="Non Reseller" />
              <span className="ml-3 font-semibold text-base">Non Reseller</span>
              <input className="form-radio ml-5" id="customer_type" type="radio" name="customer_type" value="Reseller" />
              <span className="ml-3 font-semibold text-base">Reseller</span>
            </div>
          </div>
          <div className="flex">
            <p>Bagian dua</p>
          </div>
        </div>
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save
        </button>
      </form>
    </>
  );
};
export default AddTransaction;
