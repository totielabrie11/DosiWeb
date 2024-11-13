import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BombaSelector.css';

const BombaSelector = () => {
  const [bombas, setBombas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagenCargada, setImagenCargada] = useState(true);

  // Obtener la lista de bombas desde la API
  useEffect(() => {
    const fetchBombas = async () => {
      try {
        const response = await axios.get('/api/equipos/bombas');
        setBombas(response.data || []); // Asegurar que siempre sea un array
      } catch (error) {
        console.error('Error al cargar las bombas:', error);
      }
    };
    fetchBombas();
  }, []);

  // Si la lista está vacía, mostrar un mensaje de carga
  if (!bombas || bombas.length === 0) {
    return <p className="text-center">Cargando bombas...</p>;
  }

  // Validar el índice antes de acceder a la bomba actual
  const bombaActual = bombas[currentIndex] || null;

  // Validar si `bombaActual` es null
  if (!bombaActual) {
    return <p className="text-center">No hay información disponible para esta bomba.</p>;
  }

  const imageUrl = bombaActual?.imagenbomba
    ? `${process.env.PUBLIC_URL}/assets/${bombaActual.imagenbomba}`
    : '';

  const handleNext = () => {
    setImagenCargada(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bombas.length);
  };

  const handlePrev = () => {
    setImagenCargada(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bombas.length) % bombas.length);
  };

  const handleImageError = () => setImagenCargada(false);
  const handleImageLoad = () => setImagenCargada(true);

  return (
    <div className="bomba-card mt-4 shadow-sm">
      <div className="card-body text-center">
        <h5 className="card-title">{bombaActual.nombre}</h5>

        <div className="bomba-image-container">
          {imagenCargada && imageUrl ? (
            <img
              src={imageUrl}
              alt={bombaActual.nombre}
              className="bomba-imagen"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          ) : (
            <div className="alert alert-warning">Imagen no disponible</div>
          )}
        </div>

        <div className="bomba-detalles">
          <p><strong>Tipo:</strong> {bombaActual.tipo}</p>
          <p><strong>Presión Máxima:</strong> {bombaActual.presion_maxima}</p>
          <p><strong>Caudal Máximo:</strong> {bombaActual.caudal_maximo}</p>
        </div>

        <div className="bomba-buttons">
          <button onClick={handlePrev} className="btn btn-secondary btn-sm">Anterior</button>
          <button onClick={handleNext} className="btn btn-primary btn-sm">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default BombaSelector;
