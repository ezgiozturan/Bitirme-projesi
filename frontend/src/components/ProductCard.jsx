


import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-blue-700 font-semibold mt-2">{product.name}</h3>
      <p className="text-blue-500 font-semibold">{product.price.toFixed(2)} ₺</p>
      <p className="text-sm text-gray-500 mt-1">Kategori: {product.category}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductCard;
