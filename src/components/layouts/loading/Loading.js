import React, { useEffect } from 'react';
import './Loading.css';

export const Loading = () => {
  useEffect(() => {
    /* Manipulación directa del DOM aquí */
    const loader = document.querySelector('.loader');
    const lineWrap = '<div class="loader-line-wrap"><div class="loader-line"></div></div>';
    const img = '<div class="loader-inner">' + lineWrap.repeat(5) + '</div>';
    loader.innerHTML = img;
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <div className="loader"></div>
  );
};
