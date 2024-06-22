import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailSellingPrice = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/${id}`);
        setProduct(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, {});

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl">Detail Selling Price Product</h1>
        <Link to={`/products/${product.id}`}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Kembali</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">Product Name</th>
            <th className="border">Selling Price Level 0</th>
            <th className="border">Selling Price Level 1</th>
            <th className="border">Selling Price Level 2</th>
            <th className="border">Selling Price Level 3</th>
            <th className="border">Selling Price Level 4</th>
            <th className="border">Selling Price Level 5</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border text-center">
            <td className="border">{product.name}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price0}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price1}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price2}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price3}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price4}</td>
            <td className="border">Rp. {product.SellingPrice?.[0]?.price5}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default DetailSellingPrice;
