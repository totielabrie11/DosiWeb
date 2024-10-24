import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL
import 'bootstrap/dist/css/bootstrap.min.css';

function FotosAdminAsignadorSeccion({ show, handleClose, onSave, selectedPage }) {
  const [selectedSection, setSelectedSection] = useState(''); // Mantener vacío para forzar la selección
  const [sections, setSections] = useState([]);

  // Función para obtener las secciones de las páginas desde el backend
  const fetchSections = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/sections`); // Usar BACKEND_URL
      const allSections = response.data.sections;

      // Filtrar secciones de acuerdo con la página seleccionada
      const filteredSections = allSections.filter(section => section.page === selectedPage);
      setSections(filteredSections);

      if (filteredSections.length > 0) {
        setSelectedSection(filteredSections[0].name); // Seleccionar la primera sección por defecto
      }
    } catch (error) {
      console.error('Error al obtener las secciones:', error);
    }
  }, [selectedPage]);

  // Cargar las secciones cuando se monta el componente o cuando cambia la página seleccionada
  useEffect(() => {
    if (show && selectedPage) {
      fetchSections();
    }
  }, [show, selectedPage, fetchSections]);

  const handleSave = () => {
    if (selectedSection === 'header/encabezado') {
      onSave({ name: 'Encabezado', page: selectedPage });
    } else {
      const selectedSectionData = sections.find(section => section.name === selectedSection);
      if (selectedSectionData) {
        onSave(selectedSectionData); // Enviar el objeto completo de la sección seleccionada al componente padre
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Selecciona una Sección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formSectionSelect">
            <Form.Label>Secciones disponibles para la página: {selectedPage}</Form.Label>
            <Form.Control
              as="select"
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="header/encabezado">Encabezado</option> {/* Opción estática para encabezado */}
              {sections.length > 0 ? (
                sections.map((section) => (
                  <option key={section.name} value={section.name}>
                    {`${section.name} - Página: ${section.page}`}
                  </option>
                ))
              ) : (
                <option>No secciones disponibles</option>
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!selectedSection}>
          Seleccionar Sección
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FotosAdminAsignadorSeccion;
