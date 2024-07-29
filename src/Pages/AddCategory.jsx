import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const AddCategory = () => {
  const [data, setData] = useState({ name: "" });
  const [notification, setNotification] = useState("");

  const url = "http://localhost:4000/categories";
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: data.name,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Succesfully added data !");
      navigate("/categories");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message);
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Add Categories</h1>
        <Link to={"/categories"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit} action="">
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
            Category Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${notification ? "border-red-500" : ""}`}
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder="Input category name"
          />
        </div>
        {notification && <div className="mt-10 text-red-500">{notification}</div>}
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save
        </button>
      </form>
    </>
  );
};
export default AddCategory;
