import React from 'react';
import {Link, useRouteError} from "react-router-dom";

/**
 * Página de error 404
 * @returns {Element} Página de error
 */
const NotFound = () => {
    const error = useRouteError()
    return (
        <>
            <h1>Error 404</h1>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
            <Link to="/">Volver al menu principal</Link>
        </>
    );
};

export default NotFound;