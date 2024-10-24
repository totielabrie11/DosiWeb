import React, { useState } from 'react';

const Geocodificador = () => {
  const [direccion, setDireccion] = useState(''); // Dirección a buscar
  const [coordenadas, setCoordenadas] = useState(null); // Estado para almacenar las coordenadas

  // Función que obtiene las coordenadas usando la API de Nominatim
  const obtenerCoordenadas = async (direccion) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoordenadas({ lat, lon }); // Guardamos las coordenadas en el estado
      } else {
        alert('No se encontraron coordenadas para esa dirección');
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
      alert('Hubo un error al obtener las coordenadas.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    obtenerCoordenadas(direccion); // Llamamos a la función cuando el usuario envíe la dirección
  };

  return (
    <div>
      <h3>Geocodificador simple</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="Ingresa una dirección"
          required
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">Obtener coordenadas</button>
      </form>

      {coordenadas && (
        <div className="mt-3">
          <h4>Coordenadas obtenidas:</h4>
          <p>Latitud: {coordenadas.lat}</p>
          <p>Longitud: {coordenadas.lon}</p>
        </div>
      )}
    </div>
  );
};

export default Geocodificador;
