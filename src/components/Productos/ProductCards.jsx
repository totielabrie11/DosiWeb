import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCards.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap instalado

const ProductCards = ({ products }) => {
  return (
    <div className="product-cards-container">
      {Array.isArray(products) && products.map((product, index) => (
        <div className="product-card card" key={index}>
          <img 
            src={product['path-image'] || product.path || 'https://via.placeholder.com/150'} 
            alt={product.name || 'No Image Available'} 
            className="card-img-top product-image" 
          />
          <div className="card-body">
            <h3 className="card-title">{product.name || 'Unnamed Product'}</h3>
            <p className="card-text">{product.description || 'No description available.'}</p>
            {Array.isArray(product.caracteristicas) && product.caracteristicas.length > 0 && (
              <ul>
                {product.caracteristicas.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
            {/* Botón para ver el detalle */}
            <Link to={`/productos/${product.name}`} className="btn btn-primary mt-3">
              Ver Detalle
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;