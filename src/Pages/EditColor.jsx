import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const EditColor = () => {
  const [color, setColor] = useState();
  const [notification, setNotification] = useState("");
  const { id } = useParams();
  const url = `http://localhost:4000/colors/${id}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setColor({ ...color, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setColor(response.data);
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
      name: color.name,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil diperbarui !");
      navigate("/colors");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message || "Color Name is Exist");
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Colors</h1>
        <Link to={"/app/colors"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <form className="w-full max-w-lg mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit} action="">
        <div className="mb-4 mt-5">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
            Color Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${notification ? "border-red-500" : ""}`}
            id="name"
            type="text"
            name="name"
            value={color?.name}
            onChange={handleChange}
            placeholder="Input color name"
          />
        </div>
        {notification && <div className="mt-10 text-red-500">{notification}</div>}
        <button type="submit" className="px-4 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save Change
        </button>
      </form>
    </>
  );
};
export default EditColor;
