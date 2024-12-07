import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {notifySuccess, notifyWarning} from "../utils/Toast.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import HealthLabelsList from "../components/HealthLabelsList.jsx";

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

    // Llama a la API para obtener la información de la receta
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

    // Obtener los datos del usuario de la base de datos
    const getUserData = () => {
        const data = JSON.parse(localStorage.getItem("user"));

        setUserData({
            ...userDataInitial,
            ...data,
        });
    };

    // Actualizar los datos del usuario en la base de datos
    const updateUserData = (updatedData, action) => {
        localStorage.setItem("user", JSON.stringify(updatedData));

        if (action === "marked") {
            notifySuccess("Added to favorites", "light")
        } else {
            notifyWarning("Removed from favorites", "light");
        }
    }

    // Obtener el id de la receta
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    // Agregar una receta a favoritos
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

    // Eliminar una receta de favoritos
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

    // ¿Está marcada como favorita?
    const isMarked = () => {
        if (!recipe.uri || !userData.favoriteRecipes) return false;
        return userData.favoriteRecipes.some((item) => item.id === getRecipeId(recipe.uri))
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
                    <button onClick={() => (recipeFavorite ? deteteFavorite() : addFavorite())}>
                        {recipeFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>

                    <p>
                        {
                            recipeFavorite ? "si" : "no"
                        }
                    </p>

                    <h1 className="texto-info__nombre">{recipe.label}</h1>
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

                    <h2 className="texto-info__listado-ingredientes">Ingredients</h2>
                    <ul>
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