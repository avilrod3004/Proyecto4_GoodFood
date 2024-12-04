import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext.jsx";
import {getUserData, saveUserData} from "../config/Firebase.jsx";

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
    const [loadingUser, setLoadingUser] = useState(true);
    const [error, setError] = useState("");
    const {user, setUser} = useContext(UserContext);
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
        }
    }

    // Obtener los datos del usuario de la base de datos
    const fetchUserData = async (uid) => {
        try {
            const data = await getUserData(uid);
            setUserData({
                ...userDataInitial,
                ...data,
            });
            setLoadingUser(false);
        } catch (error) {
            setLoadingUser(false);
        }
    };

    // Actualizar los datos del usuario en la base de datos
    const updateUserData = async (updatedData) => {
        try {
            await saveUserData({
                ...updatedData,
                uid: user.uid
            });
        } catch (error) {
            console.error("Error:", error)
        }
    }

    // Obtener el id de la receta
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    // Agregar una receta a favoritos
    const addFavorite = async () => {
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
        await updateUserData(updatedUserData);

        setRecipeFavorite(true);
    }

    // Eliminar una receta de favoritos
    const deteteFavorite = async () => {
        const updateFavoriteRecipes = userData.favoriteRecipes.filter((recipeSaved) => recipeSaved.id !== getRecipeId(recipe.uri));

        const updatedUserData = {
            ...userData,
            favoriteRecipes: updateFavoriteRecipes,
        };

        setUserData(updatedUserData);
        await updateUserData(updatedUserData);

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
        fetchUserData(user.uid);
    }, [])

    // Verificar si la receta está marcada como favorita cuando los datos estén listos
    useEffect(() => {
        if (!loadingRecipe && !loadingUser && recipe.uri) {
            const marked = isMarked();
            setRecipeFavorite(marked);
        }
    }, [loadingRecipe, loadingUser, recipe, userData]);

    if (loadingRecipe || loadingUser) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <article>
                <img src={recipe.images.REGULAR.url} alt=""/>

                <button onClick={() => (recipeFavorite ? deteteFavorite() : addFavorite())}>
                    {recipeFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>

                <p>
                    {
                        recipeFavorite ? "si" : "no"
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
        </>

    );
};

export default RecipeInfo;