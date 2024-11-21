import React, { useState, useEffect, useCallback } from 'react';

const EliminarProductos = ({ backendUrl }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch para cargar los productos desde el backend
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Cargando productos desde: ${backendUrl}/api/product-descriptions`); // Depuración
      const response = await fetch(`${backendUrl}/api/product-descriptions`);
      if (!response.ok) {
        throw new Error(`Error al cargar los productos: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('El formato de datos no es un array.');
      }
      setProducts(data);
      console.log('Productos cargados:', data); // Depuración
    } catch (err) {
      console.error('Error en fetchProducts:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Función para eliminar un archivo
  const deleteFile = async (productName) => {
    console.log(`Eliminando archivo asociado al producto: ${productName}`); // Depuración
    const response = await fetch(`${backendUrl}/api/delete-file`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: productName }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al eliminar el archivo:', errorData); // Depuración
      throw new Error(errorData.message || 'Error al eliminar la imagen del producto');
    }
    console.log(`Archivo asociado al producto "${productName}" eliminado exitosamente.`);
  };

  // Función para eliminar un producto
  const handleDelete = async (productName) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el producto "${productName}"?`)) {
      return;
    }

    setDeleting(productName); // Indicar que el producto está siendo eliminado
    try {
      console.log(`Intentando eliminar producto: ${productName}`); // Depuración

      // Eliminar el producto de product-descriptions
      const deleteProductResponse = await fetch(`${backendUrl}/api/product-descriptions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });

      if (!deleteProductResponse.ok) {
        const errorData = await deleteProductResponse.json();
        console.error('Error al eliminar de product-descriptions:', errorData); // Depuración
        throw new Error(errorData.message || 'Error al eliminar el producto');
      }

      // Eliminar el producto de product-order
      const deleteOrderResponse = await fetch(`${backendUrl}/api/product-order`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName }),
      });

      if (!deleteOrderResponse.ok) {
        const errorData = await deleteOrderResponse.json();
        console.error('Error al eliminar de product-order:', errorData); // Depuración
        throw new Error(errorData.message || 'Error al eliminar el orden del producto');
      }

      // Eliminar la imagen asociada al producto
      await deleteFile(productName);

      // Actualizar la lista de productos después de las eliminaciones
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.name !== productName)
      );

      alert(`Producto "${productName}" eliminado exitosamente.`);
    } catch (error) {
      console.error('Error eliminando producto:', error.message); // Depuración
      alert(`No se ha logrado eliminar el producto: ${error.message}`);
    } finally {
      setDeleting(null); // Restablecer el estado de eliminación
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
