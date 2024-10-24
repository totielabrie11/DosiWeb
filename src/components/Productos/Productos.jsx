import React, { useState, useEffect } from 'react';
import ProductFilter from './ProductFilter';
import ProductCards from './ProductCards';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config
import './Productos.css';
import IrInicio from '../Home/IrInicio/IrInicio';

function Productos() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-descriptions`); // Usa BACKEND_URL aquí
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicializar filteredProducts con todos los productos
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    const fetchProductOrder = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-order`); // Usa BACKEND_URL aquí
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const orderData = await response.json();
        setOrder(orderData);
      } catch (error) {
        console.error('Failed to fetch product order:', error);
      }
    };

    fetchProducts();
    fetchProductOrder();
  }, []);

  useEffect(() => {
    if (products.length > 0 && order.length > 0) {
      const orderedProducts = orderProducts(order, products);
      setFilteredProducts(orderedProducts);
    }
  }, [products, order]);

  const orderProducts = (order, products) => {
    const ordered = [];
    order.forEach(name => {
      const product = products.find(p => p.name === name);
      if (product) {
        ordered.push(product);
      }
    });
    return ordered;
  };

  const handleFilter = (filters) => {
    let filtered = products;

    // Filtrado por Tipo de Producto
    if (filters.tipoBomba) {
      filtered = filtered.filter(p => p.caracteristicas.some(c => c.toLowerCase().includes(`tipo de producto: ${filters.tipoBomba.toLowerCase()}`)));
    }

    // Filtrado por Aplicación
    if (filters.tipoAplicacion) {
      filtered = filtered.filter(p => p.caracteristicas.some(c => c.toLowerCase().includes(`aplicación: ${filters.tipoAplicacion.toLowerCase()}`)));
    }

    // Filtrado por Industria
    if (filters.tipoIndustria) {
      filtered = filtered.filter(p => p.caracteristicas.some(c => c.toLowerCase().includes(`industria: ${filters.tipoIndustria.toLowerCase()}`)));
    }

    // Filtrado por Tipo de Accionamiento
    if (filters.tipoAccionamiento) {
      filtered = filtered.filter(p => p.caracteristicas.some(c => c.toLowerCase().includes(`accionamiento: ${filters.tipoAccionamiento.toLowerCase()}`)));
    }

    // Filtrado por Marca
    if (filters.marcaBomba) {
      filtered = filtered.filter(p => p.caracteristicas.some(c => c.toLowerCase().includes(`marca: ${filters.marcaBomba.toLowerCase()}`)));
    }

    // Filtrado por Presión y Caudal para Bombas Dosificadoras
    if (filters.tipoBomba === 'Dosificadora') {
      // Filtrado por Contrapresión Máxima
      if (filters.presionMin || filters.presionMax) {
        filtered = filtered.filter(p => {
          const presionMatch = p.caracteristicas.find(c => c.toLowerCase().includes('contrapresión máxima:'));
          if (presionMatch) {
            const presion = parseFloat(presionMatch.match(/(\d+\.?\d*)/)[0]);
            return presion >= filters.presionMin && presion <= filters.presionMax;
          }
          return false; // Si no hay "Contrapresión Máxima", excluir el producto
        });
      }

      // Filtrado por Caudal
      if (filters.caudalMin || filters.caudalMax) {
        filtered = filtered.filter(p => {
          const caudalMatch = p.caracteristicas.find(c => c.toLowerCase().includes('rango de caudal:'));
          if (caudalMatch) {
            const [caudalMin, caudalMax] = caudalMatch.match(/(\d+\.?\d*)/g).map(Number);
            return caudalMax >= filters.caudalMin && caudalMin <= filters.caudalMax;
          }
          return false; // Si no hay "Rango de caudal", excluir el producto
        });
      }
    }

    // Aplicar el orden
    const orderedFilteredProducts = orderProducts(order, filtered);
    setFilteredProducts(orderedFilteredProducts);
  };

  return (
    <div className="productos-container">
      <div className="left-column sticky-filter">
        <ProductFilter onFilter={handleFilter} />
      </div>
      <div className="center-column">
        <ProductCards products={filteredProducts} />
      </div>
      <IrInicio/>
    </div>
  );
}

export default Productos;
