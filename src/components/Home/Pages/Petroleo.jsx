import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Petroleo.css';
import { BACKEND_URL } from '../../configLocalHost'; // Importar BACKEND_URL desde config.js
import Encabezado from './Encabezado'; // Importamos el componente Encabezado
import IrInicio from '../IrInicio/IrInicio';

function Petroleo() {
  const [backgroundImages, setBackgroundImages] = useState({});

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`);
      const assignments = response.data;

      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName, section, photoName } = assignment;

        if (pageName === "Petroleo") {
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

  // Función para obtener la imagen de fondo basada en el contenido del h2
  const getBackgroundImage = (sectionTitle) => {
    const key = sectionTitle.trim().toLowerCase(); // Aseguramos consistencia en la clave
    return backgroundImages[key] ? `${BACKEND_URL}/images/fondos/headeres/${backgroundImages[key]}` : null;
  };

  return (
    <div>
      {/* Usamos el componente Encabezado */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

      {/* Sección de Especialización en Sistemas */}
      <section
        id="especializacion-sistemas"
        className="text-center"
        style={{
          backgroundImage: getBackgroundImage('Especialización en Sistemas de Dosificación Modulares')
            ? `url(${getBackgroundImage('Especialización en Sistemas de Dosificación Modulares')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: backgroundImages['especialización en sistemas de dosificación modulares']
            ? 'transparent'
            : '#0E0A0A',
        }}
      >
        <h2 className="text-white">
          ESPECIALIZACIÓN EN SISTEMAS DE DOSIFICACIÓN MODULARES
        </h2>
        <p className="text-white">
          Dosivac se especializa en la fabricación de sistemas de dosificación
          modulares (skid) diseñados para aplicaciones industriales exigentes.
          Estos sistemas son fundamentales en la industria petrolera para la
          inyección precisa de químicos en diversos procesos, asegurando la
          precisión y confiabilidad necesarias en operaciones críticas.
        </p>

        <div className="d-flex justify-content-center equipo-container">
          <article className="equipo m-3 text-center" aria-label="Equipo Solar">
            <img
              src="assets/img/portfolio/eqsolar.png"
              alt="Equipos Solares"
              style={{  objectFit: 'contain' }}
            />
            <h3 className="text-white mt-3">EQUIPOS < br/>SOLARES</h3>
            <p>Dimensiones: 60 x 91</p>
            <p>Caudal máximo: 840 l/d</p>
            <p>Presión máxima: 650 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button
              className="contizar-btn"
              onClick={() => alert('Cotización solicitada')}
            >
              Cotizar
            </button>
          </article>

          <article className="equipo m-3 text-center" aria-label="Equipo Neumático">
            <img
              src="assets/img/portfolio/eq400.png"
              alt="Equipos Neumáticos"
              style={{  objectFit: 'contain' }}
            />
            <h3 className="text-white mt-3">EQUIPOS NEUMÁTICOS</h3>
            <p>Dimensiones: 60 x 91</p>
            <p>Caudal máximo: 600 l/d</p>
            <p>Presión máxima: 650 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button
              className="contizar-btn"
              onClick={() => alert('Cotización solicitada')}
            >
              Cotizar
            </button>
          </article>

          <article className="equipo m-3 text-center" aria-label="Equipo Electrónico">
            <img
              src="assets/img/portfolio/eq1000.png"
              alt="Equipos Electrónicos"
              style={{ objectFit: 'contain' }}
            />
            <h3 className="text-white mt-3">EQUIPOS ELECTRÓNICOS</h3>
            <p>Dimensiones: 76 x 100</p>
            <p>Caudal máximo: 5200 l/d</p>
            <p>Presión máxima: 200 kg/cm²</p>
            <p>Opcional para alta presión</p>
            <button
              className="contizar-btn"
              onClick={() => alert('Cotización solicitada')}
            >
              Cotizar
            </button>
          </article>
        </div>
      </section>

      {/* Sección de Tipo de Bombas */}
      <section
  id="tipo-de-bombas"
  className="tipo-de-bombas-section text-center"
  style={{
    backgroundImage: getBackgroundImage('Tipo de Bombas')
      ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${getBackgroundImage('Tipo de Bombas')})`
      : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '50px 20px',
    color: '#ffffff',
  }}
>
  <div className="content-wrapper">
    <h2 className="section-title">APLICACIONES ESPECÍFICAS</h2>
    <p className="section-description">
      Inyección de Inhibidores de Corrosión: Protege equipos y tuberías de la corrosión, prolongando su vida útil.
    </p>
    <p className="section-description">
      Dosificación de Metanol: Previene la formación de hidratos en líneas de gas.
    </p>
    <p className="section-description">
      Control de pH y otros parámetros químicos: Esencial en procesos de tratamiento de agua y otros procesos industriales.
    </p>
    <p className="section-description">
      Inyección de Biocidas y otros agentes químicos: Controla el crecimiento de microorganismos en sistemas de enfriamiento y otros procesos.
    </p>

    <h3 className="sub-title mt-4">TIPOS DE BOMBAS</h3>
    <p className="section-description">
      Bombas Neumáticas (DEN, DENG): Alta capacidad de presión y bajo mantenimiento.
    </p>
    <p className="section-description">
      Bombas Eléctricas (DECI, DE, DE Duplex, DEAP): Robustas, adecuadas para servicio continuo en exteriores.
    </p>
    <p className="section-description">
      Bombas Solares (DES): Operación eficiente en áreas remotas sin energía eléctrica.
    </p>

    <button className="btn-ver-bombas">VER BOMBAS</button>
  </div>
</section>

      {/* Sección de Componentes de Dosificación */}
      <section
        id="componentes-dosificacion"
        className="componentes-dosificacion-section"
        style={{
          backgroundColor: '#0E0A0A',
          color: '#ffffff',
          padding: '50px 20px',
        }}
      >
        <div className="content-wrapper">
          <div className="columns">
            <div className="column left">
              <h2 className="section-title">COMPONENTES DEL SISTEMA DE DOSIFICACIÓN</h2>
              <p><strong>Estructura Modular (Skid)</strong></p>
              <ul>
                <li>Material: Perfilería de acero soldada.</li>
                <li>Recubrimiento: Pintura antioxidio epoxi y poliuretano.</li>
              </ul>

              <p><strong>Sistema de Piping</strong></p>
              <ul>
                <li>Material: Acero inoxidable de alta calidad.</li>
                <li>Función: Transporte de químicos desde los tanques de almacenamiento hasta el punto de inyección.</li>
              </ul>

              <p><strong>Probeta de Calibración</strong></p>
              <ul>
                <li>Descripción: Tubo de vidrio con escala de doble graduación y filtro "Y".</li>
                <li>Función: Calibración precisa del sistema de dosificación.</li>
              </ul>

              <p><strong>Sistema de Válvulas</strong></p>
              <ul>
                <li>Descripción: Válvulas de bloqueo en la salida del tanque y la probeta.</li>
                <li>Función: Aislamiento de componentes para mantenimiento y calibración de la bomba.</li>
              </ul>

              <p><strong>Contenedor de Almacenaje</strong></p>
              <ul>
                <li>Material: Polietileno de alta densidad.</li>
                <li>Capacidades: 200, 400 y 1000 litros.</li>
                <li>Función: Almacenaje seguro de productos químicos con batea de seguridad para evitar derrames.</li>
              </ul>
            </div>

            <div className="column right">
              <h2 className="section-title">CARACTERÍSTICAS DESTACADAS</h2>
              <p><strong>Modularidad y versatilidad</strong></p>
              <p>Adaptabilidad: Los skids son fácilmente adaptables a diferentes aplicaciones y ubicaciones.</p>

              <p><strong>Eficiencia energética</strong></p>
              <p>Uso eficiente de recursos: Diseñados para minimizar el impacto ambiental.</p>

              <p><strong>Alta calidad y seguridad</strong></p>
              <p>Construcción de alta calidad: Fabricados bajo estrictos estándares de calidad, asegurando durabilidad y seguridad operativa.</p>

              <p><strong>Supervisión avanzada</strong></p>
              <p>Control preciso: Sistemas de control y monitoreo avanzados permiten una gestión eficiente del proceso de dosificación.</p>

              <div className="image-container-centered">
                <img
                  src="assets/img/portfolio/6.png"
                  alt="Imagen del sistema de dosificación"
                  className="dosificacion-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sección de Control y Supervisión */}
      <section
        id="control-supervision"
        className="control-supervision-section"
        style={{
          backgroundColor: '#0E0A0A',
          color: '#ffffff',
          padding: '100px 20px',
          minHeight: '600px',
        }}
      >
        <div className="content-wrapper">
          <div className="images-content">
            <div className="image-wrapper">
              <div className="main-image">
                <img
                  src="assets/img/portfolio/7.png"
                  alt="Sistema de dosificación"
                  className="supervision-image"
                />
              </div>
              <div className="secondary-image">
                <img
                  src="assets/img/portfolio/8.png"
                  alt="Controlador TCMR-1"
                  className="control-module-image"
                />
              </div>
            </div>
          </div>

          <div className="text-content">
            <h2 className="section-title">CONTROL Y SUPERVISIÓN</h2>
            <ul className="features-list">
              <li><strong>Tablero Metálico</strong>: Incluye guardamotor y botonera para arranque y parada del sistema.</li>
              <li><strong>Controlador DES</strong>: Sistema de regulación con display LCD para monitoreo y ajuste de parámetros.</li>
            </ul>
            <p className="description">
              <strong>TCMR (Módulo de Tele-supervisión y Control)</strong>: Permite el control local o remoto, monitoreando parámetros críticos como el nivel de tanque, caudal y presión.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Equipos Inteligentes */}
      <section
        id="equipos-inteligentes"
        className="equipos-inteligentes-section text-white"
        style={{
          backgroundImage: getBackgroundImage('Equipos Inteligentes')
            ? `url(${getBackgroundImage('Equipos Inteligentes')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: backgroundImages['equipos inteligentes']
            ? 'transparent'
            : '#0E0A0A',
          padding: '100px 20px',
          position: 'relative',
        }}
      >
        <h2 id="equipos-inteligentes-section-title">EQUIPOS INTELIGENTES</h2>
        <div
          id="equipos-inteligentes-container"
          className="container d-flex align-items-center justify-content-between"
        >
          <div id="text-content" className="text-content" style={{ flex: '1', maxWidth: '50%' }}>
            <p id="equipos-inteligentes-section-description" className="section-description mb-4">
              Nuestros equipos inteligentes están diseñados para mantenerte conectado y en control, equipados con conectividad WiFi y opciones de comunicación como Modbus RTU 485 y radio, garantizando una integración perfecta con tus sistemas existentes.
            </p>
            <button id="equipos-inteligentes-section-btn" className="btn btn-outline-light btn-lg">
              CONOCER MÁS
            </button>
          </div>

          <div id="image-content" className="image-content d-flex justify-content-center align-items-center" style={{ flex: '1' }}>
            <article className="equipo-item mx-3">
              <img src="assets/img/portfolio/9(1).png" alt="Equipos Inteligentes" />
            </article>
            <article className="equipo-item mx-3">
              <img src="assets/img/portfolio/8 (1).png" alt="TCMR-1" />
            </article>
          </div>
        </div>
      </section>
      <IrInicio/>
    </div>
  );
}

export default Petroleo;
