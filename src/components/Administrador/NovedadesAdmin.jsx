import React, { useState, useEffect, useRef } from 'react';
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function NovedadesAdmin() {
  const [novedades, setNovedades] = useState([]);
  const [selectedNovedad, setSelectedNovedad] = useState(null);
  const [novedadText, setNovedadText] = useState('');
  const [novedadSpan, setNovedadSpan] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const inputRef = useRef(null);

  // Función para obtener las novedades desde el backend
  const fetchNovedades = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/novedades`); // Usar BACKEND_URL
      if (!response.ok) {
        throw new Error('Error fetching novedades');
      }
      const data = await response.json();
      setNovedades(data);
    } catch (error) {
      console.error('Error fetching novedades:', error);
    }
  };

  // Obtener todas las novedades al cargar el componente
  useEffect(() => {
    fetchNovedades();
  }, []);

  // Guardar o actualizar novedad
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', selectedNovedad ? selectedNovedad.id : '');
    formData.append('text', novedadText);
    formData.append('span', novedadSpan);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/novedades`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        fetchNovedades(); // Refrescar novedades
        resetForm();
      } else {
        console.error('Error al crear/editar la novedad');
      }
    } catch (error) {
      console.error('Error al crear/editar la novedad:', error);
    }
  };

  // Resetear el formulario
  const resetForm = () => {
    setSelectedNovedad(null);
    setNovedadText('');
    setNovedadSpan('');
    setImageFile(null);
  };

  // Editar novedad
  const handleEdit = (novedad) => {
    setSelectedNovedad(novedad);
    setNovedadText(novedad.text);
    setNovedadSpan(novedad.span);
  };

  // Eliminar novedad
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta novedad?')) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/novedades/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNovedades(); // Refrescar novedades
        } else {
          console.error('Error al eliminar la novedad');
        }
      } catch (error) {
        console.error('Error al eliminar la novedad:', error);
      }
    }
  };

  // Manejar cambio de archivo (imagen)
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Administrar Novedades</h2>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            ref={inputRef}
            className="form-control"
            placeholder="Texto de la novedad"
            value={novedadText}
            onChange={(e) => setNovedadText(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Span de la novedad"
            value={novedadSpan}
            onChange={(e) => setNovedadSpan(e.target.value)}
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
          {selectedNovedad ? 'Actualizar' : 'Crear'} Novedad
        </button>
        {selectedNovedad && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Lista de Novedades</h3>
      <ul className="list-group">
        {novedades.map(novedad => (
          <li key={novedad.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-1"><strong>{novedad.text}</strong></p>
              <span className="badge bg-secondary">{novedad.span}</span>
              {novedad.image && (
                <div className="mt-2">
                  <img src={novedad.image} alt="Novedad" className="img-thumbnail" style={{ maxWidth: '150px' }} />
                </div>
              )}
            </div>
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(novedad)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(novedad.id)}
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

export default NovedadesAdmin;
