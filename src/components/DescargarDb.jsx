import React from 'react';
import { FaDownload } from 'react-icons/fa'; // Importamos el ícono de descarga
import { BACKEND_URL } from './configLocalHost'; // Importamos la URL del backend

const DescargarDb = () => {

  const handleDownloadDB = async () => {
    try {
      // Usar BACKEND_URL en la llamada a la API
      const response = await fetch(`${BACKEND_URL}/api/download-db`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/zip',
        },
      });

      if (!response.ok) {
        throw new Error('Error al descargar el archivo.');
      }

      // Crear un enlace invisible para descargar el archivo
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'db_backup.zip'; // Nombre del archivo que se descargará
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error en la descarga:', error);
    }
  };

  return (
    <div 
      onClick={handleDownloadDB} 
      style={{
        display: 'flex',
        justifyContent: 'center',   // Centra horizontalmente
        alignItems: 'center',       // Centra verticalmente
        height: '100%',             // Altura completa del contenedor padre
        cursor: 'pointer',
      }}
    >
      <FaDownload style={{ fontSize: '1.5em' }} /> {/* Ícono de descarga */}
    </div>
  );
};

export default DescargarDb;
