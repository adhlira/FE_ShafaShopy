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
  const [customerID, setCustomerID] = useState();
  const [customerName, setCustomerName] = useState();
  const [levelCust, setLevelCust] = useState();
  const [customerType, setCustomerType] = useState("");
  const [productName, setProductName] = useState();
  const [productID, setProductID] = useState();
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [transactions, setTransactions] = useState({});
  const [jumlah_beli, setJumlahBeli] = useState();
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
    console.log("selectedtype", selectedType);
    setCustomerType(selectedType);
    if (selectedType === "Non Reseller") {
      setCustomerName("Non Reseller");
      setCustomerID(1);
      setLevelCust(0);
      setProductName("");
      setPrice("");
      setJumlahBeli("");
      setTotal("");
      setIsReseller(false);
    } else {
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
    setJumlahBeli(detail[0].jumlah_beli);
    setPrice(detail[0].price_per_piece);
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
    setProductName(itemproduct.name);
    setProductID(itemproduct.id);
    const valueproduct = product.find((item) => item.id == itemproduct.id);
    console.log("value product", valueproduct);
    console.log("level cust", levelCust);
    if (levelCust == 1) {
      setPrice(valueproduct.SellingPrice[0].price1);
    } else if (levelCust == 2) {
      setPrice(valueproduct.SellingPrice[0].price2);
    } else if (levelCust == 3) {
      setPrice(valueproduct.SellingPrice[0].price3);
    } else if (levelCust == 4) {
      setPrice(valueproduct.SellingPrice[0].price4);
    } else if (levelCust == 5) {
      setPrice(valueproduct.SellingPrice[0].price5);
    } else {
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
    const userData = {
      product_id: productID,
      customer_id: customerID,
      tanggal: new Date(transactions.tanggal),
      total: +total,
      jumlah_beli: +jumlah_beli,
      price_per_piece: +price,
      subtotal: +total,
    };
    try {
      const response = await axios.put(url, userData);
      console.log(response);
      alert("Data Berhasil ditambahkan !");
      navigate("/transactions");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Edit Transaction</h1>
        <Link to={"/transactions"}>
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
                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price_per_piece"
                type="text"
                name="price_per_piece"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                readOnly
              />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Customer Level
              </label>
              <input
                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="customer_level"
                type="number"
                name="customer_level"
                value={levelCust}
                onChange={(e) => setLevelCust(e.target.value)}
                readOnly
              />
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
              <input className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product_name" type="text" name="product_name" value={productName} readOnly />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="price">
                Price
              </label>
              <input className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price_per_piece" type="number" name="price_per_piece" value={price} readOnly />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="amount">
                Purchase Amount
              </label>
              <div className="flex">
                {transactions.Detail_Transaction?.map((detail, index) => (
                  <input
                    key={index}
                    className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="jumlah_beli"
                    type="number"
                    name="jumlah_beli"
                    value={jumlah_beli}
                    onChange={(e) => detailChange(index, e)}
                    placeholder="Input Purchase Amount"
                  />
                ))}
                <button type="button" className="border bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-2 ml-2" onClick={calculateTotal}>
                  <FaCalculator />
                </button>
              </div>
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
                Total
              </label>
              <input className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="total" type="number" name="total" value={total} readOnly />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
                Transaction Date
              </label>
              <input
                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="total"
                type="datetime-local"
                name="tanggal"
                value={formatDate(transactions?.tanggal)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save Change
        </button>
      </form>
    </>
  );
};
export default EditTransaction;
