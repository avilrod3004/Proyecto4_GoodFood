import React from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Componente `SmallCard`
 * Este componente representa una tarjeta pequeña que muestra información básica de una receta.
 * Al hacer clic en la tarjeta, el usuario es redirigido a la página de detalles de la receta seleccionada.
 *
 * @param {String} id - El identificador único de la receta.
 * @param {String} image - La URL de la imagen de la receta.
 * @param {String} title - El nombre de la receta.
 * @param {String} mealType - El tipo de comida de la receta
 * @param {String} cuisineType - El tipo de cocina de la receta
 * @returns {JSX.Element} Una tarjeta que muestra la receta con su imagen, nombre, tipo de comida y tipo de cocina.
 */
const SmallCard = ({id, image, title, mealType, cuisineType}) => {
    const navigate = useNavigate();

    /**
     * Redirige a la página de detalles de la receta.
     */
    const consultarReceta = () => {
        navigate(`/recipe/${id}`);
    }

    return (
        <div className="spinner">
            <div className="card-inner">
                {/*<article className="receta-pequenia-front">*/}
                {/*    <img className="receta-paquenia__imagen" src={image} alt={title}/>*/}
                {/*    <h1>Pepe</h1>*/}
                {/*</article>*/}
                <article className="receta-pequenia-back" onClick={() => {
                    consultarReceta()
                }}>
                    <img className="receta-paquenia__imagen" src={image} alt={title}/>
                    <div className="receta-paquenia__texto-receta">
                        <h1 className="texto-receta__titulo">{title}</h1>
                        <ul className="texto-receta__listado">
                            <li className="listado__dato">{mealType}</li>
                            <li className="listado__dato">{cuisineType}</li>
                        </ul>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default SmallCard;