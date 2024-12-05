import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";

/**
 * Menú para navegar entre las páginas principales de la web
 * @returns {Element} Menú de navegación
 */
const Navbar = () => {
    return (
        <nav className="navegacion__menu">
            <h1 className="menu__nombre">GoodFood</h1>
            <ul className="menu__listado">
                <li className="listado__opcion">
                    <NavLink to="/" className="opcion__enlace">Home</NavLink>
                </li>
                <li className="listado__opcion">
                    <NavLink to="/quickrecipes" className="opcion__enlace">Quick recipes</NavLink>
                </li>
                <li className="listado__opcion">
                    <NavLink to="/breakfast" className="opcion__enlace">Breakfast</NavLink>
                </li>
                <li className="listado__opcion">
                    <NavLink to="/lunchdinner" className="opcion__enlace">Lunch/dinner</NavLink>
                </li>
                <li className="listado__opcion">
                    <NavLink to="/contactus" className="opcion__enlace">Contact us</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;