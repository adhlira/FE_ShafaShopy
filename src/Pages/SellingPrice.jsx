import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [sellingprice, setSellingPrice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/sellingprice");
        setSellingPrice(response.data);
        setFilteredData(response.data)
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
        await axios.delete(`http://localhost:4000/sellingprice/${id}`);
        setSellingPrice(sellingprice.filter((item) => item.id !== id));
        alert("Data berhasil dihapus");
        window.location.reload();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredData(sellingprice);
    } else {
      const data = sellingprice.filter((item) => item.Product.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setFilteredData(data);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Data Selling Prices</h1>
        <input
          className="shadow appearance-none border rounded w-1/2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by product name . . ."
        />
        <Link to={"/sellingprice/add"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Add Data</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Product Name</th>
            <th className="border">Color</th>
            <th className="border">Price level 0</th>
            <th className="border">Price level 1</th>
            <th className="border">Price level 2</th>
            <th className="border">Price level 3</th>
            <th className="border">Price level 4</th>
            <th className="border">Price level 5</th>
            <th className="border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{item.Product?.name}</td>
              <td className="border">{item.Product?.Color?.name}</td>
              <td className="border">Rp. {item.price0}</td>
              <td className="border">Rp. {item.price1}</td>
              <td className="border">Rp. {item.price2}</td>
              <td className="border">Rp. {item.price3}</td>
              <td className="border">Rp. {item.price4}</td>
              <td className="border">Rp. {item.price5}</td>
              <td className="border">
                <Link to={`/sellingprice/edit/${item.id}`}>
                  <button className="border p-2 ml-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white">Edit</button>
                </Link>
                <Link>
                  <button className="border p-2 ml-2 rounded-lg bg-red-800 hover:bg-red-700 text-white" onClick={() => deleteData(item.id)}>
                    Delete
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
export default Products;
