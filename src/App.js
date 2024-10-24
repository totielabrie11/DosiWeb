import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home/Home';
import Productos from './components/Productos/Productos';
import ProductAdmin from './components/Productos/ProductAdmin';
import ProductoDetalle from './components/Productos/ProductoDetalle';
import Login from './components/Login';
import ScrollSpy from './components/ScrollSpy';
import NovedadesAdmin from './components/Administrador/NovedadesAdmin';
import EquipoAdmin from './components/Administrador/EquipoAdmin';
import Distribuidores from './components/Home/Distribuidores/Distribuidores';
import DistribuidorAdmin from './components/Administrador/DistribuidorAdmin';
import Footer from './components/Footer/Footer';
import FotosAdmin from './components/Administrador/FotosAdmin';
import Petroleo from './components/Home/Pages/Petroleo';
import Aguas from './components/Home/Pages/Aguas';
import Refrigeracion from './components/Home/Pages/Refrigeracion';
import Refineria from './components/Home/Pages/Refineria';
import VideoAdmin from './components/Administrador/VideoAdmin';


function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  const handleLogout = () => {
    setIsAdmin(false);
    setUser(null);
  };

  const sections = ['home', 'services', 'portfolio', 'novedades', 'about', 'team', 'contact', 'distribuidores'];

  return (
    <Router>
      <div>
        {/* Barra de navegación */}
        <NavBar isAdmin={isAdmin} user={user} handleLogout={handleLogout} activeSection={activeSection} />
        
        {/* ScrollSpy para controlar la sección activa */}
        <ScrollSpy sections={sections} onSectionChange={setActiveSection} />

        {/* Definimos las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:name" element={<ProductoDetalle />} />
          <Route path="/distribuidores" element={<Distribuidores />} />
          <Route path="/petroleo" element={<Petroleo />} />  {/* Ruta para Petroleo */}
          <Route path="/aguas" element={<Aguas />} />  {/* Ruta para Aguas */}
          <Route path="/refrigeracion" element={<Refrigeracion />} />  {/* Ruta para Refrigeracion */}
          <Route path="/refineria" element={<Refineria />} />  {/* Nueva ruta para Refineria */}
          
          {/* Rutas del administrador */}
          {isAdmin && <Route path="/admin/productos" element={<ProductAdmin />} />}
          {isAdmin && <Route path="/admin/notificaciones" element={<NovedadesAdmin />} />}
          {isAdmin && <Route path="/admin/equipo" element={<EquipoAdmin />} />}
          {isAdmin && <Route path="/admin/distribuidores" element={<DistribuidorAdmin />} />}
          {isAdmin && <Route path="/admin/fotografias" element={<FotosAdmin />} />}
          {isAdmin && <Route path="/admin/videos" element={<VideoAdmin />} />}

          {/* Ruta de login */}
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} setUser={setUser} />} />
        </Routes>

        {/* Footer en la parte inferior de la página */}
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
