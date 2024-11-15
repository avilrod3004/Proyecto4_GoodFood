import React from 'react';
import {Link, useRouteError} from "react-router-dom";

const NotFound = () => {
    const error = useRouteError()
    return (
        <>
            <p>{error.status}</p>
            <p>{error.statusText}</p>
            <Link to="/">Volver al menu principal</Link>
        </>
    );
};

export default NotFound;