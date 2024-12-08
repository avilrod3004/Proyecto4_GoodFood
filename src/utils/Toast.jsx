import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

/**
 * Notifica al usuario que se ha ejecutado correctamente
 *
 * @param message {String} Mensaje de exito
 * @param theme Tema activo
 */
export const notifySuccess = (message, theme) => {
    toast.success(`${message}`, {
        position: "top-right",
        theme: theme
    });
};

/**
 * Notifica al usuario que ha ocurrido un error
 *
 * @param message {String} Mensaje de error
 * @param theme Tema activo
 */
export const notifyError = (message, theme) => {
    toast.error(`${message}`, {
        position: "top-right",
        theme: theme
    })
}

/**
 * Notifica al usuario que algo importante ha ocurrido
 *
 * @param message
 * @param theme
 */
export const notifyWarning = (message, theme) => {
    toast.warning(`${message}`, {
        position: "top-right",
        theme: theme
    })
}