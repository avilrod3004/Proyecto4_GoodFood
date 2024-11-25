import React, { useState } from 'react';
// import {Bounce, toast, ToastContainer} from "react-toastify";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Formik} from "formik";
import * as Yup from "yup"

/**
 * Componente que muestra el formulario de contacto
 */
const ContactUs = () => {


    const validationSchema = Yup.object().shape({
        name: Yup.string().trim().required("El campo nombre es obligatorio"),
        phone: Yup.string().trim().matches(/^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/, "El telefono debe contener 9 dígitos"), //corregir
        email: Yup.string().trim().email("Formato inválido").required("El campo email es obligatorio"),
        subject: Yup.string().trim().required("El campo subject es obligatorio"),
        body: Yup.string().trim().required("El campo body es obligatorio"),
        accept: Yup.boolean().oneOf([true], "Debes aceptar los términos y condiciones").required("Debes aceptar los términos y condiciones"),
    })

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Formulario enviado:", values);
        notify();
        resetForm();
        setSubmitting(false);
    };

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
            <Formik
                initialValues={{name: "", phone: "", email: "", subject: "", body: "", accept: false}}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {
                    ({values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched}) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">
                                Your name:
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.name && touched.name && errors.name
                                }
                            </label>

                            <label htmlFor="phone">
                                Phone number:
                                <input
                                    type="tel"
                                    name="phone"
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.phone && touched.phone && errors.phone
                                }
                            </label>

                            <label htmlFor="email">
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.email && touched.email && errors.email
                                }
                            </label>

                            <label htmlFor="subject">
                                Subject:
                                <input
                                    type="text"
                                    name="subject"
                                    value={values.subject}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.subject && touched.subject && errors.subject
                                }
                            </label>

                            <label htmlFor="body">
                                Body:
                                <textarea
                                    name="body"
                                    id="body"
                                    cols="60"
                                    rows="10"
                                    value={values.body}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>
                                {
                                    errors.body && touched.body && errors.body
                                }
                            </label>

                            <label htmlFor="accept">
                                <input
                                    type="checkbox"
                                    name="accept"
                                    checked={values.accept}
                                    onBlur={handleBlur}
                                    onChange={handleChange}/>I accept the legal terms, the privacy policy, and the
                                conditions od this website.
                                {
                                    errors.accept && touched.accept && errors.accept
                                }
                            </label>

                            <button disabled={isSubmitting} type="submit">Send</button>
                            <button type="reset">Reset</button>
                        </form>
                    )
                }
            </Formik>

            <ToastContainer/>
        </>
    );
};

export default ContactUs;