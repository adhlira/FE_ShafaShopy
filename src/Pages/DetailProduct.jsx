import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
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
        <h1 className="text-2xl">Detail Product</h1>
        <Link to={"/products"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white">Kembali</button>
        </Link>
      </div>
      <table className="table border w-full mt-5">
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">Category</th>
            <th className="border">Color</th>
            <th className="border">Purchase Price</th>
            <th className="border">Stock</th>
            <th className="border">Description</th>
            <th className="border">Selling Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border text-center">
            <td className="border">{product.name}</td>
            <td className="border">{product.Category?.name}</td>
            <td className="border">{product.Color?.name}</td>
            <td className="border">Rp. {product.purchase_price}</td>
            <td className="border">{product.stock} pcs</td>
            <td className="border">{product.description}</td>
            <td>
              <Link to={`../sellingPrice/product/${product.id}`}>
                <button className="border rounded-lg p-2 bg-blue-600 hover:bg-blue-500 text-white">Lihat</button>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
export default DetailProduct;
