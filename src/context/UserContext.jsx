import {createContext, useEffect, useState} from "react";
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "../config/Firebase.jsx";

export const UserContext = createContext();

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
        return <p>Loading...</p>;
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;