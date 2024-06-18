import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Categories</h1>
        <Link to={"/categories/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Add Data</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Name</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{item.name}</td>
              <td className="border">
                <Link>
                  <button className="border p-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white">Edit</button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white">Hapus</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Category;
