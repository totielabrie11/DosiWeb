// src/components/PaginasDetector.jsx
import { useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../components/configLocalHost'; // Importar BACKEND_URL

function PaginasDetector() {
  useEffect(() => {
    // Utilizar require.context para detectar archivos en el directorio Pages
    const detectLocalPages = () => {
      const context = require.context('../components/Home/Pages', false, /\.jsx$/);
      return context.keys().map(file => file.replace('./', '').replace('.jsx', ''));
    };

    const actualizarPaginas = async () => {
      const detectedPages = detectLocalPages();
      
      // Log de las páginas detectadas localmente
      console.log('Páginas detectadas localmente:', detectedPages);

      try {
        // Obtener la lista de páginas ya registradas en el backend
        const { data } = await axios.get(`${BACKEND_URL}/api/pages`);
        const backendPages = data.pages || [];

        // Encontrar las nuevas páginas que aún no están en el backend
        const nuevasPaginas = detectedPages.filter(page => !backendPages.includes(page));

        // Log de las páginas que no están en el backend
        console.log('Páginas nuevas no registradas en el backend:', nuevasPaginas);

        // Si hay páginas nuevas, envíalas al backend
        if (nuevasPaginas.length > 0) {
          await axios.post(`${BACKEND_URL}/api/pages/upload`, {
            pages: nuevasPaginas,
          });
          console.log('Nuevas páginas enviadas al backend:', nuevasPaginas);
        }
      } catch (error) {
        console.error('Error al enviar la lista de páginas:', error);
      }
    };

    actualizarPaginas();
  }, []);

  return null; // No necesita renderizar nada en el DOM
}

export default PaginasDetector;
