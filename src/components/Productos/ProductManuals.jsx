import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config

function ProductManuals({ selectedProduct, updateProductDetails }) {
  const [manual, setManual] = useState('');
  const [folleto, setFolleto] = useState('');
  const [existingManual, setExistingManual] = useState(null);
  const [existingFolleto, setExistingFolleto] = useState(null);

  // Resetear el estado cuando cambie el selectedProduct
  useEffect(() => {
    if (selectedProduct) {
      // Limpiar el estado cuando se selecciona un nuevo producto
      setManual('');
      setFolleto('');
      setExistingManual(null);
      setExistingFolleto(null);

      // Fetch de los detalles del producto seleccionado
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/product/${selectedProduct}`); // Usa BACKEND_URL aquí
          const product = await response.json();

          if (product.rutas) {
            setExistingManual(product.rutas.manual || '');
            setExistingFolleto(product.rutas.folleto || '');
          }
        } catch (error) {
          console.error('Failed to fetch product details:', error);
        }
      };

      fetchProductDetails();
    }
  }, [selectedProduct]);

  const handleManualChange = (e) => setManual(e.target.value);
  const handleFolletoChange = (e) => setFolleto(e.target.value);

  const handleSubmit = async () => {
    if (!selectedProduct) return;

    const response = await fetch(`${BACKEND_URL}/api/product-details`, { // Usa BACKEND_URL aquí
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: selectedProduct, manual, folleto }),
    });

    if (response.ok) {
      alert('Detalles actualizados exitosamente');
      updateProductDetails(); // Refresca los detalles del producto
      setExistingManual(manual);
      setExistingFolleto(folleto);
    } else {
      alert('Error al actualizar los detalles');
    }
  };

  return (
    <div className="product-manuals">
      <h3>Subir Rutas de Manuales y Folletos</h3>

      <div>
        <label>Ruta del Manual:</label>
        <div>
          {existingManual ? (
            <span>
              👍 Ruta existente: {existingManual}
              <button onClick={() => setManual(existingManual)} style={{ marginLeft: '10px' }}>
                ✏️
              </button>
            </span>
          ) : (
            <span>👎 No se ha agregado ninguna ruta de manual.</span>
          )}
        </div>
        <input
          type="text"
          placeholder="Nueva ruta del manual"
          value={manual}
          onChange={handleManualChange}
        />
      </div>

      <div>
        <label>Ruta del Folleto:</label>
        <div>
          {existingFolleto ? (
            <span>
              👍 Ruta existente: {existingFolleto}
              <button onClick={() => setFolleto(existingFolleto)} style={{ marginLeft: '10px' }}>
                ✏️
              </button>
            </span>
          ) : (
            <span>👎 No se ha agregado ninguna ruta de folleto.</span>
          )}
        </div>
        <input
          type="text"
          placeholder="Nueva ruta del folleto"
          value={folleto}
          onChange={handleFolletoChange}
        />
      </div>

      <button onClick={handleSubmit}>Guardar</button>
    </div>
  );
}

export default ProductManuals;
