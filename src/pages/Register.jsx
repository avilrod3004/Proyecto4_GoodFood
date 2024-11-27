import React, {useState} from 'react';
import {register} from "../config/Firebase.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {
    // Estados inciales
    const initialState = {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    const errorMessagesInitial = {
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    const errorRegisterInitial = "";

    // Estados
    const [userAccount, setUserAccount] = useState(initialState)
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial)
    const [errorRegister, setErrorRegister] = useState(errorRegisterInitial)
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

        if (name === "password") {
            const valido = validatePassword(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "El formato de la contraseña no es válido, como mínimo debe contener: 8 caracteres, una letra en mayúscula y un caracter especial"
                })
            }
        }

        if (name === "repeatPassword") {
            if (userAccount.password !== value) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "Las contraseñas no coinciden"
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
     * Valida si la contraseña tiene un formato válido:
     * - 8 caracteres como mínimo,
     * - al menos una letra en mayúscula
     * - al menos un caracter especial entre !@#$%^&*)
     * @param password Contraseña ingresada por el usuario
     * @returns {boolean} True si es válida // False si no es válida
     */
    const validatePassword = password => {
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        return regex.test(password);
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
            await register({email: userAccount.email, password: userAccount.password})
            navigate("/profile");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorRegister("El email indicado ya está en uso")
            }
            console.error(error.code);
            console.log(error.message);
        }
    }

    return (
        <>
            <img src="/img_register.jpeg" alt="Img login"/>
            <h1>Create account</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    User name:
                    <input
                        type="text"
                        name="name"
                        value={userAccount.name}
                        onBlur={handleBlur}
                        onChange={validateInput}
                    />
                    {errorMessages.name !== "" ? <p>{errorMessages.name}</p> : null}
                </label>

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

                <label htmlFor="password">
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

                <label htmlFor="repearPassword">
                    Repear password:
                    <input
                        type="password"
                        name="repeatPassword"
                        value={userAccount.repeatPassword}
                        onBlur={handleBlur}
                        onChange={validateInput}
                    />
                    {errorMessages.repeatPassword !== "" ? <p>{errorMessages.repeatPassword}</p> : null}
                </label>

                <button disabled={disabledSubmit} type="submit">Login</button>
                {errorRegister && <p>{errorRegister}</p>}
            </form>
        </>
    );
};

export default Register;