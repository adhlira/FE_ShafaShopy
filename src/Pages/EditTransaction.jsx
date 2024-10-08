/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaCalculator, FaBox, FaUsers } from "react-icons/fa6";
import axios from "axios";
import Modal from "./ModalProduct.jsx";
import ModalCustomer from "./ModalCustomer.jsx";

const EditTransaction = () => {
  const [product, setProduct] = useState([]);
  const [isReseller, setIsReseller] = useState(false);
  const [customerID, setCustomerID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [levelCust, setLevelCust] = useState();
  const [customerType, setCustomerType] = useState("");
  const [productName, setProductName] = useState();
  const [productID, setProductID] = useState("");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [transactions, setTransactions] = useState({ product_id: "", customer_id: "", total: "", jumlah_beli: "", price_per_piece: "", subtotal: "", tanggal: "" });
  const [jumlah_beli, setJumlahBeli] = useState(0);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState({});
  const [stockError, setStockError] = useState(false);
  const { id } = useParams();

  const url = `http://localhost:4000/transactions/${id}`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/transactions/${id}`);
        setTransactions(response.data);
        setLevelCust(response.data.Customer.Level.level);
        setCustomerName(response.data.Customer.name);
        setProductName(response.data.Product.name);
        setProductID(response.data.product_id);
        setPrice(response.data.Detail_Transaction[0].price_per_piece);
        setTotal(response.data.total);
        setCustomerID(response.data.customer_id);
        setJumlahBeli(response.data.Detail_Transaction[0].jumlah_beli);
        if (response.data.Customer.Level.level == 0) {
          setCustomerType("Non Reseller");
          setIsReseller(false);
        } else {
          setCustomerType("Reseller");
          setIsReseller(true);
        }
        console.log("data by id : ", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  const handleRadioChange = (e) => {
    const selectedType = e.target.value;
    setCustomerType(selectedType);
    if (selectedType === "Non Reseller") {
      setCustomerName("Non Reseller");
      setCustomerID(1);
      setProductID("");
      setLevelCust(0);
      setProductName("");
      setPrice("");
      setJumlahBeli("");
      setTotal("");
      setIsReseller(false);
    } else {
      setCustomerID("");
      setProductID("");
      setCustomerName("");
      setLevelCust("");
      setProductName("");
      setPrice("");
      setJumlahBeli("");
      setTotal("");
      setIsReseller(true);
    }
  };

  const detailChange = (index, e) => {
    const detail = [...transactions.Detail_Transaction];
    detail[index] = {
      ...detail[index],
      [e.target.name]: e.target.value,
    };
    setTransactions({ ...transactions, Detail_Transaction: detail });
    if (e.target.name === "jumlah_beli") {
      setJumlahBeli(e.target.value);
    }

    if (e.target.name === "price_per_piece") {
      setPrice(e.target.value);
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
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
    setTransactions({ ...transactions, [e.target.name]: value });
  };

  const handleCustomerSelect = (itemCustomer) => {
    setCustomerID(itemCustomer.id);
    setCustomerName(itemCustomer.name);
    setLevelCust(itemCustomer.Level.level);
  };

  const handleProductSelect = (itemproduct) => {
    setProductName("");
    setPrice("");
    setJumlahBeli("");
    setTotal("");
    setProductID(itemproduct.id);
    const valueproduct = product.find((item) => item.id == itemproduct.id);
    if (levelCust == 1) {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price1);
    } else if (levelCust == 2) {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price2);
    } else if (levelCust == 3) {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price3);
    } else if (levelCust == 4) {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price4);
    } else if (levelCust == 5) {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price5);
    } else {
      setProductName(valueproduct.name);
      setPrice(valueproduct.SellingPrice[0].price0);
    }
  };

  const calculateTotal = () => {
    setTotal(jumlah_beli * price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-based month, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    const formData = {
      ...transactions,
      product_id: +productID,
      customer_id: +customerID,
      total: +total,
      jumlah_beli: +jumlah_beli,
      price_per_piece: +price,
      subtotal: +total,
    };

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      setNotification("Error: Data incomplete!");
      return;
    }

    const userData = {
      product_id: formData.product_id,
      customer_id: formData.customer_id,
      tanggal: new Date(transactions.tanggal),
      total: formData.total,
      jumlah_beli: formData.jumlah_beli,
      price_per_piece: formData.price_per_piece,
      subtotal: formData.total,
    };

    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil diubah !");
      navigate("/transactions");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification(error.response.data.message);
        if (error.response.data.message === "Insufficient product stock") {
          setStockError(true);
        }
      } else {
        setNotification("An error occurred on the server");
      }
      console.log(error);
    }
  };

  const getFieldClassName = (field) => {
    return error[field] ? "input-error" : "";
  };

  const errorStyle = {
    borderColor: "red",
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Transaction</h1>
        <Link to={"/app/transactions"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">
            <FaArrowLeft />
          </button>
        </Link>
      </div>
      <form className="w-full mx-auto p-6 rounded shadow-md mt-3" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex-1 flex-col">
            <div className="mb-8 mt-5">
              <label htmlFor="customer_type" className="block text-gray-700 md:text-sm text-base font-bold mb-2">
                Customer Type
              </label>
              <input className="form-radio" id="customer_type" type="radio" name="customer_type" value="Non Reseller" onChange={handleRadioChange} checked={customerType === "Non Reseller"} />
              <span className="ml-3 font-semibold text-base">Non Reseller</span>
              <input className="form-radio ml-5" id="customer_type" type="radio" name="customer_type" value="Reseller" onChange={handleRadioChange} checked={customerType === "Reseller"} />
              <span className="ml-3 font-semibold text-base">Reseller</span>
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Choose Customer
              </label>
              <button type="button" onClick={() => setShowModalCustomer(true)} className="bg-blue-500 text-white p-2 rounded-lg" disabled={!isReseller}>
                <FaUsers />
              </button>
              <ModalCustomer showModalCustomer={showModalCustomer} setShowModalCustomer={setShowModalCustomer} onCustomerSelect={handleCustomerSelect} />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Customer Name
              </label>
              <input type="number" hidden className="border" name="customer_id" value={customerID} />
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("customer_id") ? "border-red-500" : ""} cursor-not-allowed`}
                id="price_per_piece"
                type="text"
                name="price_per_piece"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                readOnly
              />
              {error.customer_id && <div className="error text-red-500 font-thin text-sm">{error.customer_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Customer Level
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("customer_id") ? "border-red-500" : ""} cursor-not-allowed`}
                id="customer_level"
                type="number"
                name="customer_level"
                value={levelCust}
                onChange={(e) => setLevelCust(e.target.value)}
                readOnly
              />
              {error.customer_id && <div className="error text-red-500 font-thin text-sm">{error.customer_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Choose Product
              </label>
              <button type="button" onClick={() => setShowModal(true)} className="bg-blue-500 text-white p-2 rounded-lg">
                <FaBox />
              </button>
              <Modal showModal={showModal} setShowModal={setShowModal} onProductSelect={handleProductSelect} />
            </div>
          </div>
          <div className="flex-1 flex-col">
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Product Name
              </label>
              <input type="number" hidden name="product_id" value={productID} />
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("product_id") ? "border-red-500" : ""}`}
                id="product_name"
                type="text"
                name="product_name"
                value={productName}
                readOnly
              />
              {error.product_id && <div className="error text-red-500 font-thin text-sm">{error.product_id}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("price_per_piece") ? "border-red-500" : ""} cursor-not-allowed`}
                id="price_per_piece"
                type="number"
                name="price_per_piece"
                value={price}
                readOnly
              />
              {error.price_per_piece && <div className="error text-red-500 font-thin text-sm">{error.price_per_piece}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="amount">
                Purchase Amount
              </label>
              <div className="flex">
                {transactions.Detail_Transaction?.map((detail, index) => (
                  <input
                    key={index}
                    className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("jumlah_beli") ? "border-red-500" : ""}`}
                    id="jumlah_beli"
                    type="number"
                    name="jumlah_beli"
                    value={jumlah_beli}
                    onChange={(e) => detailChange(index, e)}
                    placeholder="Input Purchase Amount"
                    style={stockError ? errorStyle : {}}
                  />
                ))}
                {error.jumlah_beli && <div className="error text-red-500 font-thin text-sm">{error.jumlah_beli}</div>}
                <button type="button" className="border bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2 ml-2" onClick={calculateTotal}>
                  <FaCalculator />
                </button>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
                Total
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("total") ? "border-red-500" : ""} cursor-not-allowed`}
                id="total"
                type="number"
                name="total"
                value={total}
                readOnly
              />
              {error.total && <div className="error text-red-500 font-thin text-sm">{error.total}</div>}
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
                Transaction Date
              </label>
              <input
                className={`shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${getFieldClassName("tanggal") ? "border-red-500" : ""}`}
                id="total"
                type="datetime-local"
                name="tanggal"
                value={formatDate(transactions?.tanggal)}
                onChange={handleChange}
              />
              {error.tanggal && <div className="error text-red-500 font-thin text-sm">{error.tanggal}</div>}
            </div>
          </div>
        </div>
        {notification && <div className="mt-10 text-red-500">{notification}</div>}
        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save Change
        </button>
      </form>
    </>
  );
};
export default EditTransaction;
