import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const AddSellingPrice = () => {
  const [data, setData] = useState({ product_id: "", price0: "", price1: "", price2: "", price3: "", price4: "", price5: "" });
  const [product, setProduct] = useState([]);
  const [error, setError] = useState({});
  const [notification, setNotification] = useState("");

  const url = "http://localhost:4000/sellingprice";
  const navigate = useNavigate();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/newsellingprice");
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    FetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (!data[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setNotification("Error: Data incomplete!");
      return;
    }

    const userData = {
      product_id: +data.product_id,
      price0: +data.price0,
      price1: +data.price1,
      price2: +data.price2,
      price3: +data.price3,
      price4: +data.price4,
      price5: +data.price5,
    };
    try {
      const response = await axios.post(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/products");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message);
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  const getFieldClassName = (field) => {
    return error[field] ? "input-error" : "";
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Add Selling Price</h1>
        <Link to={"/app/sellingPrices"}>
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
                Product Name
              </label>
              <select className={`form-select px-10 py-2 border w-5/6 rounded-lg ${getFieldClassName("product_id") ? "border-red-500" : ""}`} name="product_id" value={data.product_id} onChange={handleChange}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {product.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.name} - {item.Color?.name}
                  </option>
                ))}
              </select>
              {error.product_id && <div className="error text-red-500 font-thin text-sm">{error.product_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price0">
                Price Level 0
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price0") ? "border-red-500" : ""}`}
                id="price0"
                type="text"
                name="price0"
                value={data.price0}
                onChange={handleChange}
                placeholder="Input Price Level 0"
              />
              {error.price0 && <div className="error text-red-500 font-thin text-sm">{error.price0}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price1">
                Price Level 1
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price1") ? "border-red-500" : ""}`}
                id="price1"
                type="text"
                name="price1"
                value={data.price1}
                onChange={handleChange}
                placeholder="Input Price Level 1"
              />
              {error.price1 && <div className="error text-red-500 font-thin text-sm">{error.price1}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price2">
                Price Level 2
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price2") ? "border-red-500" : ""}`}
                id="price2"
                type="text"
                name="price2"
                value={data.price2}
                onChange={handleChange}
                placeholder="Input Price Level 2"
              />
               {error.price2 && <div className="error text-red-500 font-thin text-sm">{error.price2}</div>}
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price3">
                Price Level 3
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price3") ? "border-red-500" : ""}`}
                id="price3"
                type="text"
                name="price3"
                value={data.price3}
                onChange={handleChange}
                placeholder="Input Price Level 3"
              />
               {error.price3 && <div className="error text-red-500 font-thin text-sm">{error.price3}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price4">
                Price Level 4
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price4") ? "border-red-500" : ""}`}
                id="price4"
                type="text"
                name="price4"
                value={data.price4}
                onChange={handleChange}
                placeholder="Input Price Level 4"
              />
              {error.price4 && <div className="error text-red-500 font-thin text-sm">{error.price4}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price5">
                Price Level 5
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price5") ? "border-red-500" : ""}`}
                id="price5"
                type="text"
                name="price5"
                value={data.price5}
                onChange={handleChange}
                placeholder="Input Price Level 5"
              />
              {error.price5 && <div className="error text-red-500 font-thin text-sm">{error.price5}</div>}
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
export default AddSellingPrice;
