import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";

const Colors = () => {
  const [color, setColor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/colors");
        setColor(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const deleteData = async (id) => {
    const check = confirm("Anda yakin ingin menghapus data ini ? ");
    if (check == true) {
      try {
        await axios.delete(`http://localhost:4000/colors/${id}`);
        setColor(color.filter((item) => item.id !== id));
        alert("Data berhasil dihapus");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Colors</h1>
        <Link to={"/colors/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white"><FaPlus/></button>
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
          {color.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{item.name}</td>
              <td className="border">
                <Link to={`/colors/edit/${item.id}`}>
                  <button className="border p-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white"><FaPenToSquare/></button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white" onClick={() => deleteData(item.id)}>
                    <FaTrash/>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Colors;
