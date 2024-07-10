import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [data, setData] = useState({ name: "", address: "", telp: "", level_id: "", status: "" });
  const [level, setLevel] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0)
  const [statuscustomer, setStatusCustomer] = useState("")

  const url = "http://localhost:4000/customers";
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedOption(value);
    if (value === 1) {
      setStatusCustomer('Non Reseller');
    } else {
      setStatusCustomer('Reseller');
    }
  };

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
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
      address: data.address,
      telp: data.telp,
      level_id: selectedOption,
      status: statuscustomer,
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
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Back</button>
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
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="level_id">
            Customer Level
          </label>
          <select className="form-select px-10 py-2 border w-full rounded-lg" name="level_id" value={selectedOption} onChange={handleSelectChange}>
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
            value={statuscustomer}
            readOnly
            placeholder="Input customer status"
          />
        </div>
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save
        </button>
      </form>
    </>
  );
};
export default AddCustomer;
