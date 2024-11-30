import React, {useEffect, useState} from 'react';
import FilterRecipes from "../components/FilterRecipes.jsx";
import SmallCard from "../components/SmallCard.jsx";

const QuickRecipes = () => {
    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }

    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${api_data.id}&app_key=${api_data.key}`
    let urlFilters = url;

    // Estados iniciales
    const filtersInitialValues = {
        q: "",
        mealTypes: [],
        cuisineTypes: [],
        health: [],
        maxTime: "15" // Aplicar filtro por defecto
    }

    const errorFiltersInitial = {
        q: "",
        maxTime: ""
    }

    // Estados
    const [filters, setFilters] = useState(filtersInitialValues)
    const [filterErrors, setFilterErrors] = useState(errorFiltersInitial)
    const [recipes, setRecipes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = useState(null);


    const addFilters = () => {
        urlFilters = url

        if (filters.q.trim() !== "") {
            urlFilters = urlFilters + "&q=" + filters.q;
        }

        if (filters.mealTypes.length > 0) {
            filters.mealTypes.forEach(mealType => {
                urlFilters = urlFilters + "&mealType=" + mealType.toLowerCase();
            })
        }

        if (filters.cuisineTypes.length > 0) {
            filters.cuisineTypes.forEach(cuisineType => {
                urlFilters = urlFilters + "&cuisineType=" + cuisineType.toLowerCase();
            })
        }

        if (filters.health.length > 0) {
            filters.health.forEach(health => {
                urlFilters = urlFilters + "&health=" + health.toLowerCase();
            })
        }

        if (filters.maxTime.trim() !== "") {
            urlFilters = urlFilters + "&time=" + filters.maxTime;
        }
    }

    async function getRecipes() {
        try {
            const response = await fetch(urlFilters)
            const data = await response.json()
            setRecipes(data.hits || [])
            setLoading(false)
            setError(null)
        } catch (error) {
            setLoading(false)
            setError(`${error.code} - ${error.message}`);
        }
    }

    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    useEffect(() => {
        addFilters()
        console.log(urlFilters)
        getRecipes()
    }, [filters])

    return (
        <>
            Quick recipes

            <FilterRecipes
                filters={filters}
                setFilters={setFilters}
                filterErrors={filterErrors}
                setFilterErrors={setFilterErrors}
            />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {!loading && (
                <>
                    <section>
                        {recipes.map((recipe, index) => (
                            <SmallCard
                                key={index}
                                id={getRecipeId(recipe.recipe.uri)}
                                image={recipe.recipe.images.THUMBNAIL.url}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}/>
                        ))}
                    </section>
                </>
            )}

            {recipes.length === 0 && (
                <p>Nothing found :(</p>
            )}
        </>
    );
};

export default QuickRecipes;