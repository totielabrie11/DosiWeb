import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config
import './ProductBarraInfo.css';

function ProductBarraInfo({ productName }) {
  const [links, setLinks] = useState({ brochure: '', manual: '' });
  const [flowRange, setFlowRange] = useState('');

  useEffect(() => {
    if (!productName) {
      console.warn('Nombre del producto no proporcionado');
      return;
    }
    const fetchProductDescriptions = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/product-descriptions`); // Usa BACKEND_URL aquí
        console.log('Response status:', response.status); // Verificar el estado de la respuesta
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText} (${response.status})`);
        }
        const data = await response.json();
        console.log('Product descriptions:', data); // Verificar si se devuelven los enlaces correctamente

        // Encontrar el producto por nombre para obtener el dato específico
        const product = data.find(item => item.name && productName && item.name.toLowerCase() === productName.toLowerCase());
        if (product) {
          console.log('Producto encontrado:', product); // Mostrar el producto encontrado
          if (product.rutas) {
            console.log('Rutas del producto:', product.rutas); // Mostrar las rutas del producto
            setLinks({
              brochure: product.rutas.folleto || '',
              manual: product.rutas.manual || '',
            });
            console.log('Links set:', { brochure: product.rutas.folleto, manual: product.rutas.manual }); // Verificar si se están asignando los enlaces correctamente
          } else {
            console.warn('Rutas no encontradas para el producto:', productName);
          }
          // Establecer el rango de caudal si está disponible
          const caudalFeature = product.caracteristicas.find(caracteristica => caracteristica.toLowerCase().includes('rango de caudal'));
          if (caudalFeature) {
            setFlowRange(caudalFeature.split(':')[1].trim());
          } else {
            console.warn('Rango de caudal no encontrado para el producto:', productName);
          }
        } else {
          console.warn('Producto no encontrado o datos no válidos:', productName);
        }
      } catch (error) {
        console.error('Failed to fetch product descriptions:', error);
      }
    };

    fetchProductDescriptions();
  }, [productName]);

  const handleDownload = (link, type) => {
    console.log('Product links being used:', links); // Mostrar el elemento filtrado al hacer clic en manual o folleto
    console.log('Attempting to download:', type, 'Link:', link); // Verificar si se está intentando descargar el enlace correcto
    if (!link || link.trim() === '') {
      alert(`${type} no disponible`);
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  console.log('Current links:', links); // Verificar los enlaces antes de renderizar

  return (
    <div className="product-barra-info">
      {flowRange && (
        <div className="flow-range">
          <strong>Rango de Caudal:</strong> {flowRange}
        </div>
      )}
      <button className="btn-download" onClick={() => handleDownload(links.brochure, 'Folleto')}>
        Descargar Folleto
      </button>
      <button className="btn-download" onClick={() => handleDownload(links.manual, 'Manual')}>
        Descargar Manual
      </button>
    </div>
  );
}

export default ProductBarraInfo;
