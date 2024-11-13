import React from 'react';
import BombaSelector from './BombaSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VistaEquipo.css'; // Importamos las clases CSS

const VistaEquipo = ({ equipo }) => {
  if (!equipo) return null;

  const esConBomba = equipo.imagen.includes('conbomb.png');

  return (
    <div className="equipo-card shadow-lg my-5 p-4">
      <div className="row g-0 align-items-center">
        {/* Imagen principal del equipo */}
        <div className="col-md-5">
          <img
            src={equipo.imagen}
            alt={equipo.nombre}
            className="equipo-imagen img-fluid rounded-start"
          />
        </div>
        {/* Detalles del equipo */}
        <div className="col-md-7">
          <div className="equipo-detalles card-body">
            <h3 className="card-title text-primary">{equipo.nombre}</h3>
            <p><strong>Capacidad:</strong> {equipo.capacidad}</p>
            <p><strong>Probeta:</strong> {equipo.probeta}</p>
            <p><strong>Tablero:</strong> {equipo.tablero}</p>

            {/* Mostrar el selector de bombas si tiene una bomba asociada */}
            {esConBomba && (
              <>
                <hr className="my-4" />
                <div className="bomba-selector-container">
                  <h5 className="text-center text-info mb-4">Selecciona el Tipo de Bomba</h5>
                  <BombaSelector />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaEquipo;
