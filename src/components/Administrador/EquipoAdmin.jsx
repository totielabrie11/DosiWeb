import React, { useState, useEffect, useRef } from 'react';
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function EquipoAdmin() {
  const [equipo, setEquipo] = useState([]);
  const [selectedMiembro, setSelectedMiembro] = useState(null);
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef(null);

  // Función para obtener los miembros del equipo desde el backend
  const fetchEquipo = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/equipo`); // Usar BACKEND_URL
      if (!response.ok) {
        throw new Error('Error fetching equipo');
      }
      const data = await response.json();
      setEquipo(data);
    } catch (error) {
      console.error('Error fetching equipo:', error);
    }
  };

  // Obtener todos los miembros del equipo al cargar el componente
  useEffect(() => {
    fetchEquipo();
  }, []);

  // Guardar o actualizar miembro del equipo
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', selectedMiembro ? selectedMiembro.id : '');
    formData.append('nombre', nombre);
    formData.append('rol', rol);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('linkedin', linkedin);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/equipo`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchEquipo(); // Refrescar el equipo
        resetForm();
      } else {
        console.error('Error al crear/editar el miembro del equipo');
      }
    } catch (error) {
      console.error('Error al crear/editar el miembro del equipo:', error);
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setSelectedMiembro(null);
    setNombre('');
    setRol('');
    setEmail('');
    setTelefono('');
    setLinkedin('');
    setImageFile(null);
  };

  // Editar miembro del equipo
  const handleEdit = (miembro) => {
    setSelectedMiembro(miembro);
    setNombre(miembro.nombre);
    setRol(miembro.rol);
    setEmail(miembro.email);
    setTelefono(miembro.telefono);
    setLinkedin(miembro.linkedin);
  };

  // Eliminar miembro del equipo
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este miembro del equipo?')) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/equipo/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchEquipo(); // Refrescar el equipo
        } else {
          console.error('Error al eliminar el miembro del equipo');
        }
      } catch (error) {
        console.error('Error al eliminar el miembro del equipo:', error);
      }
    }
  };

  // Manejar cambio de archivo (imagen)
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Administrar Equipo</h2>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            ref={inputRef}
            type="text"
            className="form-control"
            placeholder="Nombre del miembro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rol del miembro"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="url"
            className="form-control"
            placeholder="Enlace a LinkedIn"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {selectedMiembro ? 'Actualizar' : 'Crear'} Miembro
        </button>
        {selectedMiembro && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Miembros del Equipo</h3>
      <ul className="list-group">
        {equipo.map(miembro => (
          <li key={miembro.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1"><strong>{miembro.nombre}</strong></p>
              <span className="badge bg-secondary">{miembro.rol}</span>
              <p className="mb-1">Email: {miembro.email}</p>
              <p className="mb-1">Teléfono: {miembro.telefono}</p>
              <p className="mb-1">LinkedIn: <a href={miembro.linkedin} target="_blank" rel="noopener noreferrer">{miembro.linkedin}</a></p>
              {miembro.image && (
                <div className="mt-2">
                  <img src={miembro.image} alt="Miembro del Equipo" className="img-thumbnail" style={{ maxWidth: '150px' }} />
                </div>
              )}
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(miembro)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(miembro.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EquipoAdmin;
