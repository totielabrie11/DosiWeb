import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function VideoAdminAsignador({ show, handleClose, selectedVideo }) {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
    // Detectar automáticamente las páginas disponibles
    const fetchPages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/pages`); // Usar BACKEND_URL
        setPages(response.data.pages); // Supone que el servidor devuelve un array de nombres de páginas
      } catch (error) {
        console.error('Error al cargar las páginas:', error);
      }
    };

    fetchPages();
  }, []);

  const handleAssign = async () => {
    try {
      if (!selectedPage) {
        alert('Por favor, selecciona una página');
        return;
      }

      // Enviar solicitud para asignar el video a la página seleccionada
      const response = await axios.post(`${BACKEND_URL}/api/videos/assign`, { // Usar BACKEND_URL
        videoName: selectedVideo.name,
        pageName: selectedPage,
      });

      // Verificar si la asignación fue exitosa según la respuesta del servidor
      if (response.data.success) {
        alert('Video asignado con éxito');
      } else {
        alert('Error al asignar el video');
      }

      handleClose(); // Cerrar el modal
    } catch (error) {
      console.error('Error al asignar el video:', error);
      alert('Error al asignar el video');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Dialog className="modal-dialog-centered">
        <Modal.Header closeButton>
          <Modal.Title>Asignar Video a Página</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPageSelect">
              <Form.Label>Selecciona una página</Form.Label>
              <Form.Control as="select" value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
                <option value="">-- Selecciona una página --</option>
                {pages.map((page) => (
                  <option key={page} value={page}>
                    {page}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAssign}>
            Asignar Video
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default VideoAdminAsignador;
