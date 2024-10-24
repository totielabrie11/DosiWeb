import React, { useState, useEffect } from 'react';
import Mapa from './Mapa';
import ListaDistribuidores from './ListaDistribuidores';
import './Distribuidores.css'; // Asegúrate de importar el archivo CSS
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL desde config.js

const Distribuidores = () => {
  const [distribuidores, setDistribuidores] = useState([]); // Estado para almacenar los distribuidores
  const [filter, setFilter] = useState('todos'); // Estado para manejar el filtro
  const [selectedDistribuidor, setSelectedDistribuidor] = useState(null); // Para saber cuál distribuidor está seleccionado
  const [mapCenter, setMapCenter] = useState([-38.4161, -63.6167]); // Estado para el centro del mapa
  const [zoom, setZoom] = useState(5); // Estado para el zoom del mapa

  // Función para obtener los distribuidores desde la API
  const fetchDistribuidores = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/distribuidores`); // Llamada a la API con BACKEND_URL
      const data = await response.json();
      setDistribuidores(data); // Actualizar el estado con los datos de la API
    } catch (error) {
      console.error('Error al obtener los distribuidores:', error);
    }
  };

  // useEffect para obtener los distribuidores cuando el componente se monte
  useEffect(() => {
    fetchDistribuidores();
  }, []);

  // Función para manejar el clic en un distribuidor y hacer zoom en su posición
  const handleDistribuidorClick = (distribuidor) => {
    setSelectedDistribuidor(distribuidor); // Guardamos el distribuidor seleccionado
    setMapCenter(distribuidor.posicion); // Movemos el centro del mapa a la ubicación del distribuidor
    setZoom(10); // Hacemos zoom en el distribuidor
  };

  const distribuidoresFiltrados = distribuidores.filter(distribuidor => {
    if (filter === 'todos') {
      return true; // Mostrar todos
    }
    return distribuidor.tipo === filter; // Filtrar según el tipo
  });

  return (
    <div className="container-distribuidores" id="distribuidores">
      <div className="mapa-container">
        <Mapa distribuidores={distribuidoresFiltrados} mapCenter={mapCenter} zoom={zoom} /> {/* Pasar distribuidores filtrados y los estados de zoom/centro */}
      </div>
      <div className="lista-distribuidores">
        <ListaDistribuidores
          distribuidores={distribuidores}
          setFilter={setFilter}
          handleDistribuidorClick={handleDistribuidorClick} // Pasar la función de clic
          selectedDistribuidor={selectedDistribuidor} // Pasar el distribuidor seleccionado
        />
      </div>
    </div>
  );
};

export default Distribuidores;
