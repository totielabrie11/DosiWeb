import React, { useEffect } from 'react';
import Novedades from './Novedades';
import Equipo from './Equipo';
import Distribuidores from './Distribuidores/Distribuidores';
import HomeCarousel from './HomeCarousel';
import Contacto from './Contacto/Contacto'; // Importamos el componente de Contacto
import Mercados from './Mercados/Mercados'; // Importamos el nuevo componente de Mercados
import Empresa from './Empresa/Empresa'; 
import Historia from './Historia/Historia'; 
import SubscriptionNewsLatter from './NewsLatter/SubscriptionNewsLatter'
import IrInicio from './IrInicio/IrInicio'

const Home = () => {

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 0) {
                navbar.classList.add('navbar-shrink');
            } else {
                navbar.classList.remove('navbar-shrink');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Header con el carrusel */}
            <header className="masthead" id="home">
                <HomeCarousel />
                <div className="container">
                    <div className="masthead-subheading">Welcome To Our Studio!</div>
                </div>
            </header>
            
            {/* Sección de Explora Nuestros Mercados */}
            <div id="mercados">
                <Mercados />
            </div>

            {/* Sección de Empresa con su id */}
            <div id="empresa">
                <Empresa />
            </div>

            {/* Sección Historia (excluida del ScrollSpy) */}
            <div id="historia">
                <Historia />
            </div>

            {/* Sección Equipo (excluida del ScrollSpy) */}
            <div id="equipo">
                <Equipo />
            </div>

            {/* Sección Distribuidores */}
            <div id="distribuidores">
                <Distribuidores />
            </div>

            {/* Sección Novedades */}
            <div id="novedades">
                <Novedades />
            </div>

            {/* Sección de Contacto */}
            <div id="contacto">
                <Contacto />
            </div>

            <SubscriptionNewsLatter />
            <IrInicio />

            {/* Footer */}
        </div>
    );
};

export default Home;
