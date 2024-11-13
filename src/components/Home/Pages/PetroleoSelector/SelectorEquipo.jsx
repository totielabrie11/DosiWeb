import React from 'react';

const SelectorEquipo = ({ configuracion, onChange }) => {
  return (
    <div className="mb-4">
      <select className="form-select" onChange={(e) => onChange(configuracion[e.target.value])}>
        <option value="">Seleccione un equipo</option>
        {configuracion.map((equipo, index) => (
          <option key={equipo.id} value={index}>
            {equipo.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorEquipo;
