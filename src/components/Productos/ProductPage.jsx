import React, { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import ProductCards from './ProductCards';
import { BACKEND_URL } from '../config'; // Importa la URL desde el archivo config

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-descriptions`); // Usa BACKEND_URL aquí
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filters) => {
    setFilters(filters);
  };

  return (
    <div>
      <ProductFilter onFilter={handleFilter} />
      <ProductCards products={products} filters={filters} />
    </div>
  );
};

export default ProductPage;
