import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";

/**
 * Menú para navegar entre las páginas principales de la web
 * @returns {Element} Menú de navegación
 */
const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/quickrecipes">Quick recipes</NavLink></li>
                <li><NavLink to="/breakfast">Breakfast</NavLink></li>
                <li><NavLink to="/lunchdinner">Lunch/dinner</NavLink></li>
                <li><NavLink to="/contactus">Contact us</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;