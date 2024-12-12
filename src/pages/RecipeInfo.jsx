import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {notifySuccess, notifyWarning} from "../utils/Toast.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import HealthLabelsList from "../components/HealthLabelsList.jsx";
import BookMarkLight from "../assets/bookmark_light.svg";
import BookMarkedLight from "../assets/bookmarked_light.svg"
import BookMarkDark from "../assets/bookmark_dark.svg";
import BookMarkedDark from "../assets/bookmarked_dark.svg"
import {ThemeContext} from "../context/ThemeContext.jsx";

/**
 * Este componente muestra la información detallada de una receta, obtenida desde una API externa,
 * y permite a los usuarios agregar o eliminar esa receta de su lista de favoritos.
 * Los usuarios pueden ver detalles como el nombre de la receta, tipo de comida, tiempo de preparación, ingredientes y etiquetas de salud.
 * */
const RecipeInfo = () => {

    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }

    // Estados iniciales
    const userDataInitial = {
        userName: "",
        picture: "",
        biography: "",
        website: "",
        socialAccount1: "",
        socialAccount2: "",
        socialAccount3: "",
        name: "",
        lastName: "",
        phone: "",
        favoriteRecipes: []
    }

    // Estados
    const {id} = useParams();
    const [recipe, setRecipe] = useState({});
    const [recipeFavorite, setRecipeFavorite] = useState(false);
    const [loadingRecipe, setLoadingRecipe] = useState(true);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(userDataInitial);
    const {theme, toggleTheme} = useContext(ThemeContext);


    /**
     * Obtiene la información de la receta desde la API
     */
    async function getRecipeInfo() {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${api_data.id}&app_key=${api_data.key}`);
            const data = await response.json();
            setRecipe(data.recipe || {});
            setLoadingRecipe(false);
        } catch (error) {
            setLoadingRecipe(false);
            setError("Error: " + error);
        }
    }

    /**
     * Obtiene los datos del usuario desde el almacenamiento local
     */
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));

        setUserData({
            ...userDataInitial,
            ...data,
        });
    };

    /**
     * Actualiza los datos del usuario en el almacenamiento local
     *
     * @param updatedData - Datos del usuario actualizados
     * @param action - Acción que se está realizando (marcar o desmarcar receta)
     */
    const updateUserData = (updatedData, action) => {
        localStorage.setItem("user", JSON.stringify(updatedData));

        if (action === "marked") {
            notifySuccess("Added to favorites", theme)
        } else {
            notifyWarning("Removed from favorites", theme);
        }
    }

    /**
     * Obtiene el id de la receta a partir de su URI
     *
     * @param recipeUri - URI de la receta
     * @returns {string} - ID de la receta
     */
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    /**
     * Añade la receta a la lista de favoritos del usuario
     */
    const addFavorite = () => {
        const recipesList = userData.favoriteRecipes || [];
        const recipeData = {
            id: getRecipeId(recipe.uri),
            title: recipe.label,
            image: recipe.images.REGULAR.url,
            mealType: recipe.mealType,
            cuisineType: recipe.cuisineType,
            healthLabels: recipe.healthLabels,
            totalTime: recipe.totalTime
        }

        recipesList.push(recipeData);

        const updatedUserData = {
            ...userData,
            favoriteRecipes: recipesList
        }

        setUserData(updatedUserData);
        updateUserData(updatedUserData, "marked");

        setRecipeFavorite(true);
    }

    /**
     * Elimina la receta de la lista de favoritos del usuario
     */
    const deteteFavorite = () => {
        const updateFavoriteRecipes = userData.favoriteRecipes.filter((recipeSaved) => recipeSaved.id !== getRecipeId(recipe.uri));

        const updatedUserData = {
            ...userData,
            favoriteRecipes: updateFavoriteRecipes,
        };

        setUserData(updatedUserData);
        updateUserData(updatedUserData, "unmarked");

        setRecipeFavorite(false);
    }

    /**
     * Verifica si la receta está marcada como favorita
     *
     * @returns {boolean} - Retorna true si la receta está marcada, false si no
     */
    const isMarked = () => {
        if (!recipe.uri || !userData.favoriteRecipes) return false;
        return userData.favoriteRecipes.some((item) => item.id === getRecipeId(recipe.uri))
    }

    /**
     * Obtiene el icono correspondiente a si la receta está marcada como favorita y el tema.
     *
     * @param {boolean} marked - Si la receta está en favoritos.
     * @param {string} theme - El tema actual, puede ser "light" o "dark".
     * @returns {string} - La ruta al icono de marcado correspondiente.
     */
    const getIconFavorite = (marked, theme) => {
        if (marked) {
            return theme === "light" ? BookMarkedLight : BookMarkedDark;
        } else {
            return theme === "light" ? BookMarkLight : BookMarkDark;
        }
    }

    // Al cargar la página
    useEffect(() => {
        getRecipeInfo();
        getUserData();
    }, [])

    // Verificar si la receta está marcada como favorita cuando los datos estén listos
    useEffect(() => {
        if (!loadingRecipe && recipe.uri) {
            const marked = isMarked();
            setRecipeFavorite(marked);
        }
    }, [loadingRecipe, recipe, userData]);

    if (loadingRecipe) return <Loading/>;
    if (error) return <ErrorMessage/>;


    return (
        <main className="info-receta">
            <article className="info-receta__tarjeta-info">
                <img className="tarjeta-info__imagen" src={recipe.image} alt={recipe.label}/>

                <aside className="tarjeta-info__texto-info">
                    <div className="tarjeta-info__encabezado-info">
                        <h1 className="encabezado-info__nombre">{recipe.label}</h1>

                        <a
                            className="encabezado-info__favoritos"
                            onClick={() => (recipeFavorite ? deteteFavorite() : addFavorite())}
                        >
                            <img
                                className="favortios__imagen"
                                src={getIconFavorite(recipeFavorite, theme)}
                                alt={recipeFavorite ? "Favorite" : "No favorite"}/>
                        </a>
                    </div>
                    <ul className="texto-info__listado-datos">
                        <li className="listado-datos__dato">
                            <span className="dato__nombre">Cuisine type: </span>
                            {recipe.cuisineType}
                        </li>
                        <li className="listado-datos__dato">
                            <span className="dato__nombre">Meal type: </span>
                            {recipe.mealType}
                        </li>
                        <li className="listado-datos__dato">
                            <span className="dato__nombre">Time: </span>
                            {recipe.totalTime} minutes
                        </li>
                    </ul>

                    <HealthLabelsList healthLabels={recipe.healthLabels}/>

                    <h2 className="texto-info__ingredientes">Ingredients</h2>
                    <ul className="texto-info__listado-ingredientes">
                        {
                            recipe.ingredientLines.map((ingredient, index) => (
                                <li className="listado-ingredientes__ingrediente" key={index}>{ingredient}</li>
                            ))
                        }
                    </ul>

                    <a className="texto-info__detalles" href={recipe.url} target="_blank">More details</a>
                </aside>
            </article>

            <ToastContainer/>
        </main>

    );
};

export default RecipeInfo;