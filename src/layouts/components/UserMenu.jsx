import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import Navbar from "./Navbar.jsx";
import {NavLink} from "react-router-dom";
import {logOut} from "../../config/Firebase.jsx";

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
        <>
            {
                user
                    ? <>
                        <NavLink to="/profile">My profile</NavLink>
                        <NavLink to="/">Edit profile</NavLink>
                        <NavLink onClick={handleLogout} to="/">Log out</NavLink>
                    </>
                    : <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Sign up</NavLink>
                    </>
            }
        </>
    );
};

export default UserMenu;