import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const AddCustomer = () => {
  const [data, setData] = useState({ name: "", address: "", telp: "", level_id: "", status: "" });
  const [level, setLevel] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [statuscustomer, setStatusCustomer] = useState("");
  const [error, setError] = useState({});
  const [notification, setNotification] = useState("");
  const [telpError, setTelpError] = useState(false);

  const url = "http://localhost:4000/customers";
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedOption(value);
    if (value === 1) {
      setStatusCustomer("Non Reseller");
    } else {
      setStatusCustomer("Reseller");
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
    const newErrors = {};

    const formData = {
      ...data,
      level_id: selectedOption,
      status: statuscustomer,
    };

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setNotification("Error: Data incomplete!");
      return;
    }

    const userData = {
      name: formData.name,
      address: formData.address,
      telp: formData.telp,
      level_id: formData.level_id,
      status: formData.status,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/customers");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message);
        if (error.response.data.message === "The telephone number is registered") {
          setTelpError(true);
        }
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  const getFieldClassName = (field) => {
    return error[field] ? "input-error" : "";
  };

  // Style untuk input telp yang error
  const errorStyle = {
    borderColor: "red",
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Add Customer</h1>
        <Link to={"/customers"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <form className="w-full mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Customer Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("name") ? "border-red-500" : ""}`}
                id="name"
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Input customer name"
              />
              {error.name && <div className="error text-red-500 font-thin text-sm">{error.name}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Input address"
                className={`shadow border rounded w-5/6 py-10 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${getFieldClassName("address") ? "border-red-500" : ""}`}
              ></textarea>
              {error.address && <div className="error text-red-500 font-thin text-sm">{error.address}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="telp">
                Telp
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("telp") ? "border-red-500" : ""}`}
                id="telp"
                type="text"
                name="telp"
                value={data.telp}
                onChange={handleChange}
                style={telpError ? errorStyle : {}}
                placeholder="Input customer telp"
              />
              {error.telp && <div className="error text-red-500 font-thin text-sm">{error.telp}</div>}
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="level_id">
                Customer Level
              </label>
              <select className={`form-select px-10 py-2 border w-5/6 rounded-lg ${getFieldClassName("level_id") ? "border-red-500" : ""}`} name="level_id" value={selectedOption} onChange={handleSelectChange}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {level.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.level}
                  </option>
                ))}
              </select>
              {error.level_id && <div className="error text-red-500 font-thin text-sm">{error.level_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="status">
                Customer Status
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("status") ? "border-red-500" : ""}`}
                id="status"
                type="text"
                name="status"
                value={statuscustomer}
                readOnly
                placeholder="Input customer status"
              />
              {error.status && <div className="error text-red-500 font-thin text-sm">{error.status}</div>}
            </div>
          </div>
        </div>
        {notification && <div className="mt-10 text-red-500">{notification}</div>}
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save
        </button>
      </form>
    </>
  );
};
export default AddCustomer;
