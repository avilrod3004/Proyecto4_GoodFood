import React, {useContext, useEffect, useState} from 'react';
import {getUserData, register, saveUserData} from "../config/Firebase.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import {validateEmail, validatePassword} from "../utils/ValidateForms.jsx";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../utils/Toast.jsx";

/**
 * Formulario de registro de nuevos usuarios
 * @returns {Element} Formulario
 */
const Register = () => {
    // Estados inciales
    const initialState = {
        userName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    const errorMessagesInitial = {
        userName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    // Estados
    const [userAccount, setUserAccount] = useState(initialState)
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial)
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
                [name]: `* This field is required`
            })
        }

        if (name === "email") {
            const valido = validateEmail(value);
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* The email format is invalid"
                })
            }
        }

        if (name === "password") {
            const valido = validatePassword(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* The password format is invalid. It must contain at least: 8 characters, a capital letter and a special character."
                })
            }
        }

        if (name === "repeatPassword") {
            if (userAccount.password !== value) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* Passwords do not match"
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
                notifyError("Email is already in use", "light")
            } else {
                notifyError("An error has occurred. Please try again later.", "light")
            }
        }
    }

    const saveNewUser = async () => {
        try {
            setLoading(true);
            await saveUserData({
                uid: user.uid,
                userName: userAccount.userName,
            })
            const data = await getUserData(user.uid);

            if (data === null) {
                throw new Error("User not found");
            }

            localStorage.setItem("user", JSON.stringify(data));

            navigate("/profile");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            notifyError("An error has occurred. Please try again later.", "light")
        }
    }

    useEffect(() => {
        if (user) {
            saveNewUser();
        }
    }, [user])

    if (loading) return <Loading />;

    return (
        <main className="registro">
            <section className="registro__ventana-registro">
                <form onSubmit={handleSubmit} className="ventana-registro__formulario-registro">
                    <h1 className="formulario-registro__titulo">Create account</h1>

                    <label htmlFor="userName" className="formulario-registro__label-registro">
                        User name:
                        <input
                            className={errorMessages.userName !== "" ? "label-registro__input label-registro__input-error" : "label-registro__input"}
                            type="text"
                            name="userName"
                            value={userAccount.userName}
                            onBlur={handleBlur}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.userName !== ""
                        && <p className="formulario-registro__error">{errorMessages.userName}</p>
                    }


                    <label htmlFor="email" className="formulario-registro__label-registro">
                        Email:
                        <input
                            className={errorMessages.email !== "" ? "label-registro__input label-registro__input-error" : "label-registro__input"}
                            type="text"
                            name="email"
                            placeholder="email@example.com"
                            value={userAccount.email}
                            onBlur={handleBlur}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.email !== ""
                        && <p className="formulario-registro__error">{errorMessages.email}</p>
                    }


                    <label htmlFor="password" className="formulario-registro__label-registro">
                        Password:
                        <input
                            className={errorMessages.password !== "" ? "label-registro__input label-registro__input-error" : "label-registro__input"}
                            type="password"
                            name="password"
                            value={userAccount.password}
                            onBlur={handleBlur}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.password !== ""
                        && <p className="formulario-registro__error">{errorMessages.password}</p>
                    }


                    <label htmlFor="repeatPassword" className="formulario-registro__label-registro">
                        Repear password:
                        <input
                            className={errorMessages.repeatPassword !== "" ? "label-registro__input label-registro__input-error" : "label-registro__input"}
                            type="password"
                            name="repeatPassword"
                            value={userAccount.repeatPassword}
                            onBlur={handleBlur}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.repeatPassword !== ""
                        && <p className="formulario-registro__error">{errorMessages.repeatPassword}</p>
                    }

                    <NavLink to="/login" className="formulario-registro__login">Already have an account? Sign in</NavLink>

                    <nav className="formulario-registro__navegacion-registro">
                        <button
                            className="navegacion-registro__submit"
                            disabled={disabledSubmit}
                            type="submit"
                        >
                            Continue
                        </button>

                        <button
                            className="navegacion-registro__cancel"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </nav>
                </form>

                <img className="ventana-registro__imagen" src="/src/assets/img_register.jpeg" alt="Img login"/>
            </section>

            <ToastContainer/>
        </main>
    );
};

export default Register;