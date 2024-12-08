import React from 'react';
import Carrot from "../assets/carrot.svg";
import Fish from "../assets/fish.svg";
import Apple from "../assets/apple.svg";
import Chicken from "../assets/chicken.svg";
import Shrimp from "../assets/shrimp.svg";

/**
 * Componente `Loading`
 * Este componente se encarga de mostrar una serie de imágenes de alimentos mientras el contenido de la página se carga.
 * Está diseñado para indicar que la aplicación está procesando datos y proporcionará una experiencia visual entretenida durante el proceso de carga.
 *
 * @returns {JSX.Element} Un conjunto de imágenes que representan diferentes alimentos, utilizadas como indicadores de carga.
 */
const Loading = () => {
    return (
        <main className="loading">
            <img className="loading__imagen" src={Carrot} alt="carrot"/>
            <img className="loading__imagen" src={Fish} alt="fish"/>
            <img className="loading__imagen" src={Apple} alt="apple"/>
            <img className="loading__imagen" src={Chicken} alt="chicken"/>
            <img className="loading__imagen" src={Shrimp} alt="shrimp"/>
        </main>
    );
};

export default Loading;