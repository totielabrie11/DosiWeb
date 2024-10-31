// scripts/generatePagesJson.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const PAGES_DIR = path.join(__dirname, '..', 'src', 'components', 'Home', 'Pages');
const BACKEND_URL = process.env.BACKEND_URL; // Leer la URL del backend desde la variable de entorno

const generatePagesJson = async () => {
  try {
    // Leer los archivos del directorio de páginas
    const files = await fs.promises.readdir(PAGES_DIR);
    const pages = files
      .filter(file => file.endsWith('.jsx'))
      .map(file => file.replace('.jsx', ''));

    // Enviar la lista de páginas al backend
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

// Ejecutar el script directamente si es llamado desde la línea de comandos
if (require.main === module) {
  generatePagesJson();
}

module.exports = generatePagesJson;
