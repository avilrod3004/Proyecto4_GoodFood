import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import Navbar from "./Navbar.jsx";
import {NavLink} from "react-router-dom";
import {logOut} from "../../config/Firebase.jsx";

import DarkModeIcon from "../../assets/moon.svg"

/**
 * Menú de botones del usuario
 * Se muestran los botones para iniciar sesión y registrarse o cerrar sesión
 * @returns {Element} Menu de botones
 */
const UserMenu = () => {
    const {user, setUser} = useContext(UserContext);

    const handleLogout = async () => {
        await logOut();
        setUser(false)
    }
    return (
        <nav className="navegacion__usuario">
            {
                user
                    ?
                    <ul className="usuario__listado">
                        <li className="listado__boton">
                            <NavLink to="/profile" className="boton__opcion">My profile</NavLink>
                        </li>
                        <li className="listado__boton">
                            <NavLink to="/" className="boton__opcion">Edit profile</NavLink>
                        </li>
                        <li className="listado__boton">
                            <NavLink onClick={handleLogout} to="/" className="boton__opcion">Log out</NavLink>
                        </li>
                    </ul>
                    :
                    <ul className="usuario__listado">
                        <li className="listado__boton">
                            <NavLink to="/login" className="boton__opcion">Login</NavLink>
                        </li>
                        <li className="listado__boton">
                            <NavLink to="/register" className="boton__opcion">Sign up</NavLink>
                        </li>
                    </ul>
            }

            <a href="#" className="usuario__tema">
                <img src={DarkModeIcon} alt="Change dark mode" className="tema__imagen"/>
            </a>
        </nav>
    );
};

export default UserMenu;