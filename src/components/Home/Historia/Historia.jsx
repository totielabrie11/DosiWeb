import React from 'react';
import './Historia.css'; // Importa el CSS existente para mantener la coherencia de estilo

const Historia = () => {
  return (
    <section className="page-section" id="historia">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Historia de la Empresa</h2>
          <h3 className="section-subheading text-muted">
            Dosivac SA, fundada en 1980, es una empresa líder en la fabricación de bombas dosificadoras y de vacío.
            Nos esforzamos por ofrecer productos de alta calidad que proporcionen soluciones eficientes a nuestros clientes.
            Nuestra misión es garantizar la mejor relación precio-calidad del mercado, acompañada de un servicio postventa que asegura la total satisfacción del cliente.
            Contamos con un grupo humano calificado y competente que trabaja en un ambiente laboral incentivador y comprometido con la responsabilidad social.
            Nuestro equipo está dedicado a ampliar continuamente nuestra gama de productos y soluciones para satisfacer las necesidades cambiantes de nuestros clientes.
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Historia;