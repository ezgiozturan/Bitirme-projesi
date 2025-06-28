import React from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; 

const Navbar = ({ search, setSearch }) => {
  const { user, logout } = useAuth(); // kullanıcı ve logout fonksiyonu

  return (
    <header className="bg-white shadow-md">
      {/* Üst kısım */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Sol: Logo */}
        <Link to="/" className="text-2xl font-bold text-sky-500">
          BitirmeShop
        </Link>

        {/* Orta: Arama çubuğu */}
        <div className="flex w-full max-w-xl mx-4 bg-sky-200 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Aradığınız ürün, kategori veya markayı yazınız"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-sky-100 text-gray-900 placeholder-gray-600 focus:outline-none"
          />
          <button className="bg-sky-500 text-white px-4">
            <FiSearch />
          </button>
        </div>

        {/* Sağ: Kullanıcı bağlantıları */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          {user ? (
            <>
              <span className="flex items-center gap-1 text-sky-700">
                <FiUser /> Hesabım ({user.email})
              </span>
              <button
                onClick={logout}
                className="flex items-center bg-sky-600 gap-1 text-white hover:underline"
              >
                <FiLogOut /> Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:underline">
                Üye Ol
              </Link>
              <Link to="/login" className="hover:text-orange-600 flex items-center gap-1">
                <FiUser /> Giriş Yap
              </Link>
            </>
          )}

        
          <Link to="/cart" className="hover:text-orange-600 flex items-center gap-1">
            <FiShoppingCart /> Sepetim
          </Link>
        </div>
      </div>

      {/* Alt kısım: Kategoriler */}
      <nav className="border-t bg-gray-50">
        <ul className="max-w-7xl mx-auto flex flex-wrap px-6 py-2 gap-4 text-sm font-medium">
          <Link to="/products/category/Kadın">Kadın</Link>
          <Link to="/products/category/Erkek">Erkek</Link>
          <Link to="/products/category/Anne&Çocuk">Anne & Çocuk</Link>
          <Link to="/products/category/Ev&Yaşam">Ev&Yaşam</Link>
          <Link to="/products/category/Elektronik">Elektronik</Link>

        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
