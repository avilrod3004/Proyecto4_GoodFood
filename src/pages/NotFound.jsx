import React from 'react';
import {Link, useRouteError} from "react-router-dom";
import errorImageLight from "../assets/error_404_modo_claro.png"
import errorImageDark from "../assets/error_404_modo_oscuro.png"

/**
 * Página de error 404
 * @returns {Element} Página de error
 */
const NotFound = () => {
    const error = useRouteError()
    return (
        <>
            <img src={errorImageLight} alt="Error 404"/>
            <h1>Page not found</h1>
            <p>The page you&#39;re looking for doesn&#39;t exist or has been moved</p>
            <Link to="/">Back to Home</Link>
        </>
    );
};

export default NotFound;