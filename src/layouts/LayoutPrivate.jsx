import React, {useContext, useEffect} from 'react';
import Navbar from "./components/Navbar.jsx";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";
import {logOut} from "../config/Firebase.jsx";
import UserMenu from "./components/UserMenu.jsx";

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

export default LayoutPrivate;