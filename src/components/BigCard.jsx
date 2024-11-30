import React from 'react';

const BigCard = ({id, image, title, mealType, cuisineType, healthLabels, totalTime}) => {
    return (
        <article style={{border: `1px solid black`}}>
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