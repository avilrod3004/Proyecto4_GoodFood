import React from 'react';

const Card = ({image, title, mealType, cuisineType}) => {
    return (
        <article>
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