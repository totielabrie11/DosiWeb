import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config

const Equipo = () => {
  const [equipo, setEquipo] = useState([]);
  const [modalData, setModalData] = useState({}); // Datos para la ventana modal
  const [showModal, setShowModal] = useState(false); // Controlar la visibilidad del modal

  // Función para obtener los datos del equipo desde la API
  const fetchEquipo = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/equipo`); // Usa BACKEND_URL aquí
      const data = await response.json();
      setEquipo(data);
    } catch (error) {
      console.error('Error al obtener los datos del equipo:', error);
    }
  };

  // useEffect para obtener los datos cuando el componente se monte
  useEffect(() => {
    fetchEquipo();
  }, []);

  // Función para copiar texto al portapapeles
  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
    alert('Copiado al portapapeles: ' + texto);
  };

  // Función para abrir el modal con los datos del miembro
  const abrirModal = (miembro) => {
    setModalData(miembro);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <section className="page-section bg-light" id="team">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Nuestro Increíble Equipo</h2>
          <h3 className="section-subheading text-muted">Somos un equipo apasionado por la innovación y el desarrollo.</h3>
        </div>
        <div className="row">
          {equipo.map((miembro) => (
            <div key={miembro.id} className="col-lg-4">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src={miembro.image} alt={miembro.nombre} />
                <h4>{miembro.nombre}</h4>
                <p className="text-muted">{miembro.rol}</p>

                {/* Correo electrónico */}
                <button
                  className="btn btn-dark btn-social mx-2"
                  onClick={() => abrirModal({ tipo: 'email', valor: miembro.email })}
                  aria-label={`Correo de ${miembro.nombre}`}
                >
                  <i className="fas fa-envelope"></i>
                </button>

                {/* Teléfono */}
                <button
                  className="btn btn-dark btn-social mx-2"
                  onClick={() => abrirModal({ tipo: 'telefono', valor: miembro.telefono })}
                  aria-label={`Teléfono de ${miembro.nombre}`}
                >
                  <i className="fas fa-phone"></i>
                </button>

                {/* LinkedIn */}
                {miembro.linkedin ? (
                  <a
                    className="btn btn-dark btn-social mx-2"
                    href={miembro.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Perfil de LinkedIn de ${miembro.nombre}`}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                ) : (
                  <p className="text-muted">
                    <em>No tiene cuenta de LinkedIn ingresada</em>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal para mostrar la información del contacto */}
        <Modal show={showModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton style={{ backgroundColor: '#343a40', color: '#fff' }}>
            <Modal.Title>Información de {modalData.tipo}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#343a40', color: '#fff' }}>
            <p>{modalData.valor ? modalData.valor : `No tiene ${modalData.tipo} registrado`}</p>
            {modalData.valor && (
              <Button
                variant="light"
                onClick={() => copiarAlPortapapeles(modalData.valor)}
              >
                Copiar {modalData.tipo}
              </Button>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#343a40', color: '#fff' }}>
            <Button variant="secondary" onClick={cerrarModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <p className="large text-muted">
              Nuestro equipo está compuesto por profesionales con una amplia experiencia en sus respectivas áreas.
              Nos esforzamos por superar las expectativas de nuestros clientes, utilizando las últimas tecnologías 
              y soluciones innovadoras para entregar proyectos de la más alta calidad. ¡Nos encanta lo que hacemos 
              y eso se refleja en nuestro trabajo!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipo;
