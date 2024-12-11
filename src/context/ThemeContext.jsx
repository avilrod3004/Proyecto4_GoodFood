import {createContext, useContext, useEffect, useState} from "react";

// Contexto para gestionar el tema de la aplicación
export const ThemeContext = createContext();

/**
 * Proveedor de contexto que gestiona el tema (modo claro u oscuro) en la aplicación.
 *
 * @param {Object} children - Componentes hijos que serán envueltos por este proveedor.
 * @returns {JSX.Element} El proveedor de contexto con los valores del tema.
 */
const ThemeProvider = ({ children }) => {
    // Función para obtener la preferencia inicial del tema
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            return storedTheme; // Usa el tema almacenado si existe.
        }
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDarkScheme ? "dark" : "light";
    };

    // Estado que almacena el tema actual.
    const [theme, setTheme] = useState(getInitialTheme);

    /**
     * Alternar entre los modos de tema: claro y oscuro.
     *
     * Cambia el valor del tema en el estado y lo guarda en localStorage.
     */
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
