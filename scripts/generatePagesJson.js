// scripts/generatePagesJson.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'components', 'Home', 'Pages');

// Seleccionar la URL del backend según el entorno
const BACKEND_URL = process.env.NODE_ENV === 'production'
  ? process.env.BACKEND_URL_PROD
  : process.env.BACKEND_URL_DEV;

console.log("URL del backend:", BACKEND_URL); // Comprobar la URL del backend

const generatePagesJson = async () => {
  try {
    const files = await fs.promises.readdir(PAGES_DIR);
    const pages = files
      .filter(file => file.endsWith('.jsx'))
      .map(file => file.replace('.jsx', ''));

    const response = await axios.post(`${BACKEND_URL}/api/pages`, { pages });
    if (response.data.success) {
      console.log(`📄 Lista de páginas enviada exitosamente al backend: ${pages.length} páginas detectadas.`);
    } else {
      console.error('Error en la respuesta del backend:', response.data.message);
    }
  } catch (error) {
    console.error('Error al generar o enviar la lista de páginas:', error);
  }
};

if (require.main === module) {
  generatePagesJson();
}

module.exports = generatePagesJson;
