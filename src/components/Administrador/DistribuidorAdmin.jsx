import React, { useState, useEffect } from 'react';
import Geocodificador from './Geocodificador'; // Importamos el componente Geocodificador
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function DistribuidorAdmin() {
  const [distribuidores, setDistribuidores] = useState([]);
  const [selectedDistribuidor, setSelectedDistribuidor] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [provincia, setProvincia] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mail, setEmail] = useState('');
  const [tipo, setTipo] = useState('nacional');
  const [posicion, setPosicion] = useState([0, 0]);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Obtener distribuidores desde la API
  const fetchDistribuidores = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/distribuidores`); // Usar BACKEND_URL
      const data = await response.json();
      setDistribuidores(data);
    } catch (error) {
      console.error('Error fetching distribuidores:', error);
    }
  };

  useEffect(() => {
    fetchDistribuidores();
  }, []);

  // Crear o editar distribuidor (usando POST para ambas operaciones)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const distribuidor = {
      id: selectedDistribuidor ? selectedDistribuidor.id : null, // Incluir ID si es edición
      nombre,
      direccion,
      provincia,
      telefono,
      mail,
      tipo,
      posicion,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/distribuidores`, {
        method: 'POST', // Usamos POST para creación y edición
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(distribuidor),
      });

      if (response.ok) {
        fetchDistribuidores();
        resetForm();
      } else {
        console.error('Error al guardar distribuidor');
      }
    } catch (error) {
      console.error('Error al guardar distribuidor:', error);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setSelectedDistribuidor(null);
    setNombre('');
    setDireccion('');
    setProvincia('');
    setTelefono('');
    setEmail('');
    setTipo('nacional');
    setPosicion([0, 0]);
  };

  // Manejar edición de distribuidor
  const handleEdit = (distribuidor) => {
    setSelectedDistribuidor(distribuidor);
    setNombre(distribuidor.nombre);
    setDireccion(distribuidor.direccion);
    setProvincia(distribuidor.provincia);
    setTelefono(distribuidor.telefono);
    setEmail(distribuidor.mail);
    setTipo(distribuidor.tipo);
    setPosicion(distribuidor.posicion);
  };

  // Manejar eliminación de distribuidor
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este distribuidor?')) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/distribuidores/${id}`, { method: 'DELETE' });

        if (response.ok) {
          fetchDistribuidores();
        } else {
          console.error('Error al eliminar distribuidor');
        }
      } catch (error) {
        console.error('Error al eliminar distribuidor:', error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Administrar Distribuidores</h2>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del distribuidor"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Provincia"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={mail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="nacional">Nacional</option>
            <option value="internacional">Internacional</option>
            <option value="refrigeracion">Refrigeración</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Posición (latitud, longitud)"
            value={posicion.join(', ')}
            onChange={(e) => setPosicion(e.target.value.split(',').map(Number))}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {selectedDistribuidor ? 'Actualizar' : 'Crear'} Distribuidor
        </button>
        {selectedDistribuidor && (
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Distribuidores</h3>
      <ul className="list-group">
        {distribuidores.map(distribuidor => (
          <li key={distribuidor.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1"><strong>{distribuidor.nombre}</strong></p>
              <span className="badge bg-secondary">{distribuidor.tipo}</span>
              <p className="mb-1">Dirección: {distribuidor.direccion}</p>
              <p className="mb-1">Provincia: {distribuidor.provincia}</p>
              <p className="mb-1">Teléfono: {distribuidor.telefono}</p>
              <p className="mb-1">Email: {distribuidor.mail}</p>
            </div>
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(distribuidor)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(distribuidor.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Botón para abrir el modal de Geocodificador */}
      <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
        Abrir buscador de coordenadas
      </button>

      {/* Modal con el componente Geocodificador */}
      {showModal && (
        <div
          className="modal show d-flex justify-content-center align-items-center"
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)', height: '100vh' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Buscar Coordenadas</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <Geocodificador /> {/* Mostramos el componente Geocodificador dentro del modal */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DistribuidorAdmin;
