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
    const {user, setUser} = useContext(UserContext);
    const [userData, setUserData] = useState(userDataInitial);

    // Llama a la API para obtener la información de la receta
    async function getRecipeInfo() {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=${api_data.id}&app_key=${api_data.key}`);
            const data = await response.json();
            setRecipe(data.recipe || {});
            // console.log("Recipe info", data.recipe);
            setLoadingRecipe(false);
        } catch (error) {
            setLoadingRecipe(false);
        }
    }

    // Obtener los datos del usuario de la base de datos
    const fetchUserData = async (uid) => {
        try {
            const data = await getUserData(uid);
            setUserData(data || {})
            setLoadingUser(false);
            console.log("Datos del usuario:", data);
        } catch (error) {
            console.log(error)
            setLoadingUser(false);
        }
    };

    // Actualizar los datos del usuario en la base de datos
    const updateUserData = () => {
        saveUserData(userData)
            .then(() => {
                console.log("Usuario actualizado")
            })
            .catch((error) => console.error("Error:", error));
    }

    // Obtener el id de la receta
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    // Agregar una receta a favoritos
    const addFavorite = () => {
        const recipesList = userData.favoriteRecipes;
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
        setUserData({
            ...userData,
            favoriteRecipes: recipesList
        });
    }

    // Eliminar una receta de favoritos
    const deteteFavorite = () => {
        const updateFavoriteRecipes = userData.favoriteRecipes.filter((recipeSaved) => recipeSaved.id !== getRecipeId(recipe.uri));
        setUserData({
            ...userData,
            favoriteRecipes: updateFavoriteRecipes,
        })
    }

    // Al cargar la página
    useEffect(() => {
        getRecipeInfo();
        fetchUserData(user.uid);
    }, [])

    useEffect(() => {
        recipeFavorite ? addFavorite() : deteteFavorite()
        updateUserData()
    }, [recipeFavorite]);

    return (
        <>
            {loadingRecipe && <p>Loading...</p>}

            {!loadingRecipe && !loadingUser && (
                <article>
                    <img src={recipe.images.REGULAR.url} alt=""/>
                    <button onClick={() => setRecipeFavorite(!recipeFavorite)}>Add fovorite</button>
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
            )}
        </>

    );
};

export default RecipeInfo;