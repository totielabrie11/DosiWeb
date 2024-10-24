import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Aguas.css'; // Archivo CSS específico para el componente
import { BACKEND_URL } from '../../configLocalHost'; // Asegúrate de que la ruta es correcta
import Encabezado from './Encabezado'; // Importamos el componente Encabezado
import IrInicio from '../IrInicio/IrInicio';

function Aguas() {
  const [backgroundImages, setBackgroundImages] = useState({}); // Estado para las imágenes de fondo por sección
  const [sectionTexts, setSectionTexts] = useState({}); // Estado para los textos dinámicos de cada sección
  const [sectionColors, setSectionColors] = useState({
    'equipos-portatiles': '',
    'sistemas-robustos': '',
    'beneficios-dosificacion': '',
    'equipo-dosificacion': '',
    'equipos-cloracion': '#123456',
    'equipo-1000-litros': '',
    'equipo-200-litros': '',
    'seccion-prueba': '#123456', // Color imaginario para la sección de prueba
  });

  // Función para obtener las asignaciones de contenido desde el backend
  const fetchAssignments = useCallback(async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pages/assignments`);
      const assignments = response.data;

      const assignmentsByPage = assignments.reduce((acc, assignment) => {
        const { pageName, section, photoName, description } = assignment;

        if (pageName === "Aguas") {
          const sectionKey = section.trim().toLowerCase(); // Elimina espacios y convierte a minúsculas para comparación
          acc[sectionKey] = {
            photoName: photoName,
            description: description || ''
          };
        }

        return acc;
      }, {});

      // Guardar las imágenes y textos en el estado
      const sectionImages = {};
      const sectionTexts = {};

      Object.keys(assignmentsByPage).forEach((key) => {
        sectionImages[key] = assignmentsByPage[key].photoName;
        sectionTexts[key] = assignmentsByPage[key].description;
      });

      setBackgroundImages(sectionImages);
      setSectionTexts(sectionTexts);

    } catch (error) {
      console.error('Error al obtener las asignaciones:', error);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Función para obtener el nombre de la imagen basado en el contenido del h2
  const getBackgroundImage = (sectionTitle) => {
    const key = sectionTitle.trim().toLowerCase(); // Aseguramos que la clave sea consistente
    return backgroundImages[key] ? `${BACKEND_URL}/images/fondos/headeres/${backgroundImages[key]}` : null;
  };

  return (
    <div>
      {/* Componente Encabezado con imagen de fondo */}
      <Encabezado backgroundImage={backgroundImages.encabezado} />

      {/* Sección de Sistemas de Dosificación */}
      <section
        id="sistemas-robustos"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Sistemas de Dosificación')
            ? `url(${getBackgroundImage('Sistemas de Dosificación')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Sistemas de Dosificación de Alta Calidad</h2>
          <p className="text-center">
            {sectionTexts['sistemas-robustos'] ||
              `En Dosivac, ofrecemos equipos de dosificación diseñados para garantizar la máxima eficiencia y seguridad en el manejo de fluidos. 
              Nuestros sistemas están disponibles en capacidades de 1000 y 200 litros, 
              cada uno adaptado a diferentes requerimientos industriales y de tratamiento de agua.`}
          </p>
          <div className="row text-center">
            <div className="col-md-6">
              <div className="equipo-image" id="equipo-1000-img">
                <div className="image-container">
                  <img
                    src="assets/img/portfolio/equipoAguas1000.png"
                    alt="Equipo Aguas 1000 Litros"
                    className="img-fluid"
                  />
                </div>
              </div>
              <h3>Equipo de 1000 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 60 x 91</li>
                <li><strong>Caudal máximo:</strong> 840 l/d</li>
                <li><strong>Presión máxima:</strong> 650 kg/cm²</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
            <div className="col-md-6">
              <div className="equipo-image" id="equipo-200-img">
                <div className="image-container">
                  <img
                    src="assets/img/portfolio/equipo200.jpg"
                    alt="Equipo de 200 Litros"
                    className="img-fluid"
                  />
                </div>
              </div>
              <h3>Equipo de 200 Litros</h3>
              <ul className="list-unstyled">
                <li><strong>Dimensiones:</strong> 76 x 100</li>
                <li><strong>Caudal máximo:</strong> 5200 l/d</li>
                <li><strong>Presión máxima:</strong> 200 kg/cm²</li>
                <li>Opcional para alta presión</li>
              </ul>
              <button className="btn btn-primary">Cotizar</button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Equipos de Dosificación */}
      <section
        id="equipos-dosificacion"
        className="my-5 equipment-section"
        style={{
          backgroundColor: sectionColors['equipo-dosificacion'] || 'transparent',
          backgroundImage: getBackgroundImage('Equipos de Dosificación')
            ? `url(${getBackgroundImage('Equipos de Dosificación')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h2 className="text-center">Equipos de Dosificación</h2>
        <div className="equipment-block row">
          <div className="equipment col-md-6">
            <h3>EQUIPO DE 1000 LITROS</h3>
            <p>
              Nuestro equipo de 1000 litros está diseñado para operaciones de gran escala, proporcionando una solución robusta y confiable 
              para la dosificación de fluidos. Este sistema incluye:
            </p>
            <ul>
              <li>Tablero Eléctrico: Disponible para equipos con bomba DECI/DDI.</li>
              <li>Probeta de Calibración: Con visualización de nivel para una calibración precisa.</li>
              <li>Válvulas de Maniobra: Facilitan el servicio del filtro y la probeta.</li>
              <li>Contenedor de 1000 Litros: Amplia capacidad para grandes volúmenes.</li>
              <li>Batea Contenedora Antiderrames: De 1100 litros, asegura que cualquier derrame sea contenido.</li>
              <li>Reja para Batea: Con puerta para vaciado eficiente.</li>
              <li>Sistema Anti Hurto: Protección adicional para la batea.</li>
              <li>Ganchos Sujeta Contenedor: Para una mayor estabilidad y seguridad.</li>
              <li>Acople Rápido: Facilita el reemplazo del contenedor.</li>
              <li>Skid Modular: Compacto y liviano para una fácil instalación.</li>
              <li>Gabinete Opcional: Para proteger la bomba.</li>
              <li>Peso: 280kg, dependiendo de la configuración.</li>
            </ul>
          </div>
          <div className="equipment col-md-6">
            <h3>EQUIPO DE 200 LITROS</h3>
            <p>
              El equipo de 200 litros es ideal para operaciones de menor escala que requieren la misma fiabilidad y precisión. Sus características incluyen:
            </p>
            <ul>
              <li>Tablero Eléctrico: Disponible para equipos con bomba DECI/DDI.</li>
              <li>Probeta de Calibración: Con visualización de nivel.</li>
              <li>Válvulas de Maniobra: Para el servicio del filtro y la probeta.</li>
              <li>Tanque de 200 Litros: Adecuado para volúmenes menores.</li>
              <li>Batea Contenedora Antiderrames: De 260 litros para máxima seguridad.</li>
              <li>Reja para Batea: Con puerta para vaciado.</li>
              <li>Sistema Anti Hurto: Protege la batea de posibles robos.</li>
              <li>Suncho Sujeta Tanque: Asegura el tanque firmemente.</li>
              <li>Skid Modular: Compacto y liviano.</li>
              <li>Gabinete Opcional: Para la protección de la bomba.</li>
              <li>Peso: 80kg, dependiendo de la configuración.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sección de Equipos de Cloración */}
      <section
        id="equipos-cloracion"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Serie Aqualine - Equipos de Cloración')
            ? `url(${getBackgroundImage('Serie Aqualine - Equipos de Cloración')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Serie Aqualine - Equipos de Cloración</h2>
          <p className="text-center">
            {sectionTexts['equipos-cloracion'] ||
              `Una línea de equipos modulares para la dosificación, construidos enteramente en polietileno de media densidad (PEMD) de alta resistencia química, compatible con una amplia gama de los productos a dosificar.`}
          </p>
          <div className="image-container-aqualine" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <img
              src="assets/img/portfolio/aqualine.png"
              alt="Equipos de Cloración Aqualine"
              className="img-fluid"
            />
          </div>
          <ul className="list-unstyled" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
            <li>Diseño compacto y modular, de fácil instalación.</li>
            <li>Diseñados para nuestra línea de bombas EMD, EMD Plus y EMD Max.</li>
            <li>Posibilidad de realizar distintas configuraciones y de esta forma lograr dar solución a un sinfín de aplicaciones con el concepto "plug & play".</li>
            <li>Aplicaciones: desinfección de agua potable en depuradoras, pozos de abastecimiento de agua residual, aljibes, zonas rurales, entre otros. Tratamientos de agua para inhibir el crecimiento biológico y control de algas. Cloración de agua potable en barrios, colegios, clubes, cooperativas, industria. Sistemas de tratamiento de agua de enfriamientos.</li>
            <li>El tanque fabricado en material PEMD natural con boca de carga superior y puerto de venteo para gases de cloro. Opcional de 35, 50 y 90 litros.</li>
            <li>Probeta de acrílico incorporada con graduación para medición de caudal y visualización del nivel. Equipada con válvulas de doble vía para realizar maniobras de cubicado de la bomba y mantenimiento.</li>
          </ul>
        </div>
      </section>

      <section
        id="variedad-equipos"
        className="my-5"
        style={{
          backgroundImage: getBackgroundImage('Bombas Dosivac: Innovación y Eficiencia en el Tratamiento de Agua')
            ? `url(${getBackgroundImage('Bombas Dosivac: Innovación y Eficiencia en el Tratamiento de Agua')})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container">
          <h2 className="text-center">Bombas Dosivac: Innovación y Eficiencia en el Tratamiento de Agua</h2>
          <div className="row equipment-list">

            <div className="col-md-6 col-lg-6 variedad-equipos__equipment-item">
              <div className="variedad-equipos__image-container">
                <img src="assets/img/portfolio/emd.png" alt="Bombas EMD" className="img-fluid" />
              </div>
              <h3 className="variedad-equipos__title">Bombas EMD</h3>
              <p className="variedad-equipos__description">
                Las bombas dosificadoras electromagnéticas de la serie EMD han sido especialmente diseñadas para satisfacer los requisitos modernos de funcionalidad y economía de espacio. Ofrecen una solución eficiente y de bajo costo con mínimo mantenimiento para la potabilización y tratamiento general de agua.
              </p>
              <a
                href={`${BACKEND_URL}/productos/EMD`}
                target="_blank"
                rel="noopener noreferrer"
                className="variedad-equipos__btn btn btn-primary"
              >
                Ver Bomba
              </a>
            </div>

            <div className="col-md-6 col-lg-6 variedad-equipos__equipment-item">
              <div className="variedad-equipos__image-container">
                <img src="assets/img/portfolio/emdplus.png" alt="Bombas EMD Plus y EMD Max" className="img-fluid" />
                <img src="assets/img/portfolio/emdmax.png" alt="Bombas EMD Plus y EMD Max" className="img-fluid" />
              </div>
              <h3 className="variedad-equipos__title">Bombas EMD Plus y EMD Max</h3>
              <p className="variedad-equipos__description">
                Las series EMD Plus y EMD Max están desarrolladas para procesos que requieren lazos de control precisos, como potabilización, tratamiento de efluentes y torres de enfriamiento. Sus características incluyen:
              </p>
              <ul className="variedad-equipos__list">
                <li className="variedad-equipos__list-item">Software Intuitivo y Display Gráfico: Facilitan el manejo y la programación.</li>
                <li className="variedad-equipos__list-item">Robusta Electrónica: Resistente a fluctuaciones de tensión en áreas con suministro eléctrico inestable.</li>
                <li className="variedad-equipos__list-item">Sistema de Compensación: Mantiene constante el caudal y la presión incluso con baja tensión de suministro.</li>
              </ul>
              <a
                href={`${BACKEND_URL}/productos/EMDMAX`}
                target="_blank"
                rel="noopener noreferrer"
                className="variedad-equipos__btn btn btn-primary"
              >
                Ver Bomba
              </a>
            </div>

            <div className="col-md-6 col-lg-6 variedad-equipos__equipment-item">
              <div className="variedad-equipos__image-container">
                <img src="assets/img/portfolio/ddi.png" alt="Bomba DDI" className="img-fluid" />
              </div>
              <h3 className="variedad-equipos__title">Bomba DDI</h3>
              <p className="variedad-equipos__description">
                Las bombas DDI, de tipo diafragma y con sistema de carrera perdida, son altamente confiables y robustas para la inyección de aditivos líquidos, siempre que la contrapresión no supere los 10 kg/cm². Ofrecen un amplio rango de caudales, adaptándose a diversas aplicaciones industriales.
              </p>
              <a
                href={`${BACKEND_URL}/productos/DDI.JPG`}
                target="_blank"
                rel="noopener noreferrer"
                className="variedad-equipos__btn btn btn-primary"
              >
                Ver Bomba
              </a>
            </div>

            <div className="col-md-6 col-lg-6 variedad-equipos__equipment-item">
              <div className="variedad-equipos__image-container">
                <img src="assets/img/portfolio/dshc.png" alt="Bomba DSHC" className="img-fluid" />
              </div>
              <h3 className="variedad-equipos__title">Bomba DSHC</h3>
              <p className="variedad-equipos__description">
                Las electrobombas DSHC para vacío requieren mínimo mantenimiento, gracias a su diseño monoblock con motor de accionamiento, y la incorporación de una simple válvula de expulsión tipo flapper. Estas bombas están equipadas con axiales de última generación para una eficiencia máxima.
              </p>
              <a
                href={`${BACKEND_URL}/productos/DSHC`}
                target="_blank"
                rel="noopener noreferrer"
                className="variedad-equipos__btn btn btn-primary"
              >
                Ver Bomba
              </a>
            </div>

            <div className="col-md-6 col-lg-6 variedad-equipos__equipment-item">
              <div className="variedad-equipos__image-container">
                <img src="assets/img/portfolio/soplador.png" alt="Sopladores de Aire" className="img-fluid" />
              </div>
              <h3 className="variedad-equipos__title">Sopladores de Aire</h3>
              <p className="variedad-equipos__description">
                Nuestros sopladores de aire tipo root de desplazamiento positivo trilobulares están diseñados para alta eficiencia, prolongando la vida útil de los rodamientos y reduciendo el nivel de ruido, vibraciones y consumo energético.
              </p>
              <a
                href={`${BACKEND_URL}/productos/soplador`}
                target="_blank"
                rel="noopener noreferrer"
                className="variedad-equipos__btn btn btn-primary"
              >
                Ver Bomba
              </a>
            </div>

          </div>
        </div>
      </section>


        <IrInicio/>



    </div>
  );
}

export default Aguas;
