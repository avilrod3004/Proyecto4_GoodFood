import React, {useEffect, useState} from 'react';
import FilterRecipes from "../components/FilterRecipes.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";

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

    const [recipes, setRecipes] = useState([]);
    const [recipesCounter, setRecipesCounter] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cardSize, setCardSize] = useState("small");

    const [pagesList, setPagesList] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    // Saber si un objeto está vacío
    function isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }

    // Añadir los filtros a la url de la peticion
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

    // Obtener las recetas según los filtros
    async function getRecipes(request, addToPagesList = true) {
        try {
            const response = await fetch(request)
            const data = await response.json()

            setRecipes(data.hits || [])
            setRecipesCounter(data.count)
            setNextPage(isEmptyObject(data._links) ? null : data._links.next.href)

            if (addToPagesList) {
                setPagesList([...pagesList, request])
            }

            setCurrentPage(pagesList.length - 1)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(`${error.code} - ${error.message}`);
        }
    }

    // Obtener el id de una receta
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    // Pasar a la siguiente página de las recetas obtenidas
    const goToNextPage = () => {
        getRecipes(nextPage)
    }

    // Volver a la página anterior de las recetas obtenidas
    const goToPreviousPage = () => {
        pagesList.pop()
        getRecipes(pagesList.at(pagesList.length - 1), false)
    }

    useEffect(() => {
        addFilters()

        setPagesList([])
        setNextPage(null)
        setCurrentPage(0)

        if (pagesList.length === 0 && nextPage === null && currentPage === 0) {
            getRecipes(urlFilters)
        }
    }, [filters])

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <FilterRecipes
                filters={filters}
                setFilters={setFilters}
                filterErrors={filterErrors}
                setFilterErrors={setFilterErrors}
            />

            <section>
                <header>
                    <h1>Search result: <span>{recipesCounter}</span></h1>

                    <button onClick={() => {
                        cardSize === "small" ? setCardSize("big") : setCardSize("small")
                    }}>Change card size
                    </button>
                </header>

                {recipes.map((recipe, index) => (
                    cardSize === "small" ? (
                            <SmallCard
                                key={index}
                                id={getRecipeId(recipe.recipe.uri)}
                                image={recipe.recipe.images.THUMBNAIL.url}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}
                            />
                        )
                        : (
                            <BigCard
                                key={index}
                                id={getRecipeId(recipe.recipe.uri)}
                                image={recipe.recipe.images.THUMBNAIL.url}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}
                                healthLabels={recipe.recipe.healthLabels}
                                totalTime={recipe.recipe.totalTime}
                            />
                        )
                ))}

                <footer>
                    <button onClick={() => goToPreviousPage()} disabled={pagesList.length === 1}>Previous</button>
                    <span>{currentPage + 1} of {Math.ceil(recipesCounter / 20)}</span>
                    <button onClick={() => goToNextPage()} disabled={nextPage === null}>Next</button>
                </footer>
            </section>

            {recipes.length === 0 && (
                <p>Nothing found :(</p>
            )}
        </>
    );
};

export default QuickRecipes;