import React from 'react';
import Navbar from "./Navbar.jsx";
import UserMenu from "./UserMenu.jsx";
import GoodFoodLogo from "../../assets/GoodFood_logo.svg";

/**
 * Componente que representa el encabezado de la aplicación.
 * Incluye el logo de la marca, la barra de navegación y el menú de usuario.
 *
 * @returns {JSX.Element} El encabezado con el logo, la barra de navegación y el menú de usuario.
 */
const Header = () => {
    return (
        <header className="cabecera">
            <section className="cabecera__navegacion">
                <a className="navegacion__logo" href="/">
                    <img className="logo__imagen" src={GoodFoodLogo} alt="Logo tipo de GoodFood"/>
                </a>

                <Navbar/>
            </section>

            <UserMenu/>
        </header>
    );
};

export default Header;