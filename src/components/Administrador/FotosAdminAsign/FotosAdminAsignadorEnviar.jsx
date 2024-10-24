import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL

function FotosAdminAsignadorEnviar({ show, handleClose, selectedHeader, selectedPage, selectedSection }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSendData = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');

    // Verificar que todos los datos estén presentes
    if (!selectedHeader || !selectedPage || !selectedSection) {
      setError('Por favor, asegúrate de haber seleccionado una página, sección y encabezado.');
      setIsLoading(false);
      return;
    }

    try {
      // Preparar la data para enviar
      const data = {
        photoName: selectedHeader.name, // El nombre del archivo del encabezado
        pageName: selectedPage,         // El nombre de la página seleccionada
        section: selectedSection.name   // Enviar solo el nombre de la sección, como el backend espera
      };

      // Mostrar la data en la consola antes de enviarla
      console.log('Datos que se enviarán al backend:', data);

      // Realizar la solicitud POST al endpoint correcto dependiendo del entorno
      const response = await axios.post(`${BACKEND_URL}/api/save-selection`, data);  // Usar BACKEND_URL

      if (response.data.success) {
        setSuccessMessage('¡Asignación guardada exitosamente!');
        handleClose(); // Cerrar el modal al completar
      } else {
        setError('Hubo un problema al guardar la asignación.');
      }
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      setError('Error al enviar los datos al servidor.');
    }

    setIsLoading(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Asignación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Por favor, confirma los siguientes detalles antes de enviar:</p>
        <ul>
          <li><strong>Encabezado:</strong> {selectedHeader?.name}</li>
          <li><strong>Página:</strong> {selectedPage}</li>
          <li><strong>Sección:</strong> {selectedSection?.name}</li>
        </ul>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSendData} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Confirmar y Enviar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FotosAdminAsignadorEnviar;
