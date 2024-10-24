import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Crear iconos diferentes para los tipos de distribuidores
const iconosDistribuidores = {
  nacional: new L.DivIcon({
    html: `<div style="color: green; font-size: 24px;"><i class="fas fa-map-marker-alt"></i></div>`, // Marcador verde para nacionales
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  }),
  internacional: new L.DivIcon({
    html: `<div style="color: blue; font-size: 24px;"><i class="fas fa-plane"></i></div>`, // Marcador azul para internacionales
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  }),
  refrigeracion: new L.DivIcon({
    html: `<div style="color: lightblue; font-size: 24px;"><i class="fas fa-snowflake"></i></div>`, // Marcador celeste para refrigeración
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  })
};

// Componente que mueve el mapa según el centro y zoom
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const Mapa = ({ distribuidores, mapCenter, zoom }) => {
  return (
    <MapContainer
      center={mapCenter} // Usar el centro del estado
      zoom={zoom} // Usar el zoom del estado
      style={{ height: "100%", width: "100%" }} // Asegurar que ocupe todo el espacio
      scrollWheelZoom={true} // Permitir zoom con el scroll
    >
      <ChangeView center={mapCenter} zoom={zoom} /> {/* Cambiar la vista al distribuidor seleccionado */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {distribuidores.map((distribuidor, idx) => (
        <Marker 
          key={idx} 
          position={distribuidor.posicion} 
          icon={iconosDistribuidores[distribuidor.tipo]} // Cambiamos el icono según el tipo
        >
          <Popup>
            <strong>{distribuidor.nombre}</strong><br />
            {distribuidor.direccion}, {distribuidor.provincia}<br />
            Teléfono: {distribuidor.telefono}<br />
            Email: {distribuidor.mail}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Mapa;
