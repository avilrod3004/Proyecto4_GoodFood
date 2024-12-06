import React, {useContext, useEffect, useState} from 'react';
import {getUserData, register, saveUserData} from "../config/Firebase.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Loading from "../components/Loading.jsx";

/**
 * Formulario de registro de nuevos usuarios
 * @returns {Element} Formulario
 */
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
    const [loading, setLoading] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(true);

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    // Funciones
    /**
     * Valida las entradas del usuario
     * @param event Evento ocurrido en el formulario
     */
    const validateInput = event => {
        const {name, value} = event.target;

        setErrorMessages({
            ...errorMessages,
            [name]: ""
        })

        if (!value.trim()) {
            setErrorMessages({
                ...errorMessages,
                [name]: `This field is required`
            })
        }

        if (name === "email") {
            const valido = validateEmail(value);
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "The email format is invalid"
                })
            }
        }

        if (name === "password") {
            const valido = validatePassword(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "The password format is invalid. It must contain at least: 8 characters, a capital letter and a special character."
                })
            }
        }

        if (name === "repeatPassword") {
            if (userAccount.password !== value) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "Passwords do not match"
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

    /**
     * Registra al usuario y lo redirige a su perfil
     * @param event Evento onSubmit
     */
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await register({email: userAccount.email, password: userAccount.password})
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorRegister("Email is already in use")
            } else {
                setErrorRegister(error.message);
            }
        }
    }

    const saveNewUser = async () => {
        try {
            setLoading(true);
            await saveUserData({...user, password: user.password})
            const data = await getUserData(user.uid);

            if (data === null) {
                throw new Error("User not found");
            }

            localStorage.setItem("user", JSON.stringify(data));

            navigate("/profile");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorRegister("Error: " + error);
        }
    }

    useEffect(() => {
        if (user) {
            saveNewUser();
        }
    }, [user])

    if (loading) return <Loading />;

    return (
        <>
            <img src="/src/assets/img_register.jpeg" alt="Img login"/>
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

                <label htmlFor="repeatPassword">
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

                <button disabled={disabledSubmit} type="submit">Sign up</button>
                {errorRegister && <p>{errorRegister}</p>}
            </form>
        </>
    );
};

export default Register;