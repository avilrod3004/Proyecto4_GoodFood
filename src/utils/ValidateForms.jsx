/**
 * Valida si el email del formulario tiene un formato válido
 *
 * @param email {String} Email dado por el usuario
 * @returns {boolean} True si es válido, False si no es válido
 */
export const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

/**
 * Valida si la contraseña tiene un formato válido:
 * - 8 caracteres como mínimo,
 * - al menos una letra en mayúscula,
 * - al menos un caracter especial entre !@#$%^&*)
 *
 * @param password {String} Contraseña ingresada por el usuario
 * @returns {boolean} True si es válida, False si no es válida
 */
export const validatePassword = password => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
}

/**
 * Valida si el número de teléfono del formulario tiene un formato válido
 *
 * @param phoneNumber {String} Teléfono dado por el usuario
 * @returns {boolean} True si es válido, False si no es válido
 */
export const validatePhoneNumber = phoneNumber => {
    const regex = /^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
    return regex.test(phoneNumber);
}

/**
 * Valida los ingredientes, asegurando que solo contengan letras y espacios
 *
 * @param text {String} Ingredientes dados por el usuario
 * @returns {boolean} True si es válido, False si no es válido
 */
export const validateIngredients = text => {
    const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/i;
    return regex.test(text);
}

/**
 * Valida el número de minutos ingresado, asegurándose de que sea un número entero positivo
 *
 * @param minutes {String} Número de minutos dado por el usuario
 * @returns {boolean} True si es válido, False si no es válido
 */
export const validateMinutes = minutes => {
    const regex = /^[1-9]\d*$/;
    return regex.test(minutes);
}

/**
 * Valida si la URL tiene un formato válido de enlace web (http/https)
 *
 * @param url {String} URL dada por el usuario
 * @returns {boolean} True si es válida, False si no es válida
 */
export const validateUrl = url => {
    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url)
}