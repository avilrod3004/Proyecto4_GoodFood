import React from 'react';
import {useNavigate} from "react-router-dom";
import RelojLight from "../assets/reloj_light.svg"
import RelojDark from "../assets/reloj_dark.svg"
import HealthLabelsList from "./HealthLabelsList.jsx";


const BigCard = ({id, image, title, mealType, cuisineType, healthLabels, totalTime}) => {
    const navigate = useNavigate();

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
                    <img className="tiempo__imagen" src={RelojLight} alt="Time: "/>
                    <p className="tiempo__numero">{totalTime}&#39;</p>
                </div>
            </div>
        </article>
    );
};

export default BigCard;