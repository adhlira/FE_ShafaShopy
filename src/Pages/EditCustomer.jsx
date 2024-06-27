import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EditCustomer = () => {
  const [customer, setCustomer] = useState({ name: "", address: "", telp: "", level_id: "", status: "" });
  const [level, setLevel] = useState([]);

  const { id } = useParams();

  const url = `http://localhost:4000/customers/${id}`;
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const newLevel = parseInt(event.target.value, 10);
    const newStatus = newLevel === 1 ? "Non Reseller" : "Reseller";

    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      status: newStatus,
      level_id: newLevel,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const customerData = response.data;
        setCustomer({ name: customerData.name, address: customerData.address, telp: customerData.telp, status: customerData.level_id === 1 ? "Non Reseller" : "Reseller", level_id: customerData.level_id });
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/levels");
        setLevel(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCustomer({ ...customer, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: customer.name,
      address: customer.address,
      telp: customer.telp,
      level_id: customer.level_id,
      status: customer.status,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil diubah !");
      navigate("/customers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Customer</h1>
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
            value={customer.name}
            onChange={handleChange}
            placeholder="Input customer name"
          />
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea name="address" value={customer.address} onChange={handleChange} placeholder="Input address" className="shadow border rounded w-full py-10 px-3 text-gray-700 focus:outline-none focus:shadow-outline"></textarea>
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
            value={customer.telp}
            onChange={handleChange}
            placeholder="Input customer telp"
          />
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="level_id">
            Customer Level
          </label>
          <select className="form-select px-10 py-2 border w-full rounded-lg" name="level_id" value={customer.level_id} onChange={handleSelectChange}>
            <option className="text-center md:text-base text-xs" value="">
              Choose
            </option>
            {level.map((item) => (
              <option className="md:text-base text-xs" key={item.id} value={item.id}>
                {item.level}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="status">
            Customer Status
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            type="text"
            name="status"
            value={customer.status}
            readOnly
            placeholder="Input customer status"
          />
        </div>
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Simpan
        </button>
      </form>
    </>
  );
};
export default EditCustomer;
