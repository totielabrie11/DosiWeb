import React, { useState, useEffect } from 'react';
import { BACKEND_URL } from '../configLocalHost'; // Importa la URL desde el archivo config
import './ProductFilter.css';

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    tipoBomba: '',
    tipoAplicacion: '',
    tipoIndustria: '',
    tipoBombaDosificadora: '',
    subTipoBombaDosificadora: '',
    marcaBomba: '',
    tipoAccionamiento: '',
  });

  const [tipoProductoOptions, setTipoProductoOptions] = useState([]);
  const [aplicacionOptions, setAplicacionOptions] = useState([]);
  const [allAplicacionOptions, setAllAplicacionOptions] = useState([]);
  const [tipoIndustriaOptions, setTipoIndustriaOptions] = useState([]);
  const [subTipoBombaDosificadoraOptions, setSubTipoBombaDosificadoraOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const fetchProductos = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/product-descriptions`); // Usa BACKEND_URL aquí
      const data = await response.json();
      const tiposDeProducto = new Set();
      const tiposDeAplicacion = new Set();
      const tiposDeIndustria = new Set();
      data.forEach(product => {
        if (Array.isArray(product.caracteristicas)) {
          product.caracteristicas.forEach(caracteristica => {
            const tipoMatch = caracteristica.match(/Tipo de Producto: (.*)/i);
            if (tipoMatch) {
              const tipo = tipoMatch[1].trim();
              tiposDeProducto.add(tipo);
            }
            const aplicacionMatch = caracteristica.match(/Aplicación: (.*)/i);
            if (aplicacionMatch) {
              const aplicacion = aplicacionMatch[1].trim();
              tiposDeAplicacion.add(aplicacion);
            }
            const industriaMatch = caracteristica.match(/Industria: (.*)/i);
            if (industriaMatch) {
              const industria = industriaMatch[1].trim();
              tiposDeIndustria.add(industria);
            }
          });
        }
      });
      setTipoProductoOptions([...tiposDeProducto]);
      setAllAplicacionOptions([...tiposDeAplicacion]);
      setAplicacionOptions([...tiposDeAplicacion]);
      setTipoIndustriaOptions([...tiposDeIndustria]);
    } catch (error) {
      console.error('Failed to fetch product descriptions:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  useEffect(() => {
    const updateAplicacionOptions = () => {
      if (filters.tipoBomba === 'Bomba de vacío') {
        setAplicacionOptions(['Refrigeración', 'Vacío industrial']);
      } else if (filters.tipoBomba === 'soplador') {
        setAplicacionOptions(allAplicacionOptions.filter(option => !['Refrigeración', 'Vacío industrial'].includes(option)));
      } else if (filters.tipoBomba === 'Bomba Dosificadora') {
        setAplicacionOptions(allAplicacionOptions.filter(option => !['Refrigeración', 'Vacío industrial'].includes(option)));
      } else {
        setAplicacionOptions(allAplicacionOptions);
      }
    };

    if (allAplicacionOptions && Array.isArray(allAplicacionOptions)) {
      updateAplicacionOptions();
    }
  }, [filters.tipoBomba, allAplicacionOptions]);

  useEffect(() => {
    const updateSubTipoBombaDosificadoraOptions = () => {
      if (filters.tipoBombaDosificadora === 'Electromagnética') {
        setSubTipoBombaDosificadoraOptions(['EMD', 'EMD-PLUS', 'MI-EMD', 'EMD MAX']);
      } else if (filters.tipoBombaDosificadora === 'Diafragma') {
        setSubTipoBombaDosificadoraOptions(['DDI', 'DDI DUPLEX', 'DAN', 'DAN DUPLEX']);
      } else if (filters.tipoBombaDosificadora === 'Pistón') {
        setSubTipoBombaDosificadoraOptions(['DECI', 'DE', 'DEAP', 'DES', 'DENG', 'DEON']);
      } else {
        setSubTipoBombaDosificadoraOptions([]);
      }
    };

    updateSubTipoBombaDosificadoraOptions();
  }, [filters.tipoBombaDosificadora]);

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  return (
    <div className="product-filter">
      <h2>Filtrar por:</h2>
      <div className="filter-section">
        <label>Tipo de Producto</label>
        <select name="tipoBomba" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {tipoProductoOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Para Sistemas</label>
        <select name="tipoAplicacion" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {aplicacionOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-section">
        <label>Campo de Aplicación</label>
        <select name="tipoIndustria" onChange={handleChange}>
          <option value="">Seleccionar</option>
          {tipoIndustriaOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {filters.tipoBomba === 'Dosificadora' && (
        <div className="filter-section">
          <label>Tipo de Accionamiento</label>
          <select name="tipoAccionamiento" onChange={handleChange}>
            <option value="">Seleccionar</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Eléctrico solar">Eléctrico solar</option>
            <option value="A Palanca">A Palanca</option>
            <option value="Neumático">Neumático</option>
          </select>
        </div>
      )}
      {filters.tipoBomba === 'Dosificadora' && (
        <>
          <div className="filter-section">
            <label>Tipo de Bomba Dosificadora</label>
            <select name="tipoBombaDosificadora" onChange={handleChange}>
              <option value="">Seleccionar</option>
              <option value="Electromagnética">Electromagnética</option>
              <option value="Diafragma">Diafragma</option>
              <option value="Pistón">Pistón</option>
            </select>
          </div>
          {filters.tipoBombaDosificadora && (
            <div className="filter-section">
              <label>Sub Tipo de Bomba Dosificadora</label>
              <select name="subTipoBombaDosificadora" onChange={handleChange}>
                <option value="">Seleccionar</option>
                {subTipoBombaDosificadoraOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductFilter;
