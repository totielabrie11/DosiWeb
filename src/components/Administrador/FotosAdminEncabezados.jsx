import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FotosAdminAsignadorPaginas from './FotosAdminAsign/FotosAdminAsignadorPaginas';
import FotosAdminAsignadorSeccion from './FotosAdminAsign/FotosAdminAsignadorSeccion';
import FotosAdminAsignadorEnviar from './FotosAdminAsign/FotosAdminAsignadorEnviar';
import TextFotoEditorEncabezado from './TextFotoEditorEncabezado';
import { BACKEND_URL } from '../configLocalHost'; // Importar BACKEND_URL

function FotosAdminEncabezados({ onPhotosLoaded, onAssign }) {
  const [headers, setHeaders] = useState([]);
  const [error, setError] = useState(null);
  const [showAssignPageModal, setShowAssignPageModal] = useState(false);  // Primer modal
  const [showAssignSectionModal, setShowAssignSectionModal] = useState(false);  // Segundo modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);  // Modal para confirmar y enviar
  const [showTextEditorModal, setShowTextEditorModal] = useState(false);  // Modal para agregar descripción
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);  // Almacena la página seleccionada
  const [selectedSection, setSelectedSection] = useState(null);  // Almacena la sección seleccionada

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/encabezados`); // Usar BACKEND_URL
        if (response.data.success) {
          setHeaders(response.data.headers);
          setError(null);
          if (onPhotosLoaded) {
            onPhotosLoaded(response.data.headers);
          }
        } else {
          setError('Error al cargar los encabezados.');
        }
      } catch (err) {
        console.error('Error al obtener los encabezados:', err);
        setError('Error al cargar los encabezados.');
      }
    };
    fetchHeaders();
  }, [onPhotosLoaded]);

  const handleDeleteHeader = async (filename) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/encabezados/${filename}`); // Usar BACKEND_URL
      setHeaders(headers.filter(header => header.name !== filename));
      setError(null);  // Limpiar cualquier error previo
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      setError('Error al eliminar la imagen.');
    }
  };

  // Al abrir el primer modal (selección de página)
  const handleAssignHeader = (header) => {
    setSelectedHeader(header);
    setShowAssignPageModal(true);  // Muestra el modal para seleccionar página
  };

  // Cerrar los modales
  const handleAssignModalClose = () => {
    setShowAssignPageModal(false);
    setShowAssignSectionModal(false);
    setShowConfirmModal(false);
    setShowTextEditorModal(false);
    setSelectedHeader(null);
    setSelectedPage(null);
    setSelectedSection(null);
  };

  // Manejo de guardar la página seleccionada y abrir el siguiente modal
  const handlePageSelected = (pageName) => {
    setSelectedPage(pageName);
    setShowAssignPageModal(false);
    setShowAssignSectionModal(true);  // Abre el segundo modal para seleccionar sección
  };

  // Guardar la sección seleccionada y abrir el modal de confirmación
  const handleSaveSection = (section) => {
    setSelectedSection(section);
    setShowAssignSectionModal(false);
    setShowConfirmModal(true); // Abre el modal de confirmación
  };

  // Abrir el modal del editor de texto
  const handleEditDescription = (header) => {
    setSelectedHeader(header);
    setShowTextEditorModal(true);
  };

  return (
    <div>
      <h3>Administrar Fotos de Encabezados</h3>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <ul className="list-group">
        {headers.length > 0 ? (
          headers.map(header => (
            <li key={header.name} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{header.name}</strong>
                <img
                  src={header.url}
                  alt={header.name}
                  className="img-thumbnail ms-3"
                  style={{ maxWidth: '100px' }}
                />
              </div>
              <div>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDeleteHeader(header.name)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleAssignHeader(header)}
                >
                  Asignar
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEditDescription(header)}
                >
                  Descripción
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="list-group-item">No se encontraron fotos de encabezados.</li>
        )}
      </ul>

      {/* Modal de selección de página */}
      {selectedHeader && (
        <FotosAdminAsignadorPaginas
          show={showAssignPageModal}
          handleClose={handleAssignModalClose}
          onSave={handlePageSelected}  // Enviar página seleccionada
        />
      )}

      {/* Modal de selección de sección */}
      {selectedPage && selectedHeader && (
        <FotosAdminAsignadorSeccion
          show={showAssignSectionModal}
          handleClose={handleAssignModalClose}
          onSave={handleSaveSection}  // Guardar página + sección + foto
          selectedPage={selectedPage}  // Pasar la página seleccionada
        />
      )}

      {/* Modal de confirmación y envío */}
      {selectedPage && selectedHeader && selectedSection && (
        <FotosAdminAsignadorEnviar
          show={showConfirmModal}
          handleClose={handleAssignModalClose}
          selectedHeader={selectedHeader}
          selectedPage={selectedPage}
          selectedSection={selectedSection}
        />
      )}

      {/* Modal de edición de descripción */}
      {selectedHeader && (
        <TextFotoEditorEncabezado
          show={showTextEditorModal}
          handleClose={handleAssignModalClose}
          selectedPhoto={selectedHeader}
          handleSave={(updatedHeader) => {
            // Actualizar el encabezado con la nueva descripción
            setHeaders(headers.map(header => header.name === updatedHeader.name ? updatedHeader : header));
            setShowTextEditorModal(false);
          }}
        />
      )}
    </div>
  );
}

export default FotosAdminEncabezados;
