
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';


import { useParams } from "react-router-dom";

function Products() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/category/${category}`);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error("Kategori ürünlerini getirirken hata:", err);
      }
    };

    if (category) fetchCategoryProducts();
  }, [category]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Products;
