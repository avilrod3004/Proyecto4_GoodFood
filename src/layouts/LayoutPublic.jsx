import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Button from "../components/Button.jsx";
import UserMenu from "./components/UserMenu.jsx";

/**
 * Esquema de las páginas públicas
 * @returns {Element} Esquema
 */
const LayoutPublic = () => {
    return (
        <>
            <header style={{ border: `1px solid black` }}>
                <h1>GoodFood</h1>
                <Navbar/>
                <UserMenu/>
            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPublic;