import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import {NavLink} from "react-router-dom";
import {logOut, saveUserData} from "../../config/Firebase.jsx";
import DarkModeIcon from "../../assets/moon.svg"
import LightModeIcon from "../../assets/sun.svg"
import {ToastContainer} from "react-toastify";
import {notifyError, notifySuccess} from "../../utils/Toast.jsx";
import ProfileIcon from "../../assets/user.svg"
import EditIcon from "../../assets/edit.svg"
import {ThemeContext} from "../../context/ThemeContext.jsx";
import IconMenu from "../../assets/menu.svg"

/**
 * Menú de botones del usuario.
 * Se muestran los botones para iniciar sesión y registrarse o cerrar sesión, además de un botón para cambiar el tema de la aplicación.
 *
 * @returns {Element} Menú de usuario con opciones según el estado de autenticación.
 */
const UserMenu = () => {
    const {user, setUser} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);

    /**
     * Maneja el proceso de cierre de sesión.
     * Guarda los datos del usuario en la base de datos antes de cerrar sesión y mostrar una notificación de éxito.
     */
    const handleLogout = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            await saveUserData({
                ...userData,
                uid: user.uid
            })

            await logOut();
            notifySuccess("Bye bye!", theme)
            setUser(false)
        } catch (error) {
            notifyError(`An error has ocurred, could not log out. ${error}`, theme)
        }
    }

    return (
        <nav className="navegacion__usuario">
            {
                user
                    ?
                    <ul className="usuario__listado">
                        <li className="listado__boton-user">
                            <NavLink to="/profile" className="boton-user__opcion">
                                <img className="boton__imagen" src={ProfileIcon} alt="My profile" title="View profile"/>
                            </NavLink>
                        </li>
                        <li className="listado__boton-user">
                            <NavLink to="/profile/update" className="boton-user__opcion">
                                <img className="boton__imagen" src={EditIcon} alt="Edit profile" title="Edit profile"/>
                            </NavLink>
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

            <a onClick={toggleTheme} className="usuario__tema">
                {
                    theme === "light"
                        ? <img src={DarkModeIcon} alt="Change dark mode" className="tema__imagen"/>
                        : <img src={LightModeIcon} alt="Change light mode" className="tema__imagen"/>
                }
            </a>

            <a className="usuario__menu">
                <img src={IconMenu} alt="Menu" className="menu__icono"/>
            </a>

            <ToastContainer/>
        </nav>
    );
};

export default UserMenu;