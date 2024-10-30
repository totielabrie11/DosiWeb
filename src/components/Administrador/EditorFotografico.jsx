import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function EditorFotografico({ show, handleClose, selectedPhoto, onSave }) {
  const [editedPhoto, setEditedPhoto] = useState({ name: selectedPhoto?.name || '', image: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Actualizar el estado cuando selectedPhoto cambie
    setEditedPhoto({ name: selectedPhoto?.name || '', image: null });
  }, [selectedPhoto]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setEditedPhoto({ ...editedPhoto, image: files[0] });
    } else {
      setEditedPhoto({ ...editedPhoto, [name]: value });
    }
  };

  const handleSaveEdit = async () => {
    if (!editedPhoto.name) {
      setError('Debes proporcionar un nombre.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', editedPhoto.name);

      // Solo agregar la imagen si se ha seleccionado una nueva imagen
      if (editedPhoto.image) {
        formData.append('image', editedPhoto.image);
      }

      const endpoint = `${BACKEND_URL}/api/images/${selectedPhoto.name}`; // Usar BACKEND_URL

      const response = await axios.put(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Concatenar BACKEND_URL si es necesario
      const imageUrl = response.data.url ? `${BACKEND_URL}${response.data.url}` : null;

      // Pasar la URL completa a la función onSave
      onSave({ name: editedPhoto.name, url: imageUrl });
      handleClose();
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      setError('Error al guardar los cambios.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Fotografía</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <div className="mb-3">
          <label htmlFor="photoName" className="form-label">Nombre de la foto:</label>
          <input
            type="text"
            id="photoName"
            name="name"
            className="form-control"
            value={editedPhoto.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="photoImage" className="form-label">Seleccionar nueva imagen (opcional):</label>
          <input
            type="file"
            id="photoImage"
            name="image"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSaveEdit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditorFotografico;
