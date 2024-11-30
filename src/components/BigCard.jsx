import React from 'react';
import {useNavigate} from "react-router-dom";

const BigCard = ({id, image, title, mealType, cuisineType, healthLabels, totalTime}) => {
    const navigate = useNavigate();

    const consultarReceta = () => {
        navigate(`/recipe/${id}`);
    }

    return (
        <article style={{border: `1px solid black`}} onClick={() => {consultarReceta()}}>
            <img src={image} alt={title}/>
            <h1>{title}</h1>
            <ul>
                <li>{mealType}</li>
                <li>{cuisineType}</li>
            </ul>

            <ul>
                {healthLabels.map((label) => (
                    <li key={label}>{label}</li>
                ))}
            </ul>

            <p>Time: {totalTime}</p>
        </article>
    );
};

export default BigCard;