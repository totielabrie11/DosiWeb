import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import ThreeDCanvas from '../ThreeDCanvas/ThreeDCanvas';
import Loading from '../Productos/Loading';
import ProductBarraInfo from './ProductBarraInfo';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config
import './ProductoDetalle.css';

function ProductoDetalle() {
  const { name } = useParams();
  const navigate = useNavigate(); // Inicializa useNavigate
  const [product, setProduct] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product/${name}`); // Usa BACKEND_URL aquí
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    const fetchSettings = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-settings`); // Usa BACKEND_URL aquí
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const productSettings = data.find(setting => setting.name === name);
        if (productSettings) {
          setSettings(productSettings);
        } else {
          setSettings({
            lightIntensity: 1,
            spotLightIntensity: 1,
            lightPosition: [10, 10, 10],
            isAnimating: false,
            rotationSpeed: 0.01
          });
        }
      } catch (error) {
        console.error('Failed to fetch product settings:', error);
      }
    };

    const fetchData = async () => {
      await fetchProduct();
      await fetchSettings();
      setLoading(false);
      window.scrollTo(0, 0); // Desplazarse al principio de la pantalla
    };

    fetchData();
  }, [name]);

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="productos-container">
      <ProductBarraInfo productName={product.name} />
      <div className="product-description">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        {product.caracteristicas && product.caracteristicas.length > 0 && (
          <>
            <h3>Características:</h3>
            <ol>
              {product.caracteristicas.map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))}
            </ol>
          </>
        )}
      </div>
      <div className="product-3d">
        {settings && (
          <ThreeDCanvas
            modelPath={product.path}
            lightIntensity={settings.lightIntensity}
            spotLightIntensity={settings.spotLightIntensity}
            lightPosition={settings.lightPosition}
            isAnimating={settings.isAnimating}
            rotationSpeed={settings.rotationSpeed}
          />
        )}
      </div>
      {/* Botón para volver a la vista de todos los productos */}
      <button className="back-button" onClick={() => navigate('/productos')}>
        ← Volver
      </button>
    </div>
  );
}

export default ProductoDetalle;
