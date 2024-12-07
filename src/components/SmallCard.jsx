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
const SmallCard = ({id, image, title, mealType, cuisineType}) => {
    const navigate = useNavigate();

    const consultarReceta = () => {
        navigate(`/recipe/${id}`);
    }

    return (
        <article className="receta-pequenia" onClick={() => {consultarReceta()}}>
            <img className="receta-paquenia__imagen" src={image} alt={title}/>
            <div className="receta-paquenia__texto-receta">
                <h1 className="texto-receta__titulo">{title}</h1>
                <ul className="texto-receta__listado">
                    <li className="listado__dato">{mealType}</li>
                    <li className="listado__dato">{cuisineType}</li>
                </ul>
            </div>

        </article>
    );
};

export default SmallCard;