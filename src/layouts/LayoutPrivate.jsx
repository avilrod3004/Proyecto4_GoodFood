import React, {useContext, useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";
import Header from "./components/Header.jsx";

/**
 * Esquema de las páginas privadas.
 * Este componente protege las rutas privadas al verificar si el usuario está autenticado.
 * Si el usuario no está logueado, será redirigido automáticamente al login.
 *
 * @returns {Element} Componente de esquema para páginas privadas
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