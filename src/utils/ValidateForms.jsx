/**
 * Valida si el email del formulario tiene un formato válido
 * @param email {String} Email dado por el usuario
 * @returns {boolean} True si es válido // False si no es válido
 */
export const validateEmail = email => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

/**
 * Valida si el número de teléfono del formulario tiene un formato válido
 * @param phoneNumber {String} Teléfono dado por el usuario
 * @returns {boolean} True si es válido // False si no es válido
 */
export const validatePhoneNumber = phoneNumber => {
    const regex = /^(\d{3}\s?\d{3}\s?\d{3}|\d{9})$/;
    return regex.test(phoneNumber);
}

export const validateIngredients = text => {
    const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/i;
    return regex.test(text);
}

export const validateMinutes = minutes => {
    const regex = /^[1-9]\d*$/;
    return regex.test(minutes);
}