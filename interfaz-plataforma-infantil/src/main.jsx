import React from 'react';
import ReactDOM from 'react-dom/client';
import EnrutadorPrincipal from './EnrutadorPrincipal';
import './estilos/globales.css';

const raiz_aplicacion = ReactDOM.createRoot(document.getElementById('root'));

raiz_aplicacion.render(
  <React.StrictMode>
    <EnrutadorPrincipal />
  </React.StrictMode>
);