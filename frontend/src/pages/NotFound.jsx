import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-2">Sayfa bulunamadı</p>
      <p className="text-gray-600 mb-6">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
