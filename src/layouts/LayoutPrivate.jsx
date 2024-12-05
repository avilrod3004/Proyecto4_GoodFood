import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";
import Header from "./components/Header.jsx";

/**
 * Esquema de las páginas privadas.
 * Simplifica la protección las rutas privadas
 * @returns {Element} Esquema
 */
const LayoutPrivate = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    // Si el usuario no está logueado lo redirige al login
    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    return (
        <>
            <Header/>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPrivate;