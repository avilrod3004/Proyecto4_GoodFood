import React, {useEffect, useState} from 'react';
import UpLight from "../assets/up_light.svg"

/**
 * Componente `ButtonToTop`
 * Este componente muestra un botón que permite al usuario desplazarse suavemente hacia la parte superior de la página
 * cuando ha desplazado la pantalla más de 400 píxeles hacia abajo. El botón solo es visible cuando el usuario ha
 * hecho scroll hacia abajo y desaparece cuando se encuentra al principio de la página.
 *
 * @returns {JSX.Element} El botón que se muestra cuando se ha hecho scroll y permite volver al inicio de la página.
 */
const ButtonToTop = () => {
    // Estado para controlar si el botón es visible o no
    const [isVisible, setIsVisible] = useState(false);

    /**
     * Controlar la visibilidad del botón.
     * Si el scroll está por encima de 400 píxeles, el botón será visible, de lo contrario, estará oculto.
     */
    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 400);
    }

    /**
     * Desplaza la página hasta la parte superior.
     * Utiliza `window.scrollTo` con el comportamiento `smooth` para lograr un desplazamiento suave.
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => { // Funcion de limpieza, quita el evento cuando el componente se desmonta
            window.removeEventListener('scroll', toggleVisibility);
        }
    })

    return (
        <>
            {
                isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="scroll"
                        title="Go to top"
                    >
                        <img src={UpLight} alt="Go to top" />
                    </button>

                )
            }
        </>
    );
};

export default ButtonToTop;