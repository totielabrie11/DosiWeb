const getBackendUrl = () => {
  // Obtenemos el hostname actual
  const hostname = window.location.hostname;

  // Verificamos si el usuario está accediendo desde localhost o una IP local (127.0.0.1)
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  // Determinamos la URL del backend según si es un entorno local o externo
  const BACKEND_URL = isLocalhost
    ? 'http://localhost:5000'  // URL para el backend en desarrollo (servidor Node.js)
    : process.env.BACKEND_URL_PROD;  // URL para producción (ngrok o servidor remoto)

  console.log("🚀 ~ BACKEND_URL:", BACKEND_URL);

  // Retornamos la URL del backend
  return BACKEND_URL;
};

export const BACKEND_URL = getBackendUrl();
