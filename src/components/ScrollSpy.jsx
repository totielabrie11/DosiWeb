import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollSpy = ({ sections, onSectionChange, onTopChange }) => {
  const location = useLocation();

  const handleScroll = useCallback(() => {
    if (location.pathname === '/productos') {
      onSectionChange('productos');
      return;
    }

    let currentSection = 'home'; // Default to 'home'

    // Verifica si onTopChange es una función antes de invocarla
    const isTop = window.scrollY === 0;
    if (typeof onTopChange === 'function') {
      onTopChange(isTop);
    }

    if (isTop) {
      currentSection = 'home'; // Si estamos en el top, estamos en la sección 'home'
    } else {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop - 100;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (window.scrollY >= offsetTop && window.scrollY < offsetBottom) {
            currentSection = section;
          }
        }
      });
    }

    onSectionChange(currentSection);
  }, [sections, location.pathname, onSectionChange, onTopChange]);

  useEffect(() => {
    handleScroll(); // Verifica la posición al montar
    window.addEventListener('scroll', handleScroll); // Escucha el evento de scroll
    return () => {
      window.removeEventListener('scroll', handleScroll); // Limpia el evento
    };
  }, [handleScroll]);

  return null; // No renderizamos nada
};

export default ScrollSpy;
