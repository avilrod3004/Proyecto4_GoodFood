import React, {useState} from 'react';
import {login} from "../config/Firebase.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    // Estados inciales
    const initialState = {
        email: "",
        password: ""
    }

    const errorMessagesInitial = {
        email: "",
        password: ""
    }

    const errorLoginInitial = "";

    // Estados
    const [userAccount, setUserAccount] = useState(initialState)
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial)
    const [errorLogin, setErrorLogin] = useState(errorLoginInitial)
    const [disabledSubmit, setDisabledSubmit] = useState(true);


    // Funciones
    const validateInput = event => {
        const {name, value} = event.target;

        setErrorMessages({
            ...errorMessages,
            [name]: ""
        })

        if (!value.trim()) {
            setErrorMessages({
                ...errorMessages,
                [name]: `El campo ${name} es obligatorio`
            })
        }

        if (name === "email") {
            const valido = validateEmail(value);
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "El email no tiene un formato válido"
                })
            }
        }

        setUserAccount({
            ...userAccount,
            [name]: value
        })

        validateMessage();
    }

    /**
     * Valida los campos del formulario cuando el campo pierde el foco
     * @param event {Event} - Evento ocurrido en el formulario
     */
    const handleBlur = event => {
        validateInput(event);
    };

    /**
     * Valida si el email del formulario tiene un formato válido
     * @param email {String} Email dado por el usuario
     * @returns {boolean} True si es válido // False si no es válido
     */
    const validateEmail = email => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    /**
     * Valida si el formulario ha sido completado correctamente y si no hay mensajes de error en los campos
     */
    const validateMessage = () => {
        const completedInputs = Object.values(userAccount).every(value => value !== "" || value === true);
        const noErrors = Object.values(errorMessages).every(value => value === "");

        setDisabledSubmit(!(completedInputs && noErrors));
    }

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await login({email: userAccount.email, password: userAccount.password})
            navigate("/profile");
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErrorLogin("Credenciales inválidas")
            }
        }
    }

    return (
        <>
            <img src="/img_login.jpeg" alt="Img login"/>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        name="email"
                        placeholder="email@example.com"
                        value={userAccount.email}
                        onBlur={handleBlur}
                        onChange={validateInput}
                    />
                    {errorMessages.email !== "" ? <p>{errorMessages.email}</p> : null}
                </label>
                <label htmlFor="">
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userAccount.password}
                        onBlur={handleBlur}
                        onChange={validateInput}
                    />
                    {errorMessages.password !== "" ? <p>{errorMessages.password}</p> : null}
                </label>
                <button disabled={disabledSubmit} type="submit">Login</button>
                {errorLogin && <p>{errorLogin}</p>}
            </form>
        </>
    );
};

export default Login;