import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config

const HomeCarousel = () => {
  // Estado para almacenar las imágenes del carrusel
  const [carouselImages, setCarouselImages] = useState([]);
  // Estado para almacenar las descripciones adicionales
  const [additionalDescriptions, setAdditionalDescriptions] = useState([]);

  // Función para obtener las imágenes del servidor
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Obtener imágenes
        const response = await axios.get(`${BACKEND_URL}/api/images`); // Usa BACKEND_URL aquí
        setCarouselImages(response.data.images);  // Actualizar el estado con las imágenes

        // Obtener descripciones adicionales
        const descriptionsResponse = await axios.get(`${BACKEND_URL}/api/fotoText`); // Usa BACKEND_URL aquí
        setAdditionalDescriptions(descriptionsResponse.data);  // Actualizar el estado con las descripciones adicionales

        // Mostrar las descripciones en la consola
        console.log('Imágenes obtenidas:', response.data.images);
        console.log('Descripciones adicionales obtenidas:', descriptionsResponse.data);
      } catch (error) {
        console.error('Error al cargar las imágenes o descripciones:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores de carrusel */}
      <div className="carousel-indicators">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Elementos del carrusel */}
      <div className="carousel-inner">
        {carouselImages.map((image, index) => {
          // Buscar la descripción correspondiente en los datos adicionales obtenidos de la API
          const matchingData = additionalDescriptions.find(desc => desc.name === image.name) || {};

          // Asegurarte de manejar los valores predeterminados correctamente
          const matchingDescription = matchingData.description || 'Descripción no disponible';
          const matchingFontFamily = matchingData.fontFamily || 'Arial, sans-serif';
          const matchingFontColor = matchingData.fontColor || '#ffffff'; // Color predeterminado
          const matchingTextTransform = matchingData.textTransform || 'none'; // Transformación de texto predeterminada
          const matchingBackgroundColor = matchingData.backgroundColor || 'rgba(0, 0, 0, 0.7)'; // Color de fondo predeterminado
          const matchingPageUrl = matchingData.pageName ? `${BACKEND_URL}/${matchingData.pageName.toLowerCase()}` : '#'; // URL de la página

          return (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              style={{ ...styles.carouselItem(image.url), fontFamily: matchingFontFamily, color: matchingFontColor, backgroundColor: matchingBackgroundColor }}
            >
              <div style={{ ...styles.textOverlay, fontFamily: matchingFontFamily, color: matchingFontColor, textTransform: matchingTextTransform, backgroundColor: matchingBackgroundColor }}>
                <h2 style={{ fontFamily: matchingFontFamily }}>{matchingDescription}</h2>
              </div>
              <a href={matchingPageUrl} target="_blank" rel="noopener noreferrer">
                <button style={styles.learnMoreButton}>Saber más</button>
              </a>
            </div>
          );
        })}
      </div>

      {/* Controles de navegación */}
      <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

const styles = {
  carouselItem: (url) => ({
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    height: '100vh',
    backgroundPosition: 'center',
    position: 'relative'
  }),
  textOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: '20px',
    borderRadius: '10px',
    zIndex: 10,
    textAlign: 'center',
    fontSize: '24px',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)'
  },
  learnMoreButton: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none'
  }
};

export default HomeCarousel;
