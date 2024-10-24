import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL

function FotosAdminAsignadorPaginas({ show, handleClose, onSave }) {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');

  useEffect(() => {
    // Obtener las páginas disponibles desde el backend
    const fetchPages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/pages`); // Usar BACKEND_URL
        setPages(response.data.pages);
      } catch (error) {
        console.error('Error al cargar las páginas:', error);
      }
    };

    fetchPages();
  }, []);

  const handleSave = () => {
    if (!selectedPage) {
      alert('Por favor, selecciona una página.');
      return;
    }

    onSave(selectedPage);  // Enviar la página seleccionada al componente padre
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona una Página</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPageSelect">
            <Form.Label>Páginas disponibles</Form.Label>
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
        <Button variant="primary" onClick={handleSave}>
          Seleccionar Página
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FotosAdminAsignadorPaginas;
