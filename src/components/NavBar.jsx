import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import ScrollSpy from './ScrollSpy'; // Asegúrate de importar correctamente el ScrollSpy

function NavBar({ isAdmin, user, handleLogout, activeSection }) {
  const navigate = useNavigate();
  const [isTop, setIsTop] = useState(true); // Estado para manejar si estamos en el top
  const logoTop = 'assets/img/logos/Logoazul.png'; // Logo cuando estamos en el top
  const logoScroll = 'assets/img/logos/Logo.png'; // Logo cuando hacemos scroll
  const sections = ['home', 'novedades', 'about', 'distribuidores', 'contact', 'productos']; // Quitar 'team'

  // Efecto para detectar scroll y cambiar el estado de isTop
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsTop(false);
      } else {
        setIsTop(true);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (anchor) => {
    if (anchor === 'productos') {
      navigate('/productos');
    } else {
      if (window.location.pathname !== '/') {
        navigate('/');
      }

      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const handleSectionChange = (section) => {
    console.log('Sección activa:', section);
  };

  const handleTopChange = (isAtTop) => {
    setIsTop(isAtTop); // Actualiza el estado del logo dependiendo si estamos en el top
  };

  return (
    <>
      {/* ScrollSpy para cambiar las secciones activas en el menú */}
      <ScrollSpy sections={sections} onSectionChange={handleSectionChange} onTopChange={handleTopChange} />

      <Navbar bg={isTop ? "dark" : "light"} variant={isTop ? "dark" : "light"} expand="lg" fixed="top" id="mainNav" className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          {/* Logo dinámico basado en el estado isTop */}
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            <img 
              src={isTop ? logoTop : logoScroll} 
              alt="Logo" 
              className="d-inline-block align-top" 
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Menú desplegable en "Home" */}
              <NavDropdown title="Home" id="home-dropdown" className="text-uppercase">
                <NavDropdown.Item onClick={() => handleNavClick('home')}>Principal</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/petroleo')}>Petróleo</NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/refrigeracion')}>Refrigeración</NavDropdown.Item> {/* Nuevo item para Refrigeración */}
                <NavDropdown.Item onClick={() => navigate('/refineria')}>Refinería</NavDropdown.Item> {/* Nuevo item para Refinería */}
                <NavDropdown.Item onClick={() => navigate('/aguas')}>Aguas</NavDropdown.Item> {/* Nuevo item para Aguas */}
              </NavDropdown>

              {/* Otras secciones de la navegación */}
              <Nav.Link onClick={() => handleNavClick('about')} className={`nav-link text-uppercase ${activeSection === 'about' ? 'active' : ''}`}>
                Empresa
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('distribuidores')} className={`nav-link text-uppercase ${activeSection === 'distribuidores' ? 'active' : ''}`}>
                Distribuidores
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('contact')} className={`nav-link text-uppercase ${activeSection === 'contact' ? 'active' : ''}`}>
                Contáctanos
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick('productos')} className={`nav-link text-uppercase ${activeSection === 'productos' ? 'active' : ''}`}>
                Productos
              </Nav.Link>

              {/* Opciones de administración si el usuario es administrador */}
              {isAdmin && (
                <NavDropdown title="Administrador" id="admin-dropdown" className="text-uppercase">
                  <NavDropdown.Item as={Link} to="/admin/productos">Administrar productos</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/notificaciones">Administrar novedades</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/equipo">Administrar equipo</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/distribuidores">Administrar distribuidores</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/fotografias">Administrar Fotografías</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/videos">Administrar Videos</NavDropdown.Item> {/* Vincula VideoAdmin */}
                </NavDropdown>
              )}
            </Nav>

            {/* Sesión del usuario */}
            <Nav className="ms-auto">
              {user ? (
                <>
                  <span className="navbar-text" style={{ marginRight: '10px' }}>
                    {user.name} ({user.role})
                  </span>
                  <Button variant="outline-danger" onClick={handleLogout} className="btn btn-outline-danger btn-sm text-uppercase">
                    Logout
                  </Button>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-link">
                  <FaCog style={{ fontSize: '1.5em' }} />
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default NavBar;
