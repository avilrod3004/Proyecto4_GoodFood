import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {getUserData} from "../config/Firebase.jsx";

const RecipeInfo = () => {

    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }

    // Estados - recetas
    const {id} = useParams();
    const [recipe, setRecipe] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    // Llamada a la API
    async function getRecipeInfo() {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${api_data.id}&app_key=${api_data.key}`);
            const data = await response.json();
            setRecipe(data.recipe || {});
            console.log("Recipe info", data.recipe);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        getRecipeInfo();
    }, [id])

    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]


    // Estados - usuario
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState(null);

    // Obtener los datos del usuario al cargar la página
    const fetchUserData = async (uid) => {
        const data = await getUserData(uid);
        if (data) {
            console.log("Datos del usuario:", data);
            setUserData(data);
        }
    };

    useEffect(() => {
        fetchUserData(user.uid);
    }, [])

    // Agregar una receta a favoritos
    const addFavorite = () => {

    }

    // Eliminar una receta de favoritos
    const deteteFavorito = () => {
        const updateFavoriteRecipes = userData.favoriteRecipes.filter((recipeSaved) => recipeSaved.id !== getRecipeId(recipe.uri));
        setUserData({
            ...userData,
            favoriteRecipes: updateFavoriteRecipes,
        })
    }

    // ¿Está marcado?
    const isMarked = () => {
        return userData.favoriteRecipes.some((item) => item.id === getRecipeId(recipe.uri))
    }

    return (
        <>
            {loading && <p>Loading...</p>}

            {!loading && (
                <article>
                    <img src={recipe.images.REGULAR.url} alt=""/>
                    <button onClick={() => isMarked() ? deteteFavorito : addFavorite }>Add fovorite</button>
                    <p>
                        {
                            userData && isMarked() ? "si" : "no"
                        }
                    </p>
                    <h1>{recipe.label}</h1>
                    <ul>
                        <li>Cuisine type: {recipe.cuisineType}</li>
                        <li>Meal type: {recipe.mealType}</li>
                        <li>Time: {recipe.totalTime}</li>
                    </ul>

                    <ul>
                        {
                            recipe.healthLabels.map((label, index) => (
                                <li key={index}>{label}</li>
                            ))
                        }
                    </ul>

                    <h2>Ingredients</h2>
                    <ul>
                        {
                            recipe.ingredientLines.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))
                        }
                    </ul>

                    <a href={recipe.url} target="_blank">More details</a>
                </article>
            )}
        </>

    );
};

export default RecipeInfo;