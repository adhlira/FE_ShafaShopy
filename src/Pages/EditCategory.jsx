import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const EditCategory = () => {
  const [category, setCategory] = useState({});
  const [notification, setNotification] = useState("");
  const { id } = useParams();
  const url = `http://localhost:4000/categories/${id}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory({ ...category, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: category.name,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data updated successfully");
      navigate("/categories");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message || "Category Name is Exist");
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Categories</h1>
        <Link to={"/app/categories"}>
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
            value={category?.name}
            onChange={handleChange}
            placeholder="Input Category Name"
          />
          {notification && <div className="mt-10 text-red-500">{notification}</div>}
        </div>
        <button type="submit" className="px-4 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save Change
        </button>
      </form>
    </>
  );
};
export default EditCategory;
