import { useState, useEffect } from "react";
import axios from "axios";

const MonthlyReport = () => {
  const [data, setData] = useState([]);

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

  const totalAmount = data.reduce((sum, item) => sum + item.total, 0)
  console.log(totalAmount)
  

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString(); // Format tanggal saja
  };

  return (
    <>
      <div className="justify-between">
        <h1 className="text-2xl">Monthly Report</h1>
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
