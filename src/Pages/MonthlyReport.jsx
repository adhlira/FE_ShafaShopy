import { useState, useEffect } from "react";
import axios from "axios";

const MonthlyReport = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/transactions");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const DatabyDate = () => {
    console.log(data);
    if (startDate || endDate) {
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.tanggal);
        const start = startDate ? new Date(startDate) : new Date("1970-01-01");
        const end = endDate ? new Date(endDate) : new Date("9999-12-31");
        return itemDate >= start && itemDate <= end;
      });
      setData(filteredData);
      console.log(filteredData)
    }
  };

  const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
  console.log(totalAmount);

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format tanggal saja
  };

  return (
    <>
      <div className="justify-between">
        <h1 className="text-2xl">Monthly Report</h1>
      </div>
      <div className="justify-between">
        <div className="flex justify-between mt-6">
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="total"
            type="datetime-local"
            name="tanggal"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label className="block text-gray-700 md:text-sm text-base font-bold mb-2" htmlFor="total">
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="total"
            type="datetime-local"
            name="tanggal"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white" onClick={DatabyDate}>
            Filter
          </button>
        </div>
      </div>

      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">No</th>
            <th className="border">Transaction Date</th>
            <th className="border">Product Name</th>
            <th className="border">Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border">{index + 1}</td>
              <td className="border">{formatDate(item.tanggal)}</td>
              <td className="border">{item.Product?.name}</td>
              <td className="border">Rp. {item.total}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td colSpan={3} className="border text-center">
              Total
            </td>
            <td className="text-center">Rp. {totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default MonthlyReport;
