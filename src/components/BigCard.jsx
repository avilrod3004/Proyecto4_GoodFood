import React from 'react';
import {useNavigate} from "react-router-dom";
import RelojLight from "../assets/reloj_light.svg"
import RelojDark from "../assets/reloj_dark.svg"

import AlcoholFreeDark from "../assets/alcohol-free_dark.png";
import AlcoholFreeLight from "../assets/alcohol-free_light.png";

import CeleryFreeDark from "../assets/celery-free_dark.png";
import CeleryFreeLight from "../assets/celery-free_light.png";

import DairyFreeDark from "../assets/dairy-free_dark.png";
import DairyFreeLight from "../assets/dairy-free_light.png";

import EggFreeDark from "../assets/egg-free_dark.png";
import EggFreeLight from "../assets/egg-free_light.png";

import FishFreeDark from "../assets/fish-free_dark.png";
import FishFreeLight from "../assets/fish-free_light.png";

import GlutenFreeDark from "../assets/gluten-free_dark.png";
import GlutenFreeLight from "../assets/gluten-free_light.svg"

import LowSugarDark from "../assets/low-sugar_dark.png";
import LowSugarLight from "../assets/low-sugar_light.png";

import MustardFreeDark from "../assets/mustard-free_dark.png";
import MustardFreeLight from "../assets/mustard-free_light.png";

import PeanutFreeDark from "../assets/peanut-free_dark.png";
import PeanutFreeLight from "../assets/peanut-free_light.png";

import PorkFreeDark from "../assets/pork-free_dark.png";
import PorkFreeLight from "../assets/pork-free_light.png";

import SoyFreeDark from "../assets/soy-free_dark.png";
import SoyFreeLight from "../assets/soy-free_light.png";

import VeganDark from "../assets/vegan_dark.png";
import VeganLight from "../assets/vegan_light.png";

import VegetarianDark from "../assets/vegetarian_dark.png";
import VegetarianLight from "../assets/vegetarian_light.png";


const BigCard = ({id, image, title, mealType, cuisineType, healthLabels, totalTime}) => {
    const navigate = useNavigate();

    const healthIconsLight = {
        "Alcohol-Free": AlcoholFreeLight,
        "Celery-Free": CeleryFreeLight,
        "Dairy-Free": DairyFreeLight,
        "Egg-Free": EggFreeLight,
        "Fish-Free": FishFreeLight,
        "Gluten-Free": GlutenFreeLight,
        "Low-Sugar": LowSugarLight,
        "Mustard-Free": MustardFreeLight,
        "Peanut-Free": PeanutFreeLight,
        "Pork-Free": PorkFreeLight,
        "Soy-Free": SoyFreeLight,
        "Vegan": VeganLight,
        "Vegetarian": VegetarianLight
    };

    const healthIconsDark = {
        "Alcohol-Free": AlcoholFreeDark,
        "Celery-Free": CeleryFreeDark,
        "Dairy-Free": DairyFreeDark,
        "Egg-Free": EggFreeDark,
        "Fish-Free": FishFreeDark,
        "Gluten-Free": GlutenFreeDark,
        "Low-Sugar": LowSugarDark,
        "Mustard-Free": MustardFreeDark,
        "Peanut-Free": PeanutFreeDark,
        "Pork-Free": PorkFreeDark,
        "Soy-Free": SoyFreeDark,
        "Vegan": VeganDark,
        "Vegetarian": VegetarianDark
    };




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

                <ul className="texto-receta__listado-etiquetas">
                    {healthLabels.map((label) => {
                        const icon = healthIconsLight[label]; // Busca la imagen correspondiente
                        if (icon) {
                            return (
                                <li className="listado-etiquetas__etiqueta" key={label}>
                                    <img
                                        className="etiqueta__imagen"
                                        src={icon}
                                        alt={label}
                                        title={label}
                                    />
                                </li>
                            );
                        }
                        return null; // Si no hay imagen, no muestra nada
                    })}
                </ul>

                <div className="texto-receta__tiempo">
                    <img className="tiempo__imagen" src={RelojLight} alt="Time: "/>
                    <p className="tiempo__numero">{totalTime}&#39;</p>
                </div>
            </div>
        </article>
    );
};

export default BigCard;