import React from 'react';
import ErrorIcon from "../assets/error.svg"

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