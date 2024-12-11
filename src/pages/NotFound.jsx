import React, {useContext} from 'react';
import {Link, useRouteError} from "react-router-dom";
import errorImageLight from "../assets/error_404_modo_claro.png"
import errorImageDark from "../assets/error_404_modo_oscuro.png"
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Página de error 404 que se muestra cuando la ruta no existe
 *
 * @returns {Element} - Página que muestra un mensaje de error y un enlace a la página de inicio
 */
const NotFound = () => {
    const error = useRouteError();
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <main className="not-found">
            <img className="not-found__imagen" src={theme === "light" ? errorImageLight : errorImageDark} alt="Error 404"/>
            <h1 className="not-found__titulo">Page not found</h1>
            <p className="not-found__mensaje">The page you&#39;re looking for doesn&#39;t exist or has been moved</p>
            <Link className="not-found__enlace" to="/">Back to Home</Link>
        </main>
    );
};

export default NotFound;