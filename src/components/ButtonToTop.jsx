import React, {useEffect, useState} from 'react';
import UpLight from "../assets/up_light.svg"
import UpDark from "../assets/up_dark.svg"

const ButtonToTop = () => {
    // Estados
    const [isVisible, setIsVisible] = useState(false);

    // Funciones
    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 400);
    }

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