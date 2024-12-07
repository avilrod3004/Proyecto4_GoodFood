import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {notifySuccess} from "../utils/Toast.jsx";
import {validateEmail, validatePhoneNumber} from "../utils/ValidateForms.jsx";

/**
 * Componente que muestra el formulario de contacto
 */
const ContactUs = () => {
    // Estados iniciales
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        subject: "",
        body: "",
        accept: false
    }

    const errorMessagesInitial = {
        name: "",
        phone: "",
        email: "",
        subject: "",
        body: "",
        accept: ""
    }

    // Estados
    const [message, setMessage] = useState(initialValues);
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial);
    const [disabledSubmit, setDisabledSubmit] = useState(true);

    // Funciones
    /**
     * Valida los campos del formulario
     * @param event {Event} - Evento ocurrido en el formulario
     */
    const validateInput = event => {
        const {name, value, checked, type} = event.target

        setErrorMessages({
            ...errorMessages,
            [name]: ""
        })

        if (!value.trim() && name !== "phone") {
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

        if (value.trim() && name === "phone") {
            const valido = validatePhoneNumber(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* The phone format is invalid"
                })
            }
        }

        if (name === "accept") {
            if (!checked) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "* You must accept the terms and conditions"
                })
            }
        }

        setMessage({
            ...message,
            [name]: type === "checkbox" ? checked : value
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
        const { phone, accept, ...fieldsToValidate } = message; // Excluimos el campo opcional (phone) y el checkbox para validarlo aparte

        // true si todos los campos requeridos están completos (excepto phone)
        const completedInputs = Object.values(fieldsToValidate).every(value => value.trim() !== "");

        // true si no hay errores
        const noErrors = Object.values(errorMessages).every(value => value === "");

        // Verificamos que el checkbox esté marcado
        const isCheckboxChecked = accept === true;

        // El formulario solo será válido si todos los campos están completos, no hay errores y el checkbox está marcado
        setDisabledSubmit(!(completedInputs && noErrors && isCheckboxChecked));
    };


    /**
     * Envía el mensaje
     * @param event {Event} - Evento ocurrido en el formulario
     */
    const send = event => {
        event.preventDefault();
        notifySuccess("Message send!", "light");
        reset();
    }

    /**
     * Resetea el contenido del formulario
     */
    const reset = () => {
        setMessage(initialValues);
        setErrorMessages(errorMessagesInitial)
    }

    return (
        <main className="contacto">
            <form action="" onSubmit={send} onReset={reset} className="contacto__formulario-contacto">
                <h1 className="formulario-contacto__titulo">Contact us</h1>

                <label htmlFor="name" className="formulario-contacto__label-text">
                    Your name:
                    <input
                        className={errorMessages.name !== "" ? "label-text__input label-text__input-error" : "label-text__input"}
                        type="text"
                        name="name"
                        value={message.name}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>
                {
                    errorMessages.name !== ""
                    && <p className="formulario-contacto__error">{errorMessages.name}</p>
                }

                <label htmlFor="phone" className="formulario-contacto__label-text">
                    Phone number:
                    <input
                        className={errorMessages.phone !== "" ? "label-text__input label-text__input-error" : "label-text__input"}
                        type="tel"
                        name="phone"
                        value={message.phone}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>
                {
                    errorMessages.phone !== ""
                    && <p className="formulario-contacto__error">{errorMessages.phone}</p>
                }

                <label htmlFor="email" className="formulario-contacto__label-text">
                    Email:
                    <input
                        className={errorMessages.email !== "" ? "label-text__input label-text__input-error" : "label-text__input"}
                        type="email"
                        name="email"
                        value={message.email}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>
                {
                    errorMessages.email !== ""
                    && <p className="formulario-contacto__error">{errorMessages.email}</p>
                }

                <label htmlFor="subject" className="formulario-contacto__label-text">
                    Subject:
                    <input
                        className={errorMessages.subject !== "" ? "label-text__input label-text__input-error" : "label-text__input"}
                        type="text"
                        name="subject"
                        value={message.subject}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>
                {
                    errorMessages.subject !== ""
                    && <p className="formulario-contacto__error">{errorMessages.subject}</p>
                }

                <label htmlFor="body" className="formulario-contacto__label-textarea">
                    Body:
                    <textarea
                        className={errorMessages.body !== "" ? "label-textarea__textarea label-textarea__textarea-error" : "label-textarea__textarea"}
                        name="body"
                        id="body"
                        cols="60"
                        rows="10"
                        value={message.body}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>
                {
                    errorMessages.body !== ""
                    && <p className="formulario-contacto__error">{errorMessages.body}</p>
                }

                <label htmlFor="accept" className="formulario-contacto__label-checkbox">
                    <input
                        className="label-checkbox__checkbox"
                        type="checkbox"
                        name="accept"
                        checked={message.accept}
                        onBlur={handleBlur}
                        onChange={validateInput}/>I accept the legal terms, the privacy policy, and the conditions of
                    this website.
                </label>
                {
                    errorMessages.accept !== ""
                    && <p className="formulario-contacto__error-checkbox">{errorMessages.accept}</p>
                }

                <nav className="formulario-contacto__navegacion">
                    <button
                        className="navegacion__enviar"
                        disabled={disabledSubmit}
                        type="submit"
                    >
                        Send
                    </button>

                    <button
                        className="navegacion__limpiar"
                        type="reset"
                    >
                        Reset
                    </button>
                </nav>
            </form>

            <ToastContainer/>
        </main>
    );
};

export default ContactUs;