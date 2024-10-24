const getBackendUrl = () => {
  // Obtenemos el hostname actual
  const hostname = window.location.hostname;

  // Verificamos si el usuario está accediendo desde localhost o una IP local (127.0.0.1)
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // Determinamos la URL del backend según si es un entorno local o externo
  const BACKEND_URL = isLocalhost
    ? 'http://localhost:3005'  // Para desarrollo en localhost
    : process.env.REACT_APP_BACKEND_URL_PROD;  // Para producción, usando variable de entorno

  console.log("🚀 ~ BACKEND_URL:", BACKEND_URL);

  // Construimos la URL de la API
  const apiURL = `${BACKEND_URL}/api/v1`;

  console.log('Environment:', process.env.NODE_ENV);
  console.log('API URL:', apiURL);

  // Retornamos la URL del backend
  return BACKEND_URL;
};

// Exporta la URL correcta del backend
export const BACKEND_URL = getBackendUrl();
