import React from 'react';
import './Empresa.css'; // Importa estilos adicionales si es necesario

const Empresa = () => {
  return (
    <section className="page-section" id="about">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">Empresa</h2>
          <h3 className="section-subheading text-muted">
          En Dosivac, seguimos innovando permanentemente en la búsqueda de soluciones a los requerimientos actuales del mercado y las necesidades energéticas de los puntos más alejados. Esto nos ha llevado a lanzar una nueva línea de equipos solares y eólicos. 
          </h3>
        </div>
        <div className="photo-containers">
          <div className="photo-container">
            <div className="photo" style={{ backgroundImage: 'url(assets/img/portfolio/expresión.webp)' }}></div>
            <div className="text-box">
              <h4>Ingeniería</h4>
              <p>
                Nuestro departamento de ingeniería trabaja junto al cliente para diseñar el sistema de dosificación correcto. Nuestra idea es entregarle una solución óptima a la medida de su requerimiento. En esta área, recibirá asesoría calificada en la definición de las necesidades de bombeo y en la elección de la mejor solución disponible.
              </p>
            </div>
          </div>
          <div className="photo-container">
            <div className="photo" style={{ backgroundImage: 'url(assets/img/portfolio/torno.webp)' }}></div>
            <div className="text-box">
              <h4>Mecanizado y Matricería Propia</h4>
              <p>
                Dosivac cuenta con tornos y centros de mecanizado de última generación para poder atender los estándares de mercado actuales. La precisión al momento de mecanizar es crucial para el resultado final del producto.
              </p>
            </div>
          </div>
          <div className="photo-container">
            <div className="photo" style={{ backgroundImage: 'url(assets/img/portfolio/bombas.webp)' }}></div>
            <div className="text-box">
              <h4>Sistema de Control</h4>
              <p>
                Contamos con salas especiales "aisladas acústicamente" para determinar la excelencia de nuestros productos y la calidad de fabricación.
              </p>
            </div>
          </div>
          <div className="photo-container">
            <div className="photo" style={{ backgroundImage: 'url(assets/img/portfolio/certificaciones.webp)' }}></div>
            <div className="text-box">
              <h4>Certificaciones</h4>
              <p>
                ISO 9001: nuestros procesos internos están certificados y auditados bajo las estrictas normas de control de gestión y procesos de calidad que establece la ISO 9001.<br />
                ISO 14001: A partir del año 2022, tras un alineamiento de concientización interna y en armonía con la preservación del medio ambiente, logramos la certificación ISO 14001.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Empresa;