import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Refrigeracion.css';
import { BACKEND_URL } from '../../configLocalHost'; // Importa la URL desde el archivo config
import Encabezado from './Encabezado'; // Importamos el componente Encabezado
import IrInicio from '../IrInicio/IrInicio';

function Refrigeracion() {
  const [backgroundImages, setBackgroundImages] = useState({});
  const sectionRefs = useRef({ aplicaciones: [], mantenimiento: [] });

  const normalizeString = (str) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Elimina acentos
  };

  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`); // Usa BACKEND_URL aquí
      const assignments = response.data;

      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName } = assignment;
        const normalizedPageName = normalizeString(pageName);
        if (!acc[normalizedPageName]) {
          acc[normalizedPageName] = [];
        }
        acc[normalizedPageName].push(assignment);
        return acc;
      }, {});

      if (assignmentsByPage.refrigeracion) {
        const sectionImages = {};
        assignmentsByPage.refrigeracion.forEach((assignment) => {
          const normalizedSection = normalizeString(assignment.section);
          const photoName = assignment.photoName;
          sectionImages[normalizedSection] = photoName;
        });

        setBackgroundImages(sectionImages);
      }
    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  useEffect(() => {
    console.log('Imagen de encabezado:', backgroundImages.encabezado);
  }, [backgroundImages]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const aplicacionesRefs = sectionRefs.current.aplicaciones;
    const mantenimientoRefs = sectionRefs.current.mantenimiento;

    aplicacionesRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    mantenimientoRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      aplicacionesRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      mantenimientoRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const assignRef = (section, index, el) => {
    if (!sectionRefs.current[section]) {
      sectionRefs.current[section] = [];
    }
    sectionRefs.current[section][index] = el;
  };

  return (
    <div>
      {/* Componente Encabezado con la imagen de fondo */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

      {/* Sección: Bombas de Vacío */}
      <section
        id="bombas de vacío"
        className="my-5 bombas-vacio-section"
        style={{
          backgroundImage: backgroundImages[normalizeString('bombas de vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('bombas de vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="bombas-vacio-header">Bombas de Vacío</h2>
        <p className="bombas-vacio-description">
          LAS BOMBAS DE VACÍO DE DOSIVAC OFRECEN EFICIENCIA, DURABILIDAD Y ALTO RENDIMIENTO PARA APLICACIONES INDUSTRIALES EXIGENTES.
        </p>

        <div className="container mt-4">
          <div className="row bombas-vacio-product-row">
            {/* DVRII */}
            <div className="col-md-4 mb-4 bombas-vacio-product-col">
              <div className="card h-100 bombas-vacio-product-card">
                <img src="assets/img/portfolio/DVRII.png" className="card-img-top bombas-vacio-product-img" alt="DVRII" />
                <div className="card-body bombas-vacio-product-body">
                  <h5 className="card-title bombas-vacio-product-title">DVRII</h5>
                  <p className="card-text bombas-vacio-product-text">Bomba de Vacío Doble Etapa Legendaria. Conocida por su robustez y fiabilidad en aplicaciones de refrigeración industrial.</p>
                  <ul className="bombas-vacio-product-list">
                    <li>Modelos Disponibles: 1A, 2A, 3A, 4A</li>
                  </ul>
                  <button className="btn btn-primary bombas-vacio-btn">VER BOMBA</button>
                </div>
              </div>
            </div>

            {/* Supervac */}
            <div className="col-md-4 mb-4 bombas-vacio-product-col">
              <div className="card h-100 bombas-vacio-product-card">
                <img src="assets/img/portfolio/supervac.webp" className="card-img-top bombas-vacio-product-img" alt="Supervac" />
                <div className="card-body bombas-vacio-product-body">
                  <h5 className="card-title bombas-vacio-product-title">Supervac</h5>
                  <p className="card-text bombas-vacio-product-text">Bomba de Vacío para Refrigeración Inicial. Ideal para iniciar procesos de refrigeración de manera eficiente.</p>
                  <ul className="bombas-vacio-product-list">
                    <li>Modelos Disponibles: VP1, VP2</li>
                  </ul>
                  <button className="btn btn-primary bombas-vacio-btn">VER BOMBA</button>
                </div>
              </div>
            </div>

            {/* DVR6 New Gen */}
            <div className="col-md-4 mb-4 bombas-vacio-product-col">
              <div className="card h-100 bombas-vacio-product-card">
                <img src="assets/img/portfolio/DVR6.png" className="card-img-top bombas-vacio-product-img" alt="DVR6 New Gen" />
                <div className="card-body bombas-vacio-product-body">
                  <h5 className="card-title bombas-vacio-product-title">DVR6 New Gen</h5>
                  <p className="card-text bombas-vacio-product-text">Bomba de Vacío de última generación. Ofrece un rendimiento superior con eficiencia energética optimizada para las aplicaciones más exigentes.</p>
                  <ul className="bombas-vacio-product-list">
                    <li>Modelos Disponibles: 6A, 6B</li>
                  </ul>
                  <button className="btn btn-primary bombas-vacio-btn">VER BOMBA</button>
                </div>
              </div>
            </div>

            {/* Recuperadora */}
            <div className="col-md-4 mb-4 bombas-vacio-product-col">
              <div className="card h-100 bombas-vacio-product-card">
                <img src="assets/img/portfolio/recuperadoras.webp" className="card-img-top bombas-vacio-product-img" alt="Recuperadora" />
                <div className="card-body bombas-vacio-product-body">
                  <h5 className="card-title bombas-vacio-product-title">Recuperadora</h5>
                  <p className="card-text bombas-vacio-product-text">Bomba Recuperadora de Gases. Diseñada para la recuperación eficiente de gases refrigerantes, contribuyendo a la sostenibilidad.</p>
                  <ul className="bombas-vacio-product-list">
                    <li>Modelo Disponible: RECUPERADORA</li>
                  </ul>
                  <button className="btn btn-primary bombas-vacio-btn">VER BOMBA</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Aplicaciones en Refrigeración */}
      <section
        id="aplicaciones-refrigeracion"
        className="my-5"
        style={{
          backgroundImage: backgroundImages[normalizeString('Aplicaciones en Refrigeración')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Aplicaciones en Refrigeración')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div ref={el => assignRef('aplicaciones', 0, el)} className="aplicaciones-refrigeracion-container">
          <h2>Aplicaciones en Refrigeración</h2>
        </div>
        <div ref={el => assignRef('aplicaciones', 1, el)} className="aplicaciones-refrigeracion-container">
          <p>
            Las bombas de vacío juegan un rol crucial en los sistemas de refrigeración, permitiendo una extracción eficiente de gases y asegurando un rendimiento óptimo en la transferencia de calor.
          </p>
        </div>
        <div ref={el => assignRef('aplicaciones', 2, el)} className="aplicaciones-refrigeracion-container">
          <p>
            El proceso de hacer vacío es fundamental para eliminar cualquier humedad presente dentro del circuito de refrigeración. La humedad puede causar problemas graves, como la formación de hielo en el sistema, lo cual compromete su eficiencia y puede llevar a fallas costosas.
          </p>
        </div>
        <div ref={el => assignRef('aplicaciones', 3, el)} className="aplicaciones-refrigeracion-container">
          <p>
            Además, durante la instalación o el mantenimiento de los sistemas de refrigeración, es posible que se produzcan pequeñas pinchaduras en los caños. Estas pinchaduras permiten la entrada de aire y humedad, lo cual debe ser eliminado mediante un proceso de vacío adecuado para asegurar un funcionamiento sin problemas.
          </p>
        </div>
        <div ref={el => assignRef('aplicaciones', 4, el)} className="aplicaciones-refrigeracion-container">
          <p>
            La presencia de gases no condensables en el circuito también disminuye la eficiencia de la transferencia de calor, lo cual afecta directamente el rendimiento del sistema de refrigeración. Las bombas de vacío ayudan a asegurar que solo el refrigerante esté presente en el circuito, garantizando un rendimiento óptimo.
          </p>
        </div>
        <div ref={el => assignRef('aplicaciones', 5, el)} className="aplicaciones-refrigeracion-container">
          <p>
            Finalmente, hacer un buen vacío ayuda a prevenir la corrosión interna del sistema. La humedad en combinación con ciertos refrigerantes puede crear ácidos que dañan las tuberías y los componentes internos, lo cual reduce la vida útil del sistema.
          </p>
        </div>
      </section>

      {/* Sección: Mantenimiento Preventivo de Sistemas de Vacío */}
      <section
        id="mantenimiento-preventivo"
        className="my-5"
        style={{
          backgroundImage: backgroundImages[normalizeString('Mantenimiento Preventivo de Sistemas de Vacío')] ? `url(/images/fondos/headeres/${backgroundImages[normalizeString('Mantenimiento Preventivo de Sistemas de Vacío')]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div ref={el => assignRef('mantenimiento', 0, el)} className="mantenimiento-preventivo-container">
          <h2>Mantenimiento Preventivo de Sistemas de Vacío</h2>
        </div>
        <div ref={el => assignRef('mantenimiento', 1, el)} className="mantenimiento-preventivo-container">
          <p>
            El mantenimiento preventivo es esencial para prolongar la vida útil de los sistemas de vacío y garantizar un rendimiento óptimo. Descubre nuestras recomendaciones para el mantenimiento periódico.
          </p>
        </div>
        <div ref={el => assignRef('mantenimiento', 2, el)} className="mantenimiento-preventivo-container">
          <p>
            Las bombas consumen aceite y, durante el funcionamiento, almacenan humedad que condensa en forma de agua, la cual puede confundirse con el aceite. Es fundamental cambiar periódicamente el aceite para evitar daños en el sistema.
          </p>
        </div>
        <div ref={el => assignRef('mantenimiento', 3, el)} className="mantenimiento-preventivo-container">
          <p>
            Es recomendable revisar los filtros de entrada y salida de la bomba para asegurar que no estén obstruidos, lo cual podría comprometer el rendimiento y la eficiencia del equipo.
          </p>
        </div>
        <div ref={el => assignRef('mantenimiento', 4, el)} className="mantenimiento-preventivo-container">
          <p>
            Mantener las conexiones y mangueras en buen estado es crucial para evitar fugas de aire y garantizar un vacío adecuado en los sistemas.
          </p>
        </div>
        <div ref={el => assignRef('mantenimiento', 5, el)} className="mantenimiento-preventivo-container">
          <p>
            Realizar inspecciones periódicas de los sellos y juntas, ya que un desgaste en estos componentes puede afectar la capacidad de la bomba para mantener el vacío.
          </p>
        </div>
        <div ref={el => assignRef('mantenimiento', 6, el)} className="mantenimiento-preventivo-container">
          <p>
            No sobrecargar las bombas, respetando los límites de operación recomendados, ayuda a evitar el desgaste prematuro de los componentes y a prolongar la vida útil del equipo.
          </p>
        </div>
      </section>
      <IrInicio/>
    </div>
  );
}

export default Refrigeracion;
