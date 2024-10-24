import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Novedades.css';
import NovedadesDetalle from './NovedadesDetalle';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config

const Novedades = () => {
    const [novedades, setNovedades] = useState([]);
    const [selectedNovedad, setSelectedNovedad] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch data from the API
        fetch(`${BACKEND_URL}/api/novedades`) // Usa BACKEND_URL aquí
            .then(response => response.json())
            .then(data => setNovedades(data))
            .catch(error => console.error('Error fetching novedades:', error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const handleShowModal = (novedad) => {
        setSelectedNovedad(novedad);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedNovedad(null);
    };

    return (
        <section className="page-section bg-light" id="novedades">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Novedades</h2>
                    <h3 className="section-subheading text-muted">Las últimas actualizaciones y noticias.</h3>
                </div>
                <div className="novedades-carousel-container">
                    <Slider {...settings}>
                        {novedades.map((novedad) => (
                            <div key={novedad.id} className="novedad-item" onClick={() => handleShowModal(novedad)}>
                                <img
                                    className="d-block w-100"
                                    src={novedad.image}
                                    alt={novedad.text}
                                />
                                <div className="novedad-caption w-100">
                                    <h5>{novedad.text}</h5>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                {selectedNovedad && (
                    <NovedadesDetalle
                        show={showModal}
                        onHide={handleCloseModal}
                        novedad={selectedNovedad}
                    />
                )}
            </div>
        </section>
    );
};

export default Novedades;
