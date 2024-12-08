import React from 'react';
import ErrorIcon from "../assets/error.svg"

/**
 * Componente `ErrorMessage`
 * Este componente se muestra cuando ocurre un error inesperado en la aplicación.
 * Muestra un mensaje de error con un icono que indica visualmente que algo salió mal,
 * solicitando al usuario que recargue la página o intente más tarde.
 *
 * @returns {JSX.Element} Un componente visual que muestra un mensaje de error con un icono.
 */
const ErrorMessage = () => {
    return (
        <main className="error">
            <img className="error__imagen" src={ErrorIcon} alt="!"/>
            <p className="error__mensaje">Oops! An unexpected error has ocurred. Please refresh the page or try again later.</p>
            <img className="error__imagen" src={ErrorIcon} alt="!"/>
        </main>
    );
};

export default ErrorMessage;