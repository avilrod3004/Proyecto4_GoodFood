import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import RelojLight from "../assets/reloj_light.svg"
import RelojDark from "../assets/reloj_dark.svg"
import HealthLabelsList from "./HealthLabelsList.jsx";
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Componente `BigCard`
 * Este componente es una tarjeta grande que muestra la información de una receta, como su imagen,
 * título, tipo de comida, tipo de cocina, etiquetas de salud y el tiempo de preparación. Al hacer
 * clic sobre la tarjeta, redirige al usuario a la página de detalles de la receta correspondiente.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único de la receta.
 * @param {string} props.image - URL de la imagen de la receta.
 * @param {string} props.title - Título de la receta.
 * @param {string} props.mealType - Tipo de comida.
 * @param {string} props.cuisineType - Tipo de cocina.
 * @param {Array} props.healthLabels - Lista de etiquetas de salud asociadas a la receta.
 * @param {number} props.totalTime - Tiempo total de preparación de la receta (en minutos).
 * @returns {JSX.Element} Un componente visual que muestra una tarjeta con la información de la receta.
 */
const BigCard = ({id, image, title, mealType, cuisineType, healthLabels, totalTime}) => {
    const navigate = useNavigate();
    const {theme, toggleTheme} = useContext(ThemeContext);

    /**
     * Navega a la página de detalles de la receta.
     * Redirige al usuario a la ruta `/recipe/{id}`, donde {id} es el identificador de la receta.
     */
    const consultarReceta = () => {
        navigate(`/recipe/${id}`);
    }

    return (
        <article className="receta-grande" onClick={() => {consultarReceta()}}>
            <img className="receta-grande__imagen" src={image} alt={title}/>
            <div className="receta-grande__texto-receta">
                <h1 className="texto-receta__titulo">{title}</h1>
                <ul className="texto-receta__listado">
                    <li className="listado__dato">{mealType}</li>
                    <li className="listado__dato">{cuisineType}</li>
                </ul>

                <HealthLabelsList healthLabels={healthLabels}/>

                <div className="texto-receta__tiempo">
                    <img className="tiempo__imagen" src={theme === "light" ? RelojLight : RelojDark} alt="Time: "/>
                    <p className="tiempo__numero">{totalTime}&#39;</p>
                </div>
            </div>
        </article>
    );
};

export default BigCard;