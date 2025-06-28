import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadProducts from "./components/UploadProducts";
import axios from "axios";
import { products } from "./data/products";


  

function App() {
 
const [search, setSearch] = useState("");
useEffect(() => {
  const uploadProducts = async () => {
    try {
      await axios.delete("http://localhost:8080/api/products/clear");
      const productsWithoutId = products.map(({ id, ...rest }) => rest);
      await axios.post("http://localhost:8080/api/products/import", productsWithoutId);
      console.log("Ürünler başarıyla gönderildi.");
    } catch (err) {
      console.error("Gönderim hatası:", err);
    }
  };

  uploadProducts();
}, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar search={search} setSearch={setSearch} />
        <div className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products/category/:category" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<UploadProducts />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
