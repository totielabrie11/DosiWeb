import './Footer.css'; // Enlaza tu CSS personalizado
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'; // Importa los iconos de Font Awesome desde react-icons

const Footer = () => {
  return (
    <div id="footer-wrapper" style={{ position: 'relative', minHeight: '100vh' }}>
      <footer id="footer" className="container" style={{ paddingBottom: '100px' }}>
        <div className="row">
          {/* Certificaciones */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Certificaciones</h2>
              <div className="certificaciones">
                <img src="assets/img/logos/iso 9001.png" alt="ISO 9001" />
                <img src="assets/img/logos/iso 14001.png" alt="ISO 14001" />
              </div>
            </section>
          </div>

          {/* Enlaces rápidos */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Enlaces rápidos</h2>
              <ul className="divided">
                <li><a href="/" onClick={(e) => e.preventDefault()}>Soporte técnico</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Sustentabilidad</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Manuales</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Capacitación</a></li>
                <li><a href="/" onClick={(e) => e.preventDefault()}>Distribuidores</a></li>
              </ul>
            </section>
          </div>

          {/* Contacto */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Contacto</h2>
              <p>Dirección: Rivadavia 5945, Loma Hermosa, Provincia de Buenos Aires</p>
              <p>Teléfono: 011 2143-2864</p>
              <h3>Redes sociales</h3>
              <div className="social-icons">
                <a href="/" onClick={(e) => e.preventDefault()}><FaLinkedin /></a>
                <a href="/" onClick={(e) => e.preventDefault()}><FaInstagram /></a>
                <a href="/" onClick={(e) => e.preventDefault()}><FaFacebook /></a>
                <a href="/" onClick={(e) => e.preventDefault()}><FaWhatsapp /></a>
                <a href="/" onClick={(e) => e.preventDefault()}><FaYoutube /></a>
                <a href="/" onClick={(e) => e.preventDefault()}>X</a>
              </div>
            </section>
          </div>

          {/* Nuestra empresa */}
          <div className="col-3 col-6-medium col-12-small">
            <section>
              <h2>Nuestra empresa</h2>
              <div className="empresa-info">
                <img src="assets/img/logos/Logoazul.png" alt="Logo Dosivac" />
                <h3>Filiales</h3>
                <img src="assets/img/logos/Logo.Dosisur.png" alt="Logo Dosisur" />
                <p>Dirección: Mar del Plata 675, Q8300 Neuquén</p>
                <p>Teléfono: 0299 441-3800</p>
              </div>
            </section>
          </div>
        </div>
      </footer>

      {/* Copyright y Redes sociales adicionales */}
      <footer className="footer py-4" style={{ backgroundColor: 'white', position: 'absolute', bottom: 0, width: '100%' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start" style={{ color: '#333' }}>Copyright &copy; Tu Sitio 2024</div>
            <div className="col-lg-4 my-3 my-lg-0">
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="link-dark text-decoration-none me-3" style={{ color: '#333' }} href="#!">Política de Privacidad</a>
              <a className="link-dark text-decoration-none" style={{ color: '#333' }} href="#!">Términos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
