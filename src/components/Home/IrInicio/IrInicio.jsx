import React from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Importamos el ícono de flecha hacia arriba

const IrInicio = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Para un scroll suave
    });
  };

  return (
    <button 
      onClick={scrollToTop} 
      className="btn btn-primary d-flex align-items-center justify-content-center" // Usamos Bootstrap y alineamos ícono
      style={{
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 1000, // Para asegurarnos de que el botón nunca quede oculto
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        padding: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' // Sombra para resaltar el botón
      }}
    >
      <FaArrowUp size={20} /> {/* Aquí agregamos la flecha hacia arriba */}
    </button>
  );
};

export default IrInicio;
