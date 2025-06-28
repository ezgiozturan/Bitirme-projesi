import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const items = Array.isArray(cartItems) ? cartItems : [];

  const total = items.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  useEffect(() => {
    if (orderComplete) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [orderComplete, navigate]);

  

  const handleOrderSubmit = async () => {
  if ( !address || !phone) {
    alert("Lütfen ad, adres ve telefon giriniz.");
    return;
  }

  const order = {
    address,
    phone,
    itemsJson: JSON.stringify(cartItems),
  };

  try {
    await axios.post("http://localhost:8080/api/orders", order);
    clearCart();
    setOrderComplete(true);
  } catch (error) {
    console.error("Sipariş kaydedilemedi:", error);
    alert("Sipariş kaydedilemedi.");
  }
};

  return (
    <div className="p-4 bg-sky-100">
      <h2 className="text-2xl font-bold mb-4 text-sky-600">Sepetim</h2>

      {orderComplete && (
        <p className="text-sky-400 mb-4">Siparişiniz alınmıştır!</p>
      )}

      {items.length === 0 && !orderComplete ? (
        <p className="text-sky-500">Sepetiniz boş.</p>
      ) : (
        !orderComplete && (
          <>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="mb-4 text-black">
                  <div className="flex items-center gap-4">
                    <span className="flex-1">
                      {item.name} - {item.quantity} x {item.price}₺
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-2 py-1 bg-sky-200 rounded text-black hover:bg-gray-400"
                      >
                        -
                      </button>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-2 py-1 bg-sky-200 rounded text-black hover:bg-gray-400"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-2 py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <label className="block text-sm text-gray-700 mb-1">Adres</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 text-black bg-sky-200 rounded"
                placeholder="Teslimat adresinizi girin"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm  text-gray-700 mb-1">Telefon</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 text-black rounded bg-sky-200"
                placeholder="Telefon numaranız"
              />
            </div>

            {error && <p className="text-red-600 mt-2">{error}</p>}

            <p className="mt-4 font-semibold text-sky-500">
              Toplam: {total.toFixed(2)}₺
            </p>

            <button
              onClick={handleOrderSubmit}
              className="mt-4 bg-green-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
            >
              Siparişi Tamamla
            </button>
          </>
        )
      )}
    </div>
  );
};

export default Cart;
