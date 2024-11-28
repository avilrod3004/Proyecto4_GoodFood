import React from 'react';

/**
 * Tarjeta vertical que muestra información básica de las recetas devueltas por la API
 * @param image Imagen de la receta
 * @param title Nombre de la receta
 * @param mealType Tipo de comida
 * @param cuisineType Tipo de cocina
 * @returns {Element} Tarjeta
 */
const Card = ({image, title, mealType, cuisineType}) => {
    return (
        <article style={{ border: `1px solid black`}}>
            <img src={image} alt={title}/>
            <h1>{title}</h1>
            <ul>
                <li>{mealType}</li>
                <li>{cuisineType}</li>
            </ul>

        </article>
    );
};

export default Card;