import React, {useState} from 'react';

const ContactUs = () => {
    const initialValues = {
        name: "",
        phone: "",
        email: "",
        subject: "",
        body: "",
        accept: false
    }

    const [message, setMessage] = useState(initialValues);

    const validateInput = event => {
        const {name, value, checked, type} = event.target

        if (!value.trim() && name !== "phone") {
            // mostrar error "El campo ${campo} es obligatorio"
            console.log(`el campo ${name} esta vacio`);
        }

        if (name === "email") {
            const valido = validateEmail(value);
            if (!valido) {
                console.log("email no es valido")
            }
        }

        if (name === "phone") {
            const valido = validatePhoneNumber(value)
            if (!valido) {
                console.log("phonez no es valido")
            }
        }

        setMessage({
            ...message,
            [name]: type === "checkbox" ? checked : value
        })
    }

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
        console.log(validateMessage ? "hay campos vacios" : "ok")
    }

    const validateMessage = () => {
        console.log(message)
        console.log(Object.values(message))
        return Object.values(message).includes("")
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
                        onChange={validateInput}/>
                </label>

                <label htmlFor="phone">
                    Phone number:
                    <input
                        type="tel"
                        name="phone"
                        value={message.phone}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={message.email}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="subject">
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        value={message.subject}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="body">
                    Body:
                    <textarea
                        name="body"
                        id="body"
                        cols="60"
                        rows="10"
                        value={message.body}
                        onChange={validateInput}/>
                </label>

                <input
                    type="checkbox"
                    name="accept"
                    checked={message.accept}
                    onChange={validateInput}/>I accept the legal terms, the privacy policy, and the conditions od this website.

                <button type="submit">Send</button>
                <button type="reset">Reset</button>
            </form>
        </>
    );
};

export default ContactUs;