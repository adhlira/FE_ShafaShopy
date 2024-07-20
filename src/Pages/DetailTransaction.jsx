import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";

const DetailTransaction = () => {
  const [detail, setDetail] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/transactions/${id}`);
        setDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Detail Data Transactions</h1>
        <Link to={"/transactions"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white"><FaArrowLeft/></button>
        </Link>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex-1 flex-col">
          <div className="grid grid-cols-3  gap-6 text-left">
            <span className="font-semibold ">Customer Name</span>
            <span className="">:</span>
            <span className="">{detail.Customer?.name}</span>

            <span className="font-semibold">Customer Status</span>
            <span>:</span>
            <span className="">{detail.Customer?.status}</span>

            <span className="font-semibold">Customer Level</span>
            <span>:</span>
            <span className="">{detail.Customer?.Level?.level}</span>

            <span className="font-semibold ">Product Name</span>
            <span className="">:</span>
            <span className="">{detail.Product?.name}</span>

            <span className="font-semibold ">Product Color</span>
            <span className="">:</span>
            <span className="">{detail.Product?.Color?.name}</span>
          </div>
        </div>
        <div className="flex-1 flex-col ml-3">
        <div className="grid grid-cols-3 gap-6 text-left">
            <span className="font-semibold">Price per Piece</span>
            <span>:</span>
            <span className="">{formatRupiah(detail.Detail_Transaction?.[0]?.price_per_piece)}</span>

            <span className="font-semibold">Purchase Amount</span>
            <span>:</span>
            <span className="">{detail.Detail_Transaction?.[0]?.jumlah_beli} Pcs</span>

            <span className="font-semibold">Total</span>
            <span>:</span>
            <span className="">{formatRupiah(detail.total)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailTransaction;
