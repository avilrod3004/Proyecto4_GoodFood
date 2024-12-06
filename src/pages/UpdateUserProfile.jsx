import React, {useContext, useState} from 'react';
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const UpdateUserProfile = () => {
    // Estados iniciales
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
    const [userData, setUserData] = useState(userDataInitial);
    const [errorMessages, setErrorMessages] = useState(errorMessagesInitial);
    const [disabledSend, setDisabledSend] = useState(false);

    const navigate = useNavigate();
    const requiredInputs = ["userName", "picture", "biography", "name"];

    // Funciones
    const validateInput = event => {
        const {name, value, type} = event.target

        setErrorMessages({
            ...errorMessages,
            [name]: ""
        })

        if (!value.trim() && requiredInputs.includes(value)) {
            setErrorMessages({
                ...errorMessages,
                [name]: "This field is required"
            })
        }

        if (value.trim() && (name === "website" || name === "socialAccount1" || name === "socialAccount2" || name === "socialAccount3")) {
            const valid = validateUrl(value);
            if (!valid) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: `The URL format is invalid. Example: https://domain.com`
                })
            }
        }

        if (value.trim() && name === "phone") {
            const valido = validatePhoneNumber(value)
            if (!valido) {
                setErrorMessages({
                    ...errorMessages,
                    [name]: "The phone format is invalid"
                })
            }
        }

        setUserData({
            ...userData,
            [name]: value
        })

        validateMessage();
    }

    const validateUrl = url => {
        const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return regex.test(url)
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

    const validateMessage = () => {
        setDisabledSend(!Object.values(errorMessages).every(value => value === ""));
    }

    const save = () => {

    }

    return (
        <>
            <form action="">
                <fieldset>
                    <legend>Profile <span>(public)</span></legend>

                    <label htmlFor="userName">
                        User name:
                        <input
                            type="text"
                            name="userName"
                            value={userData.userName}
                            onChange={validateInput}
                        />
                        {errorMessages.userName !== "" && <p>{errorMessages.userName}</p>}
                    </label>

                    <label htmlFor="picture">
                        Picture:
                        <input
                            type="file"
                            name="picture"
                            value={userData.picture}
                            onChange={validateInput}
                        />
                        {errorMessages.picture !== "" && <p>{errorMessages.picture}</p>}

                    </label>

                    <label htmlFor="biography">
                        Biography:
                        <textarea
                            name="biography"
                            cols="30"
                            rows="10"
                            value={userData.biography}
                            onChange={validateInput}
                        />
                        {errorMessages.biography !== "" && <p>{errorMessages.biography}</p>}
                    </label>

                    <label htmlFor="website">
                        Website:
                        <input
                            type="text"
                            name="website"
                            value={userData.website}
                            onChange={validateInput}
                        />
                        {errorMessages.website !== "" && <p>{errorMessages.website}</p>}
                    </label>

                    <label htmlFor="socialAccount1">
                        Social Account:
                        <input
                            type="text"
                            name="socialAccount1"
                            value={userData.socialAccount1}
                            onChange={validateInput}
                        />
                        {errorMessages.socialAccount1 !== "" && <p>{errorMessages.socialAccount1}</p>}
                    </label>

                    <label htmlFor="socialAccount2">
                        Social Account:
                        <input
                            type="text"
                            name="socialAccount2"
                            value={userData.socialAccount2}
                            onChange={validateInput}
                        />
                        {errorMessages.socialAccount2 !== "" && <p>{errorMessages.socialAccount2}</p>}
                    </label>

                    <label htmlFor="socialAccount3">
                        Social Account:
                        <input
                            type="text"
                            name="socialAccount3"
                            value={userData.socialAccount3}
                            onChange={validateInput}
                        />
                        {errorMessages.socialAccount3 !== "" && <p>{errorMessages.socialAccount3}</p>}
                    </label>
                </fieldset>

                <fieldset>
                    <legend>User <span>(private)</span></legend>

                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={validateInput}
                        />
                        {errorMessages.name !== "" && <p>{errorMessages.name}</p>}
                    </label>

                    <label htmlFor="lastName">
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={userData.name}
                            onChange={validateInput}
                        />
                        {errorMessages.lastName !== "" && <p>{errorMessages.lastName}</p>}
                    </label>

                    <label htmlFor="phone">
                        Phone:
                        <input
                            type="tel"
                            name="phone"
                            value={userData.phone}
                            onChange={validateInput}
                        />
                        {errorMessages.phone !== "" && <p>{errorMessages.phone}</p>}
                    </label>
                </fieldset>

                <button disabled={disabledSend} onClick={() => save()}>Save</button>
                <button onClick={() => navigate("/profile")}>Cancel</button>

            </form>
        </>
    );
};

export default UpdateUserProfile;