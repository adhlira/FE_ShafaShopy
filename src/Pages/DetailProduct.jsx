import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
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
        <h1 className="text-2xl">Detail Product</h1>
        <Link to={"/products"}>
          <button className="border rounded-lg p-2 bg-green-800 hover:bg-green-700 text-white"><FaArrowLeft/></button>
        </Link>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex-1 flex-col">
          <div className="grid grid-cols-3 gap-6">
            <span className="font-semibold">Product Category</span>
            <span>:</span>
            <span>{product.Category?.name}</span>

            <span className="font-semibold">Product Name</span>
            <span>:</span>
            <span>{product.name}</span>

            <span className="font-semibold">Color</span>
            <span>:</span>
            <span>{product.Color?.name}</span>

            <span className="font-semibold">Stock</span>
            <span>:</span>
            <span>{product.stock} Pcs</span>

            <span className="font-semibold">Description</span>
            <span>:</span>
            <span>{product.description}</span>

            <span className="font-semibold">Purchase Price</span>
            <span>:</span>
            <span>{formatRupiah(product.purchase_price)}</span>
          </div>
        </div>
        <div className="flex-1 flex-col ml-5">
          <div className="grid grid-cols-3 gap-6 text-left">
            <span className="font-semibold">Price Level 0</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price0)}</span>

            <span className="font-semibold">Price Level 1</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price1)}</span>

            <span className="font-semibold">Price Level 2</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price2)}</span>

            <span className="font-semibold">Price Level 3</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price3)}</span>

            <span className="font-semibold">Price Level 4</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price4)}</span>

            <span className="font-semibold">Price Level 5</span>
            <span>:</span>
            <span>{formatRupiah(product.SellingPrice?.[0]?.price5)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailProduct;
