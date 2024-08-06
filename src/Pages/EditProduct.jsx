import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const EditProduct = () => {
  const [product, setProduct] = useState({ category_id: "", color_id: "", name: "", description: "", purchase_price: "", stock: "" });
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [error, setError] = useState({});
  const [notification, setNotification] = useState("");
  const { id } = useParams();
  const url = `http://localhost:4000/products/${id}`;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
        setCategory(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/colors");
        setColor(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    Object.keys(product).forEach((key) => {
      if (!product[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setNotification("Error: Data incomplete!");
      return;
    }

    const userData = {
      category_id: +product.category_id,
      color_id: +product.color_id,
      name: product.name,
      description: product.description,
      purchase_price: +product.purchase_price,
      stock: +product.stock,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil diperbarui !");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const getFieldClassName = (field) => {
    return error[field] ? "input-error" : "";
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Product</h1>
        <Link to={"/products"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <form className="w-full mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit} action="">
        <div className="flex justify-between">
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Category Name
              </label>
              <select className={`form-select px-10 py-2 border w-5/6 rounded-lg ${getFieldClassName("category_id") ? "border-red-500" : ""}`} name="category_id" value={product?.category_id} onChange={handleChange}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {category.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {error.category_id && <div className="error text-red-500 font-thin text-sm">{error.category_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Color
              </label>
              <select className={`form-select px-10 py-2 border w-5/6 rounded-lg ${getFieldClassName("color_id") ? "border-red-500" : ""}`} name="color_id" value={product?.color_id} onChange={handleChange}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {color.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              {error.color_id && <div className="error text-red-500 font-thin text-sm">{error.color_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("name") ? "border-red-500" : ""}`}
                id="name"
                type="text"
                name="name"
                value={product?.name}
                onChange={handleChange}
                placeholder="Input product name"
              />
              {error.name && <div className="error text-red-500 font-thin text-sm">{error.name}</div>}
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="purchase_price">
                Purchase Price
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("purchase_price") ? "border-red-500" : ""}`}
                id="purchase_price"
                type="text"
                name="purchase_price"
                value={product?.purchase_price}
                onChange={handleChange}
                placeholder="Input purchase price"
              />
              {error.purchase_price && <div className="error text-red-500 font-thin text-sm">{error.purchase_price}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("stock") ? "border-red-500" : ""}`}
                id="stock"
                type="text"
                name="stock"
                value={product?.stock}
                onChange={handleChange}
                placeholder="Input Stock"
              />
              {error.stock && <div className="error text-red-500 font-thin text-sm">{error.stock}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                name="description"
                value={product?.description}
                onChange={handleChange}
                placeholder="Input description"
                className={`shadow border rounded w-5/6 py-10 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${getFieldClassName("description") ? "border-red-500" : ""}`}
              ></textarea>
              {error.description && <div className="error text-red-500 font-thin text-sm">{error.description}</div>}
            </div>
          </div>
        </div>
        {notification && <div className="mt-10 text-red-500">{notification}</div>}
        <button type="submit" className="px-4 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save Change
        </button>
      </form>
    </>
  );
};
export default EditProduct;
