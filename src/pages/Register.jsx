import React, {useContext, useEffect, useState} from 'react';
import {getUserData, register, saveUserData} from "../config/Firebase.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import {validateEmail, validatePassword} from "../utils/ValidateForms.jsx";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../utils/Toast.jsx";
import RegistroImagen from "../assets/img_register.jpeg"
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Componente de formulario de registro de nuevos usuarios.
 * Permite a los usuarios crear una cuenta proporcionando nombre de usuario, correo electrónico y contraseña.
 * Valida los campos y muestra mensajes de error si es necesario.
 * Redirige al perfil del usuario después de un registro exitoso.
 *
 * @returns {Element} Formulario de registro.
 */
const Register = () => {
    // Estado inicial para los datos del formulario
    const initialState = {
        userName: "",
        email: "",
        password: "",
        repeatPassword: ""
    }

    // Estado inicial para los mensajes de error
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
    const {theme, toggleTheme} = useContext(ThemeContext);
    const navigate = useNavigate();

    /**
     * Valida las entradas del formulario a medida que el usuario escribe.
     * Se asegura de que el correo electrónico tenga un formato válido,
     * que la contraseña cumpla con los requisitos y que las contraseñas coincidan.
     *
     * @param {Event} event - Evento del formulario.
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
     * Función que se ejecuta cuando un campo pierde el foco.
     * Llama a la función de validación para el campo correspondiente.
     *
     * @param {Event} event - Evento ocurrido en el formulario.
     */
    const handleBlur = event => {
        validateInput(event);
    };

    /**
     * Verifica si el formulario está completo y si no hay errores.
     * Habilita o deshabilita el botón de envío en función de la validez del formulario.
     */
    const validateMessage = () => {
        const completedInputs = Object.values(userAccount).every(value => value !== "" || value === true);
        const noErrors = Object.values(errorMessages).every(value => value === "");

        setDisabledSubmit(!(completedInputs && noErrors));
    }

    /**
     * Registra al usuario con los datos del formulario y maneja los errores si ocurren.
     *
     * @param {Event} event - Evento onSubmit del formulario.
     */
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await register({email: userAccount.email, password: userAccount.password})
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                notifyError("Email is already in use", theme)
            } else {
                notifyError("An error has occurred. Please try again later.", "light")
            }
        }
    }

    /**
     * Guarda los datos del nuevo usuario en la base de datos y redirige a su perfil.
     */
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

                    <a onClick={() => navigate("/login")} className="formulario-registro__login">Already have an account? Sign in</a>

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

                <img className="ventana-registro__imagen" src={RegistroImagen} alt="Img login"/>
            </section>

            <ToastContainer/>
        </main>
    );
};

export default Register;