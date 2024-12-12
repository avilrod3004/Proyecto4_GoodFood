import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {notifySuccess} from "../utils/Toast.jsx";
import {validatePhoneNumber, validateUrl} from "../utils/ValidateForms.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Componente para actualizar el perfil de usuario.
 * Permite al usuario actualizar su nombre, imagen, biografía, enlaces a redes sociales, y más.
 * Valida los campos del formulario y muestra mensajes de error si es necesario.
 * Al enviar el formulario, guarda los cambios en el almacenamiento local y redirige al perfil del usuario.
 *
 * @returns {Element} Formulario de actualización de perfil.
 */
const UpdateUserProfile = () => {
    // Estados iniciales para los datos del usuario y los mensajes de error
    const userDataInitial = {
        userName: "",
        picture: "",
        biography: "",
        website: "",
        socialAccount1: "",
        socialAccount2: "",
        socialAccount3: "",
        name: "",
        lastName: "",
        phone: ""
    }

    const errorMessagesInitial = {
        userName: "",
        picture: "",
        biography: "",
        website: "",
        socialAccount1: "",
        socialAccount2: "",
        socialAccount3: "",
        name: "",
        lastName: "",
        phone: ""
    }

    // Estados
    const {user, setUser} = useContext(UserContext);
    const {theme, toggleTheme} = useContext(ThemeContext);

    const [userData, setUserData] = useState(userDataInitial);
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial);
    const [loading, setLoading] = useState(true);
    const [disabledSend, setDisabledSend] = useState(false);

    const navigate = useNavigate();
    const requiredInputs = ["userName", "picture", "biography"];

    /**
     * Función para validar la entrada del usuario en los campos del formulario.
     * Valida el formato de la URL y el teléfono, y verifica si los campos obligatorios están completos.
     *
     * @param {Event} event - Evento del formulario.
     */
    const validateInput = event => {
        const {name, value, type} = event.target

        setErrorMessages({
            ...errorMessages,
            [name]: ""
        })

        if (!value.trim() && requiredInputs.includes(name)) {
            setErrorMessages({
                ...errorMessages,
                [name]: "* This field is required"
            })
        }

        if (value.trim() && (name === "website" || name === "socialAccount1" || name === "socialAccount2" || name === "socialAccount3")) {
            const valid = validateUrl(value);
            if (!valid) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: `* The URL format is invalid. Example: https://domain.com`
                })
            }
        }

        if (value.trim() && name === "phone") {
            const valido = validatePhoneNumber(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* The phone format is invalid"
                })
            }
        }

        setUserData({
            ...userData,
            [name]: value
        })

        validateMessage();
    }

    /**
     * Función para verificar si el formulario es válido.
     * Habilita o deshabilita el botón de envío según los errores presentes.
     */
    const validateMessage = () => {
        setDisabledSend(!Object.values(errorMessages).every(value => value === ""));
    }

    /**
     * Función para obtener los datos del usuario desde el almacenamiento local.
     * Inicializa los datos del usuario en el estado.
     */
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));

        setUserData({...data});

        setLoading(false);
    }

    /**
     * Función para actualizar los datos del usuario.
     * Guarda los nuevos datos en el almacenamiento local y redirige al perfil.
     *
     * @param {Event} event - Evento del formulario.
     */
    const updateUserData = event => {
        event.preventDefault();

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/profile");
        notifySuccess("Updated profile", theme)
    }

    // Cuando el usuario logueado se haya cargado
    useEffect(() => {
        if (user) {
            getUserData();
        }
    }, [])

    return (
        <main className="actualizar-perfil">
            <form className="actualizar-perfil__formulario-actualizar" action="" onSubmit={updateUserData}>
                <fieldset className="formulario-actualizar__apartado">
                    <legend className="apartado__titulo">Profile: <span className="apartado__privacidad">(public)</span></legend>

                    <label className="apartado__label-actualizar" htmlFor="userName">
                        User name:
                        <input
                            className={errorMessages.userName !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="userName"
                            value={userData.userName}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.userName !== ""
                        && <p className="apartado__error">{errorMessages.userName}</p>
                    }

                    <label className="apartado__label-actualizar" htmlFor="picture">
                        Picture:
                        <input
                            className={errorMessages.picture !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="picture"
                            value={userData.picture}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.picture !== ""
                        && <p className="apartado__error">{errorMessages.picture}</p>
                    }


                    <label className="apartado__label-actualizar-textarea" htmlFor="biography">
                        Biography:
                        <textarea
                            className={errorMessages.biography !== "" ? "label-actualizar-textarea__textarea label-actualizar-textarea__textarea-error" : "label-actualizar-textarea__textarea"}
                            name="biography"
                            cols="30"
                            rows="10"
                            value={userData.biography}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.biography !== ""
                        && <p className="apartado__error">{errorMessages.biography}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="website">
                        Website:
                        <input
                            className={errorMessages.website !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="website"
                            value={userData.website}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.website !== ""
                        && <p className="apartado__error">{errorMessages.website}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="socialAccount1">
                        Social Account:
                        <input
                            className={errorMessages.socialAccount1 !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="socialAccount1"
                            value={userData.socialAccount1}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.socialAccount1 !== ""
                        && <p className="apartado__error">{errorMessages.socialAccount1}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="socialAccount2">
                        Social Account:
                        <input
                            className={errorMessages.socialAccount2 !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="socialAccount2"
                            value={userData.socialAccount2}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.socialAccount2 !== ""
                        && <p className="apartado__error">{errorMessages.socialAccount2}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="socialAccount3">
                        Social Account:
                        <input
                            className={errorMessages.socialAccount3 !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="socialAccount3"
                            value={userData.socialAccount3}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.socialAccount3 !== ""
                        && <p className="apartado__error">{errorMessages.socialAccount3}</p>
                    }

                </fieldset>

                <fieldset className="formulario-actualizar__apartado">
                    <legend className="apartado__titulo">User: <span className="apartado__privacidad">(private)</span></legend>

                    <label className="apartado__label-actualizar" htmlFor="name">
                        Name:
                        <input
                            className={errorMessages.name !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.name !== ""
                        && <p className="apartado__error">{errorMessages.name}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="lastName">
                        Last Name:
                        <input
                            className={errorMessages.lastName !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.lastName !== ""
                        && <p className="apartado__error">{errorMessages.lastName}</p>
                    }


                    <label className="apartado__label-actualizar" htmlFor="phone">
                        Phone:
                        <input
                            className={errorMessages.phone !== "" ? "label-actualizar__input label-actualizar__input-error" : "label-actualizar__input"}
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        errorMessages.phone !== ""
                        && <p className="apartado__error">{errorMessages.phone}</p>
                    }

                </fieldset>

                <nav className="formulario-actualizar__navegacion-actualizar">
                    <button className="navegacion-actualizar__guardar" disabled={disabledSend} type="submit">Save</button>
                    <button className="navegacion-actualizar__cancelar" onClick={() => navigate("/profile")}>Cancel</button>
                </nav>

            </form>

            <ToastContainer/>
        </main>
    );
};

export default UpdateUserProfile;