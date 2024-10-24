import React, { useState } from 'react';

// Definimos los iconos de diferentes tipos de distribuidores
const iconosDistribuidores = {
  nacional: '🌎',
  internacional: '✈️',
  refrigeracion: '❄️',
};

const ListaDistribuidores = ({ distribuidores, setFilter, handleDistribuidorClick, selectedDistribuidor }) => {
  const [selectedType, setSelectedType] = useState('todos');

  const handleFilterChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    setFilter(newType); // Notificamos al componente padre sobre el filtro seleccionado
  };

  return (
    <div>
      <h3>Lista de Distribuidores</h3>
      
      {/* Filtro para los tipos de distribuidores */}
      <div className="mb-3">
        <label htmlFor="tipoDistribuidor">Filtrar por tipo:</label>
        <select
          id="tipoDistribuidor"
          className="form-select"
          value={selectedType}
          onChange={handleFilterChange}
        >
          <option value="todos">Todos</option>
          <option value="nacional">Nacionales</option>
          <option value="internacional">Internacionales</option>
          <option value="refrigeracion">Refrigeración</option>
        </select>
      </div>

      <ul className="list-group">
        {distribuidores
          .filter(
            (distribuidor) =>
              selectedType === 'todos' || distribuidor.tipo === selectedType
          )
          .map((distribuidor, idx) => (
            <li
              key={idx}
              className={`list-group-item ${distribuidor === selectedDistribuidor ? 'distribuidor-seleccionado' : ''}`} // Cambiamos a la clase nueva
              onClick={() => handleDistribuidorClick(distribuidor)} // Llamar a la función cuando se haga clic en un distribuidor
              style={{ cursor: 'pointer' }} // Hacemos el elemento clickeable
            >
              <strong>{iconosDistribuidores[distribuidor.tipo]} {distribuidor.nombre}</strong><br />
              {distribuidor.direccion}, {distribuidor.provincia}<br />
              Teléfono: {distribuidor.telefono}<br />
              Email: {distribuidor.mail}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListaDistribuidores;
