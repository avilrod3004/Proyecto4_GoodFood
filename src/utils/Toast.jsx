import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

/**
 * Notifica al usuario que se ha ejecutado correctamente
 */
export const notifySuccess = (message, theme) => {
    toast.success(`${message}`, {
        position: "top-right",
        theme: theme
    });
};

export const notifyError = (message, theme) => {
    toast.error(`${message}`, {
        position: "top-right",
        theme: theme
    })
}