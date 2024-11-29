import React from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Tarjeta vertical que muestra información básica de las recetas devueltas por la API
 * @param image Imagen de la receta
 * @param title Nombre de la receta
 * @param mealType Tipo de comida
 * @param cuisineType Tipo de cocina
 * @returns {Element} Tarjeta
 */
const Card = ({id, image, title, mealType, cuisineType}) => {
    const navigate = useNavigate();

    const consultarReceta = () => {
        navigate(`/receta/${id}`);
    }

    return (
        <article style={{ border: `1px solid black`}} onClick={() => {consultarReceta()}}>
            <img src={image} alt={title}/>
            <h1>{title}</h1>
            <ul>
                <li>{mealType}</li>
                <li>{cuisineType}</li>
                <li>{id}</li>
            </ul>

        </article>
    );
};

export default Card;