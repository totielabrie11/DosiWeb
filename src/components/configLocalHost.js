const getBackendUrl = () => {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  const BACKEND_URL = isLocalhost
    ? 'http://localhost:5000'
    : process.env.REACT_APP_BACKEND_URL_PROD;

  console.log("🚀 ~ BACKEND_URL:", BACKEND_URL);

  return BACKEND_URL;
};

export const BACKEND_URL = getBackendUrl();
