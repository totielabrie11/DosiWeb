import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const NovedadesDetalle = ({ show, onHide, novedad }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{novedad.text}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    className="d-block w-100 mb-3"
                    src={novedad.image}
                    alt={novedad.text}
                />
                <p>{novedad.span}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NovedadesDetalle;
