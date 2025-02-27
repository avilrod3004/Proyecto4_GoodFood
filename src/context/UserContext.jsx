import {createContext, useEffect, useState} from "react";
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "../config/Firebase.jsx";
import Loading from "../components/Loading.jsx";

// Contexto para gestionar el estado del usuario autenticado
export const UserContext = createContext();

/**
 * Proveedor de contexto que gestiona el estado de autenticación del usuario.
 * Utiliza Firebase para detectar si un usuario está autenticado.
 *
 * @param {Object} children - Componentes hijos que serán envueltos por este proveedor.
 * @returns {JSX.Element} El proveedor de contexto con el estado del usuario.
 */
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false);

    // Observador para detectar usuarios logueados
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
        })
    }, [])

    if (user === null) {
        return <Loading/>;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;