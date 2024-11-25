import React, { useState } from 'react';
// import {Bounce, toast, ToastContainer} from "react-toastify";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

/**
 * Componente que muestra el formulario de contacto
 */
const ContactUs = () => {




    /**
     * Envía el mensaje
     * @param event {Event} - Evento ocurrido en el formulario
     */
    const send = event => {
        event.preventDefault();
        notify();
    }

    /**
     * Notifica al usuario de que se ha enviado correctamente
     */
    const notify = () => {
        toast.success("Message sent!", {
            position: "top-right",
        });
    };

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
                </label>

                <label htmlFor="phone">
                    Phone number:
                    <input
                        type="tel"
                        name="phone"
                        value={message.phone}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="email">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={message.email}
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="subject">
                    Subject:
                    <input
                        type="text"
                        name="subject"
                        value={message.subject}
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        onChange={validateInput}/>
                </label>

                <label htmlFor="accept">
                    <input
                        type="checkbox"
                        name="accept"
                        checked={message.accept}
                        onBlur={handleBlur}
                        onChange={validateInput}/>I accept the legal terms, the privacy policy, and the conditions od this website.
                </label>

                <button disabled={disabledSubmit} type="submit">Send</button>
                <button type="reset">Reset</button>
            </form>

            <ToastContainer />
        </>
    );
};

export default ContactUs;