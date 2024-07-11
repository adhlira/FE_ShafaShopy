/* eslint-disable react/prop-types */
// Modal.js
import { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ showModalCustomer, setShowModalCustomer, onCustomerSelect }) => {
  const [allcutomers, setALLCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/customers");
        setALLCustomers(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleCustomerClik = (customer) => {
    onCustomerSelect(customer);
    setShowModalCustomer(false);
    console.log(customer);
  };

  const filteredCustomers = allcutomers.filter((customer) => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!showModalCustomer) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 w-1/2">
        <button onClick={() => setShowModalCustomer(false)} className="text-black float-right">
          &times;
        </button>
        <h2 className="text-xl mb-4">Customer List</h2>
        <input type="text" placeholder="Search customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border p-2 w-full mb-4" />
        <ul>
          {filteredCustomers.map((customer) => (
            <li key={customer.id} className="p-2 border-b cursor-pointer bg-gray-200 hover:bg-gray-100" onClick={() => handleCustomerClik(customer)} value={customer.id}>
              {customer.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
