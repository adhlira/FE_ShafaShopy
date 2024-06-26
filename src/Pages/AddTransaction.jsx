import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AddTransaction = () => {
  const [data, setData] = useState({ product_id: "", customer_id: "", tanggal: "", total: "", jumlah_beli: "", price_per_piece: "" });
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [isReseller, setIsReseller] = useState(false);
  const [selectValue, setSelectValue] = useState();
  const [levelCust, setLevelCust] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();

  const url = "http://localhost:4000/transactions";
  const navigate = useNavigate();

  const handleRadioChange = (e) => {
    setIsReseller(e.target.value === "Reseller");
    if (e.target.value === "Non Reseller") {
      setSelectValue(1);
      setLevelCust(0);
    }
  };

  const handleSelectCustomerChange = (e) => {
    setSelectValue(e.target.value);
    const selectedCustomer = customer.find((item) => item.id == e.target.value);
    setLevelCust(selectedCustomer.Level.level);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    const valueproduct = product.find((item) => item.id == e.target.value);
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

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/customers");
        setCustomer(response.data);
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

  const calculateTotal = () => {
    setTotal(data.jumlah_beli * price);
  };

  const handleKeypress = (e) => {
    if (e.key == "Enter") {
      calculateTotal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      product_id: +selectedProduct,
      customer_id: +selectValue,
      tanggal: new Date(data.tanggal),
      total: +total,
      jumlah_beli: +data.jumlah_beli,
      price_per_piece: +price,
      subtotal: +total,
    };
    try {
      const response = await axios.post(url, userData);
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
        <h1 className="text-2xl">Add Transaction</h1>
        <Link to={"/transactions"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Back</button>
        </Link>
      </div>
      <form className="w-full mx-auto p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="flex-1 flex-col">
            <div className="mb-8 mt-5">
              <label htmlFor="customer_type" className="block text-gray-700 md:text-sm text-base font-bold mb-2">
                Customer
              </label>
              <input className="form-radio" id="customer_type" type="radio" name="customer_type" value="Non Reseller" onChange={handleRadioChange} />
              <span className="ml-3 font-semibold text-base">Non Reseller</span>
              <input className="form-radio ml-5" id="customer_type" type="radio" name="customer_type" value="Reseller" onChange={handleRadioChange} />
              <span className="ml-3 font-semibold text-base">Reseller</span>
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Customer Name
              </label>
              <select className="form-select px-10 py-2 border w-5/6 rounded-lg" name="customer_id" value={selectValue} onChange={handleSelectCustomerChange} disabled={!isReseller}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {customer.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                readOnly
              />
            </div>
            <div className="mb-4 mt-5">
              <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="name">
                Product Name
              </label>
              <select className="form-select px-10 py-2 border w-5/6 rounded-lg" name="product_id" value={selectedProduct} onChange={handleProductChange}>
                <option className="text-center md:text-base text-xs" value="">
                  Choose
                </option>
                {product.map((item) => (
                  <option className="md:text-base text-xs" key={item.id} value={item.id}>
                    {item.name} - {item.Color.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex-1 flex-col">
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
              <input
                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="jumlah_beli"
                type="number"
                name="jumlah_beli"
                value={data.jumlah_beli}
                onChange={handleChange}
                placeholder="Input Purchase Amount"
                onKeyPress={handleKeypress}
              />
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
              <input className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="total" type="datetime-local" name="tanggal" value={data.tanggal} onChange={handleChange} />
            </div>
          </div>
        </div>

        <button type="submit" className="px-10 py-2 border bg-blue-600 text-white hover:bg-blue-500 rounded mt-10 focus:outline-none focus:shadow-outline">
          Save
        </button>
      </form>
    </>
  );
};
export default AddTransaction;
