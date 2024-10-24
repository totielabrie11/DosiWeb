import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACKEND_URL } from '../../configLocalHost'; // Asegúrate de tener la ruta correcta

function Encabezado({ backgroundImage }) {
  const [imageData, setImageData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        // Obtener descripciones adicionales desde la API
        const response = await axios.get(`${BACKEND_URL}/api/fotoText`);
        const fetchedImageData = response.data.find(item => item.name === backgroundImage) || {};

        setImageData(fetchedImageData);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar la imagen o descripciones:', error);
        setLoading(false);
      }
    };

    if (backgroundImage) {
      fetchImageData();
    }
  }, [backgroundImage]);

  if (loading) {
    return <p>Cargando imagen...</p>;
  }

  // Asignar valores predeterminados si no hay datos en la API
  const {
    description = 'Descripción no disponible',
    fontFamily = 'Arial, sans-serif',
    fontColor = '#ffffff',
    textTransform = 'none',
    backgroundColor = 'rgba(0, 0, 0, 0.7)',
  } = imageData;

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex', // Uso de flexbox
        justifyContent: 'center', // Centrado horizontal
        alignItems: 'center', // Centrado vertical
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${BACKEND_URL}/images/fondos/headeres/${backgroundImage})`,
      }}
    >
      {/* Texto del encabezado */}
      <div
        id="encabezado"
        className="container text-center"
        style={{
          fontFamily: fontFamily,
          color: fontColor,
          backgroundColor: backgroundColor,
          textTransform: textTransform,
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h1 className="mb-4" style={{ color: fontColor }}>
          {description}
        </h1>
      </div>
    </div>
  );
}

export default Encabezado;
