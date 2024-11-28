import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

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

        if (value.trim() && name === "phone") {
            const valido = validatePhoneNumber(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "El número de telefono no tiene un formato"
                })
            }
        }

        if (name === "accept") {
            if (!checked) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "Debes aceptar los terminos y condiciones"
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
     * Valida si el email del formulario tiene un formato válido
     * @param email {String} Email dado por el usuario
     * @returns {boolean} True si es válido // False si no es válido
     */
    const validateEmail = email => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    /**
     * Valida si el número de teléfono del formulario tiene un formato válido
     * @param phoneNumber {String} Teléfono dado por el usuario
     * @returns {boolean} True si es válido // False si no es válido
     */
    const validatePhoneNumber = phoneNumber => {
        const regex = /^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
        return regex.test(phoneNumber);
    }

    /**
     * Valida si el formulario ha sido completado correctamente y si no hay mensajes de error en los campos
     */
    const validateMessage = () => {
        const { phone, ...fieldsToValidate } = message; // el campo del número de teléfono es opcional

        // true si todos los campos estan completos (excepto phone)
        const completedInputs = Object.values(fieldsToValidate).every(value => value !== "" || value === true);

        // true si no hay errores
        const noErrors = Object.values(errorMessages).every(value => value === "");

        setDisabledSubmit(!(completedInputs && noErrors));
    }

    /**
     * Envía el mensaje
     * @param event {Event} - Evento ocurrido en el formulario
     */
    const send = event => {
        event.preventDefault();
        notify();
        reset();
    }

    /**
     * Notifica al usuario de que se ha enviado correctamente
     */
    const notify = () => {
        toast.success("Message sent!", {
            position: "top-right",
        });
    };

    /**
     * Resetea el contenido del formulario
     */
    const reset = () => {
        setMessage(initialValues);
        setErrorMessages(errorMessagesInitial)
    }

    return (
        <>
            <form action="" onSubmit={send} onReset={reset}>
                <label htmlFor="name">
                    Your name:
                    <input
                        type="text"
                        name="name"
                        value={message.name}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                    {errorMessages.name !== "" ? <p>{errorMessages.name}</p> : null}
                </label>

                <label htmlFor="phone">
                    Phone number:
                    <input
                        type="tel"
                        name="phone"
                        value={message.phone}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                    {errorMessages.phone !== "" ? <p>{errorMessages.phone}</p> : null}
                </label>

                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={message.email}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                    {errorMessages.email !== "" ? <p>{errorMessages.email}</p> : null}

                </label>

                <label htmlFor="subject">
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        value={message.subject}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                    {errorMessages.subject !== "" ? <p>{errorMessages.subject}</p> : null}

                </label>

                <label htmlFor="body">
                    Body:
                    <textarea
                        name="body"
                        id="body"
                        cols="60"
                        rows="10"
                        value={message.body}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                    {errorMessages.body !== "" ? <p>{errorMessages.body}</p> : null}

                </label>

                <label htmlFor="accept">
                    <input
                        type="checkbox"
                        name="accept"
                        checked={message.accept}
                        onBlur={handleBlur}
                        onChange={validateInput}/>I accept the legal terms, the privacy policy, and the conditions od this website.
                    {errorMessages.accept !== "" ? <p>{errorMessages.accept}</p> : null}
                </label>

                <button disabled={disabledSubmit} type="submit">Send</button>
                <button type="reset">Reset</button>
            </form>

            <ToastContainer />
        </>
    );
};

export default ContactUs;