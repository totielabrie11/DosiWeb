import React, { useState } from 'react';

// Definimos los iconos de diferentes tipos de distribuidores
const iconosDistribuidores = {
  nacional: '🌎',
  internacional: '✈️',
  refrigeracion: '❄️',
  online: 'assets/img/logos/mercadolibre.png', // Ruta de la imagen
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
      <div className="sticky-header">
        <h3>Lista de Distribuidores</h3>

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
            <option value="online">Online</option>
          </select>
        </div>
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
              className={`list-group-item ${distribuidor === selectedDistribuidor ? 'distribuidor-seleccionado' : ''}`}
              onClick={() => handleDistribuidorClick(distribuidor)}
              style={{ cursor: 'pointer' }}
            >
              <strong>
                {distribuidor.tipo === 'online' ? (
                  <img 
                    src={iconosDistribuidores.online} 
                    alt="Online Icon" 
                    style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  />
                ) : (
                  iconosDistribuidores[distribuidor.tipo]
                )}
                {distribuidor.nombre}
              </strong><br />
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
