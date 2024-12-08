import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

/**
 * Esquema de las páginas públicas.
 * Este componente define el diseño común para todas las páginas públicas de la aplicación.
 * Incluye el encabezado y pie de página, con el contenido principal renderizado en el lugar del Outlet.
 *
 * @returns {Element} Esquema para las páginas públicas
 */
const LayoutPublic = () => {
    return (
        <>
            <Header/>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPublic;