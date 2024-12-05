import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Button from "../components/Button.jsx";
import UserMenu from "./components/UserMenu.jsx";
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