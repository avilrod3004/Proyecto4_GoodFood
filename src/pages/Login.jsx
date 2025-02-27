import React, {useContext, useEffect, useState} from 'react';
import {getUserData, login} from "../config/Firebase.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import Loading from "../components/Loading.jsx";
import {validateEmail} from "../utils/ValidateForms.jsx";
import {ToastContainer} from "react-toastify";
import {notifyError} from "../utils/Toast.jsx";
import LoginImagen from "../assets/img_login.jpeg"
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Componente que muestra el formulario de inicio de sesión
 *
 * @returns {Element} - Un formulario de inicio de sesión
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

    // Estados
    const [userAccount, setUserAccount] = useState(initialState)
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial)
    const [loading, setLoading] = useState(false);
    const [disabledSubmit, setDisabledSubmit] = useState(true);

    const {user} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);
    const navigate = useNavigate();

    /**
     * Valida que los campos del formulario estén correctamente rellenados
     *
     * @param event {Event} - Evento ocurrido al cambiar el valor de un campo
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

        setUserAccount({
            ...userAccount,
            [name]: value
        })

        validateMessage();
    }

    /**
     * Valida los campos del formulario cuando el campo pierde el foco
     *
     * @param event {Event} - Evento ocurrido al perder el foco de un campo
     */
    const handleBlur = event => {
        validateInput(event);
    };

    /**
     * Verifica si el formulario está completo y sin errores
     */
    const validateMessage = () => {
        const completedInputs = Object.values(userAccount).every(value => value !== "" || value === true);
        const noErrors = Object.values(errorMessages).every(value => value === "");

        setDisabledSubmit(!(completedInputs && noErrors));
    }

    /**
     * Maneja el envío del formulario de inicio de sesión
     *
     * @param event {Event} - Evento de envío del formulario
     */
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await login({email: userAccount.email, password: userAccount.password})

        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                notifyError("Invalid credentials", "light")
            } else {
                notifyError("An error has occurred. Please try again later.", "light")
            }
        }
    }

    /**
     * Recupera los datos del usuario desde Firebase
     *
     * @param uid {string} - ID del usuario
     */
    const fetchUserData = async (uid) => {
        try {
            setLoading(true);
            const data = await getUserData(uid);

            if (data === null) {
                throw new Error("User not found");
            }

            localStorage.setItem("user", JSON.stringify(data));

            setLoading(false);
            navigate("/profile");
        } catch (error) {
            setLoading(false);
            notifyError("An error has occurred. Please try again later.", theme)
        }
    };

    useEffect(() => {
        if (user?.uid) {
            fetchUserData(user.uid);
        }
    }, [user])

    if (loading) return <Loading />;

    return (
        <main className="login">
            <section className="login__ventana-login">
                <img className="ventana-login__imagen" src={LoginImagen} alt="Img login"/>

                <form onSubmit={handleSubmit} className="ventana-login__formulario-login">
                    <h1 className="formulario-login__titulo">Log in</h1>

                    <label htmlFor="email" className="formulario-login__label-login">
                        Email:
                        <input
                            className={errorMessages.email !== "" ? "label-login__input label-login__input-error" : "label-login__input"}
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
                        && <p className="formulario-login__error">{errorMessages.email}</p>
                    }

                    <label htmlFor="password" className="formulario-login__label-login">
                        Password:
                        <input
                            className={errorMessages.password !== "" ? "label-login__input label-login__input-error" : "label-login__input"}
                            type="password"
                            name="password"
                            value={userAccount.password}
                            onBlur={handleBlur}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.password !== ""
                        && <p className="formulario-login__error">{errorMessages.password}</p>
                    }

                    <a onClick={() => navigate("/register")} className="fomulario-login__registro">Don&#39;t have an account yet? Create one</a>

                    <nav className="fomulario-login__navegacion-login">
                        <button
                            className="navegacion-login__submit"
                            disabled={disabledSubmit}
                            type="submit"
                        >
                            Countinue
                        </button>

                        <button
                            className="navegacion-login__cancel"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                    </nav>

                </form>
            </section>

            <ToastContainer/>
        </main>
    );
};

export default Login;