import React, { useState, useEffect, useCallback } from 'react';

const EliminarProductos = ({ backendUrl }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [cleaning, setCleaning] = useState(false); // Estado para el botón de limpieza

  // Fetch para cargar los productos desde el backend
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/product-descriptions`);
      if (!response.ok) {
        throw new Error(`Error al cargar los productos: ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Función para eliminar un producto de la base de datos
  const handleDelete = async (productName) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`)) {
      return;
    }

    setDeleting(productName);
    try {
      // Eliminar el producto de product-descriptions
      await fetch(`${backendUrl}/api/product-descriptions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });

      // Eliminar el producto de product-order
      await fetch(`${backendUrl}/api/product-order`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });

      // Actualizar la lista de productos
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.name !== productName)
      );

      alert(`Producto "${productName}" eliminado exitosamente.`);
    } catch (error) {
      alert(`Error al eliminar el producto: ${error.message}`);
    } finally {
      setDeleting(null);
    }
  };

  // Ejecutar el script de limpieza de archivos huérfanos
  const handleCleanFiles = async () => {
    if (!window.confirm('¿Estás seguro de que deseas limpiar los archivos huérfanos?')) {
      return;
    }

    setCleaning(true);
    try {
      const response = await fetch(`${backendUrl}/api/clean-files`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error durante la limpieza: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      alert(data.message); // Mensaje de éxito
    } catch (error) {
      alert(`Error al ejecutar la limpieza: ${error.message}`);
    } finally {
      setCleaning(false);
    }
  };

  // Renderizado del componente
  if (isLoading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Eliminar Productos</h1>
      <button
        onClick={handleCleanFiles}
        className="btn btn-warning mb-3"
        disabled={cleaning}
      >
        {cleaning ? 'Limpiando Archivos...' : 'Limpiar Archivos Huérfanos'}
      </button>
      {products.length === 0 ? (
        <p>No hay productos disponibles. Intenta agregar uno primero.</p>
      ) : (
        <ul className="list-group">
          {products.map((product) => (
            <li
              key={product.name}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>{product.name}</span>
              <button
                onClick={() => handleDelete(product.name)}
                className="btn btn-danger"
                disabled={deleting === product.name}
              >
                {deleting === product.name ? 'Eliminando...' : 'Eliminar'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EliminarProductos;
