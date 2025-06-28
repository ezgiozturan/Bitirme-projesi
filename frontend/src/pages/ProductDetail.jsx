import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext"; // ✅ Sepet context'i eklendi

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // ✅ Sepete eklemek için context kullan

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/id/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Ürün getirilemedi:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product); // ✅ Context üzerinden sepete ekle
    alert("Ürün sepete eklendi!");
  };

  if (!product) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white rounded shadow mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-blue-600 text-xl font-semibold mt-2">{product.price.toFixed(2)} TL</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-4 text-sm text-gray-500">Kategori: {product.category}</p>

          <button
            onClick={handleAddToCart}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
