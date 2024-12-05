import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

/**
 * Esquema de las páginas públicas
 * @returns {Element} Esquema
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