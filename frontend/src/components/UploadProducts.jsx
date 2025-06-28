import React from "react";
import { products } from "../data/products"; 
import axios from "axios";

const uploadProducts = async () => {
  try {
    await axios.post("http://localhost:8080/api/products/import", products);
    console.log("Ürünler başarıyla gönderildi.");
  } catch (err) {
    console.error("Gönderim hatası:", err);
  }
};

const UploadProducts = () => {
  return (
    <div className="p-10">
      <button
        onClick={uploadProducts}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Ürünleri Backend'e Yükle
      </button>
    </div>
  );
};

export default UploadProducts;
