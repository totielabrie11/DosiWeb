import React from 'react';
import './Mercados.css'; // Importamos el archivo CSS para estilos específicos de Mercados

const Mercados = () => {
    return (
        <section className="page-section" id="mercados">
            <div className="container text-center">
                <h2 className="section-heading text-uppercase">Explora Nuestros Mercados</h2>
                <h3 className="section-subheading text-muted">Soluciones a medida</h3>
                <div className="row mt-5">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <img src="assets/img/Iconos/petroleum.png" alt="Oil & Gas" className="img-fluid mb-3 icon-image" />
                        <div className="card h-100 text-center p-3 mercado-card">
                            <h3>Oil & Gas</h3>
                            <p className="mercado-paragraph">En el sector petrolero, Dosivac suministra EQUIPOS y bombas, dosificadoras y de vacío diseñadas para soportar condiciones extremas, asegurando la precisión y la seguridad en la extracción y el procesamiento de petróleo y gas.</p>
                            <button onClick={() => alert('Saber más')} className="btn btn-primary mercado-button">Saber más</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <img src="assets/img/Iconos/manufacturer.png" alt="Aguas, industria y tratamiento de efluentes" className="img-fluid mb-3 icon-image" />
                        <div className="card h-100 text-center p-3 mercado-card">
                            <h3>Aguas, industrias y tratamiento de efluentes</h3>
                            <p className="mercado-paragraph">Para el tratamiento de agua y aplicaciones industriales, Dosivac proporciona equipos que optimizan el manejo y la distribución de fluidos, contribuyendo a procesos más eficientes y sostenibles en la purificación, distribución y gestión del agua.</p>
                            <button onClick={() => alert('Saber más')} className="btn btn-primary mercado-button">Saber más</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <img src="assets/img/Iconos/coal.png" alt="Minería & Refinería" className="img-fluid mb-3 icon-image" />
                        <div className="card h-100 text-center p-3 mercado-card">
                            <h3>Minería & Refinería</h3>
                            <p className="mercado-paragraph">Dosivac ofrece soluciones robustas y confiables para la minería y refinería, incluyendo bombas y equipos de vacío que soportan ambientes rigurosos, mejorando la eficiencia y la seguridad en las operaciones mineras.</p>
                            <button onClick={() => alert('Saber más')} className="btn btn-primary mercado-button">Saber más</button>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <img src="assets/img/Iconos/oil-industry.png" alt="Refrigeración y vacío industrial" className="img-fluid mb-3 icon-image" />
                        <div className="card h-100 text-center p-3 mercado-card">
                            <h3>Refrigeración y vacío industrial</h3>
                            <p className="mercado-paragraph">Nuestras tecnologías de última generación están diseñadas para cumplir con los más altos estándares de calidad, garantizando un rendimiento óptimo en una amplia gama de aplicaciones industriales.</p>
                            <button onClick={() => alert('Saber más')} className="btn btn-primary mercado-button">Saber más</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mercados;