import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import {NavLink} from "react-router-dom";
import {logOut, saveUserData} from "../../config/Firebase.jsx";
import DarkModeIcon from "../../assets/moon.svg"
import {ToastContainer} from "react-toastify";
import {notifyError, notifySuccess} from "../../utils/Toast.jsx";
import ProfileIcon from "../../assets/user.svg"
import EditIcon from "../../assets/edit.svg"

/**
 * Menú de botones del usuario
 * Se muestran los botones para iniciar sesión y registrarse o cerrar sesión
 * @returns {Element} Menu de botones
 */
const UserMenu = () => {
    const {user, setUser} = useContext(UserContext);

    const handleLogout = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            await saveUserData({
                ...userData,
                uid: user.uid
            })

            await logOut();
            notifySuccess("Bye bye!", "light")
            setUser(false)
        } catch (error) {
            notifyError(`An error has ocurred, could not log out. ${error}`, "light")
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

            <a href="#" className="usuario__tema">
                <img src={DarkModeIcon} alt="Change dark mode" className="tema__imagen"/>
            </a>

            <ToastContainer />
        </nav>
    );
};

export default UserMenu;