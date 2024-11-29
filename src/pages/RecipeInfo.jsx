import React, {useEffect} from 'react';

const RecipeInfo = () => {

    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }

    // Estados
    const [recipe, setRecipe] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    async function getRecipeInfo(recipeId) {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${api_data.id}&app_key=${api_data.key}`);
            const data = await response.json();
            setRecipe(data.recipe || {});
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        const recipeId = localStorage.getItem("receta");
        getRecipeInfo(recipeId);
    }, [])

    return (
        <>
            {loading && <p>Loading...</p>}

            {!loading && (
                <article>
                    <img src={recipe.images.REGULAR.url} alt=""/>
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

                    <a href={recipe.url}>More details</a>
                </article>
            )}
        </>

    );
};

export default RecipeInfo;