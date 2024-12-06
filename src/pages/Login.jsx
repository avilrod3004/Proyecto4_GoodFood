import React, {useContext, useEffect, useState} from 'react';
import {getUserData, login} from "../config/Firebase.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import {notifyError} from "../utils/Toast.jsx";

/**
 * Formulario de inicio de sesión
 * @returns {Element} Formulario
 */
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
    const [loading, setLoading] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(true);

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchUserData(user.uid);
        }
    }, [user])

    // Obtener los datos del usuario de la base de datos
    const fetchUserData = async (uid) => {
        try {
            setLoading(true);
            const data = await getUserData(uid);

            if (data === null) {
                throw new Error("User not found");
            }

            localStorage.setItem("user", JSON.stringify(data));
            navigate("/profile");

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErrorLogin("Error: " + error);
        }
    };

    // Funciones
    /**
     * Valida que las entradas del usuario sean válidas
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

    /**
     * Inicia la sesión de usuario y lo redirige a su perfil
     * @param event Evento onSubmit
     */
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await login({email: userAccount.email, password: userAccount.password})
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setErrorLogin("Invalid credentials")
            }
        }
    }

    if (loading) return <Loading />;

    return (
        <>
            <img src="/src/assets/img_login.jpeg" alt="Img login"/>
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

                {errorLogin && notifyError(errorLogin, "light")}
            </form>
        </>
    );
};

export default Login;