import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BACKEND_URL } from '../../configLocalHost'; // Asegúrate de que la ruta es correcta
import Encabezado from './Encabezado'; // Importamos el componente Encabezado
import IrInicio from '../IrInicio/IrInicio';

function Refineria() {
  const [backgroundImages, setBackgroundImages] = useState({});
  
  
  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`);
      const assignments = response.data;

      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName, section, photoName } = assignment;

        // Solo obtener las asignaciones para la página Refineria
        if (pageName === 'Refineria') {
          const sectionKey = section.trim().toLowerCase(); // Formateamos la clave para mayor consistencia
          acc[sectionKey] = photoName;
        }

        return acc;
      }, {});

      setBackgroundImages(assignmentsByPage);
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Función para obtener la imagen de fondo basada en el contenido del h2 o encabezado
  const getBackgroundImage = (sectionTitle) => {
    const key = sectionTitle.trim().toLowerCase(); // Aseguramos consistencia en la clave
    console.log(`Buscando imagen de fondo para: ${key}`); // Depuración
    return backgroundImages[key] ? `${BACKEND_URL}/images/fondos/headeres/${backgroundImages[key]}` : null;
  };

  return (
    <div>
      {/* Componente Encabezado con imagen de fondo */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

      {/* Sección: Refinería y Minería */}
      <section
        id="refineria-mineria"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Refinería y Minería: Dosivac en la Industria')
            ? `url(${getBackgroundImage('Refinería y Minería: Dosivac en la Industria')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Refinería y Minería: Dosivac en la Industria</h2>
          <p className="text-center">
            Dosivac se especializa en la creación de soluciones eficientes para las industrias de refinería y minería, proporcionando equipos robustos de dosificación y sistemas de aireación...
          </p>
        </div>
      </section>

      {/* Sección: Equipos de Dosificación para Minería */}
      <section
        id="equipos-dosificacion-mineria"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Equipos de Dosificación para Minería')
            ? `url(${getBackgroundImage('Equipos de Dosificación para Minería')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Equipos de Dosificación para la Minería</h2>
          <p className="text-center">
            Los sistemas de dosificación de Dosivac juegan un papel crucial en el tratamiento de agua, la inyección de químicos y la manipulación de minerales en la minería. Nuestro equipo está diseñado para dosificar con precisión productos químicos como floculantes, reactivos y biocidas, asegurando la máxima eficiencia y seguridad en las operaciones.
          </p>
          <div className="row text-center">
            <div className="col-md-6">
              <img src="assets/img/portfolio/tratamientoEfluenteDosivac.webp" alt="Equipo de Dosificación Minera" className="img-fluid" />
              <h3>Sistema de Dosificación Modular</h3>
              <p>Diseñado para la dosificación de químicos en plantas de tratamiento de efluentes.</p>
            </div>
            <div className="col-md-6">
              <img src="assets/img/portfolio/EquiposMineria.webp" alt="Dosificación de Reactivos" className="img-fluid" />
              <h3>Dosificación de Reactivos</h3>
              <p>Equipos especializados para la dosificación precisa de reactivos en la lixiviación de minerales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Sopladores y Aireadores */}
      <section
        id="sopladores-aireadores"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Sopladores y Aireadores')
            ? `url(${getBackgroundImage('Sopladores y Aireadores')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Sopladores y Aireadores en la Industria</h2>
          <p className="text-center">
            Los sopladores y aireadores de Dosivac son fundamentales en el tratamiento de aguas residuales y en aplicaciones mineras donde es necesario garantizar un suministro de aire constante. Estos equipos están diseñados para proporcionar alta eficiencia y durabilidad en ambientes industriales exigentes.
          </p>
          <div className="image-container" style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="assets/img/portfolio/sopladorMinero2.webp" alt="Soplador Dosivac" className="img-fluid" />
          </div>
          <ul className="list-unstyled text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <li>Alta eficiencia energética.</li>
            <li>Diseño robusto para condiciones extremas.</li>
            <li>Mantenimiento mínimo y máxima durabilidad.</li>
          </ul>
        </div>
      </section>

      {/* Sección: Transporte Neumático en la Minería */}
      <section
        id="transporte-neumatico"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Transporte Neumático en Minería')
            ? `url(${getBackgroundImage('Transporte Neumático en Minería')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Transporte Neumático en la Industria Minera</h2>
          <p className="text-center">
            Dosivac ofrece soluciones innovadoras para el transporte neumático de materiales en la minería. Este método es ideal para el movimiento de polvo y sólidos granulares en procesos de producción minera, garantizando eficiencia y seguridad.
          </p>
          <div className="row">
            <div className="col-md-6">
              <img src="assets/img/portfolio/transporteNeumatico.webp" alt="Sistema de Transporte Neumático" className="img-fluid" />
              <h3>Sistema de Transporte Neumático</h3>
              <p>Diseñado para el transporte eficiente de materiales en polvos y granulares.</p>
            </div>
            <div className="col-md-6">
              <img src="assets/img/portfolio/movimientoMateriales.webp" alt="Equipos de Transporte" className="img-fluid" />
              <h3>Equipos de Transporte de Materiales</h3>
              <p>Soluciones avanzadas para el manejo de materiales en la industria minera.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Control y Supervisión */}
      <section
        id="control-supervision"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Control y Supervisión de Sistemas')
            ? `url(${getBackgroundImage('Control y Supervisión de Sistemas')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Control y Supervisión de Sistemas de Dosificación</h2>
          <p className="text-center">
            Nuestros sistemas de control y supervisión permiten monitorear y ajustar con precisión los procesos de dosificación, asegurando un rendimiento óptimo en cada etapa de la operación. La tecnología avanzada de Dosivac garantiza la automatización y la eficiencia en las aplicaciones industriales más desafiantes.
          </p>
          <div className="row">
            <div className="col-md-6">
              <img src="assets/img/portfolio/equipoMineriaAutomatismo.webp" alt="Control de Procesos" className="img-fluid" />
              <h3>Automatización de Procesos</h3>
              <p>Soluciones para el monitoreo y control automatizado de sistemas de dosificación.</p>
            </div>
            <div className="col-md-6">
              <img src="assets/img/portfolio/TCRMcontrol.webp" alt="Supervisión Remota" className="img-fluid" />
              <h3>Supervisión Remota</h3>
              <p>Monitoreo en tiempo real de parámetros críticos para asegurar una operación eficiente.</p>
            </div>
          </div>
        </div>
      </section>
      <IrInicio/>
    </div>
  );
}

export default Refineria;
