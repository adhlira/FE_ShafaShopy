import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [data, setData] = useState({ name: "", address: "", telp: "", level: "", status: "" });

  const url = "http://localhost:4000/customers";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      address: data.address,
      telp: data.telp,
      level: +data.level,
      status: data.status,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Add Customer</h1>
        <Link to={"/customers"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Kembali</button>
        </Link>
      </div>
      <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit} action="">
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
            Customer Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Input customer name"
          />
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea name="address" value={data.address} onChange={handleChange} placeholder="Input address" className="shadow border rounded w-full py-10 px-3 text-gray-700 focus:outline-none focus:shadow-outline"></textarea>
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="telp">
            Telp
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telp"
            type="text"
            name="telp"
            value={data.telp}
            onChange={handleChange}
            placeholder="Input customer telp"
          />
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="level">
            Level
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="level"
            type="text"
            name="level"
            value={data.level}
            onChange={handleChange}
            placeholder="Input customer level"
          />
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="status">
            Status Customer
          </label>
          <input className="form-radio" id="status" type="radio" name="status" value="Reseller" checked={data.status === "Reseller"} onChange={handleChange} />
          <label htmlFor="reseller" className="font-semibold md:font-medium ml-3">
            Reseller
          </label>
          <input className="form-radio ml-5" id="status" type="radio" name="status" value="Non Reseller" checked={data.status === "Non Reseller"} onChange={handleChange} />
          <label htmlFor="perempuan" className="font-semibold md:font-medium ml-3">
            Non Reseller
          </label>
        </div>
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Simpan
        </button>
      </form>
    </>
  );
};
export default AddCustomer;
