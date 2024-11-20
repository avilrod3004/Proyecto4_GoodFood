import React, { useState } from 'react';

const ContactUs = () => {
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

    const [message, setMessage] = useState(initialValues);
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial);

    const validateInput = event => {
        const {name, value, checked, type} = event.target

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

        if (name === "phone") {
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
    }

    const handleBlur = event => {
        validateInput(event);
    };

    const validateEmail = email => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    const validatePhoneNumber = phoneNumber => {
        const regex = /^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
        return regex.test(phoneNumber);
    }

    const send = event => {
        event.preventDefault();
        console.log(validateMessage() ? "hay campos vacios" : "ok")
    }

    const validateMessage = () => {
        console.log(Object.entries(message))
        return Object.values(message).some(value => value === "" || value === false);
    }

    return (
        <>
            <form action="" onSubmit={send}>
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


                <button type="submit">Send</button>
                <button type="reset">Reset</button>
            </form>
        </>
    );
};

export default ContactUs;