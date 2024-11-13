import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SelectorEquipo from './SelectorEquipo';
import VistaEquipo from './VistaEquipo';
import { BACKEND_URL } from '../../../configLocalHost';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetroleoSelector = () => {
  const [configuracion, setConfiguracion] = useState([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);

  // Cargar la configuración desde la API
  useEffect(() => {
    const cargarConfiguracion = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/equipos`);
        setConfiguracion(response.data);
      } catch (error) {
        console.error('Error al cargar la configuración:', error);
      }
    };
    cargarConfiguracion();
  }, []);

  const handleEquipoChange = (equipo) => {
    setEquipoSeleccionado(equipo);
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Seleccione un equipo</h3>
      {/* Componente para seleccionar el equipo */}
      <SelectorEquipo configuracion={configuracion} onChange={handleEquipoChange} />

      {/* Mostrar detalles del equipo seleccionado */}
      {equipoSeleccionado && (
        <>
          <VistaEquipo equipo={equipoSeleccionado} />

          {/* Si el equipo tiene una bomba asociada, mostrar el BombaSelector */}
          {equipoSeleccionado.imagen.includes('conbomb.png') && (
            <div className="mt-5">
              {/* <h4 className="text-center text-info">Selector de Bombas</h4> */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PetroleoSelector;
