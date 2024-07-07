/* eslint-disable react/prop-types */
// Modal.js
import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ showModal, setShowModal, onProductSelect }) => {
  const [allproducts, setALLProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setALLProducts(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleProductClik = (product) => {
    onProductSelect(product);
    setShowModal(false)
    console.log(product);
  };

  const filteredProducts = allproducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-1/2">
        <button onClick={() => setShowModal(false)} className="text-black float-right">
          &times;
        </button>
        <h2 className="text-xl mb-4">Product List</h2>
        <input type="text" placeholder="Search product..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 w-full mb-4" />
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id} className="p-2 border-b cursor-pointer bg-gray-200 hover:bg-gray-100" onClick={() => handleProductClik(product)} value={product.id}>
              {product.name} - {product.Color?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
