import React, {useEffect, useState} from 'react';
import FilterRecipes from "../components/FilterRecipes.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";
import Loading from "../components/Loading.jsx";
import BigCardLight from "../../src/assets/big_cards_light.svg";
import BigCardDark from "../../src/assets/big_cards_dark.svg";
import SmallCardLight from "../../src/assets/small_cards_light.svg";
import SmallCardDark from "../../src/assets/small_cards_dark.svg";
import SadFaceDark from "../../src/assets/sad_face_dark.svg";
import SadFaceLight from "../../src/assets/sad_face_light.svg";
import ButtonToTop from "./ButtonToTop.jsx";

const SearchRecipes = ({filtersInitialValues, page}) => {

    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }

    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${api_data.id}&app_key=${api_data.key}`
    let urlFilters = url;

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

    if (loading) return <Loading/>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="busqueda">
            <aside className="busqueda__filtros">
                <FilterRecipes
                    filters={filters}
                    setFilters={setFilters}
                    filterErrors={filterErrors}
                    setFilterErrors={setFilterErrors}
                    page={page}
                />
            </aside>

            <section className="busqueda__resultados">
                <header className="resultados__encabezado">
                    <p className="encabezado__contador">
                        Search result:
                        <span className="contador__numero">{recipesCounter} recipes</span>
                    </p>

                    <a
                        className="encabezado__vista"
                        onClick={() => {
                            cardSize === "small" ? setCardSize("big") : setCardSize("small")
                        }}
                    >
                        {
                            cardSize === "small"
                                ? (
                                    <img
                                        className="vista__imagen"
                                        src={BigCardLight}
                                        alt="Change cards size"
                                    />
                                ) : (
                                    <img
                                        className="vista__imagen"
                                        src={SmallCardLight}
                                        alt="Change cards size"
                                    />
                                )
                        }
                    </a>
                </header>

                {recipes.length === 0 && (
                    <div className="resultados__nada">
                        <img className="nada__imagen" src={SadFaceLight} alt=":("/>
                        <p className="nada__mensaje">Sorry, we couldn&#39;t find any recipes that match your search. Try using different ingredients
                            or filters!</p>
                    </div>
                )}

                {recipes.map((recipe, index) => (
                    cardSize === "small" ? (
                            <SmallCard
                                key={index}
                                id={getRecipeId(recipe.recipe.uri)}
                                image={recipe.recipe.image}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}
                            />
                        )
                        : (
                            <BigCard
                                key={index}
                                id={getRecipeId(recipe.recipe.uri)}
                                image={recipe.recipe.images}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}
                                healthLabels={recipe.recipe.healthLabels}
                                totalTime={recipe.recipe.totalTime}
                            />
                        )
                ))}

                {recipes.length !== 0 && (
                    <>
                        <nav className="resultados__paginacion">
                            <button
                                className="paginacion__boton"
                                onClick={() => goToPreviousPage()}
                                disabled={pagesList.length === 1}
                            >
                                Previous
                            </button>

                            <span className="paginacion__texto">
                        {currentPage + 1} of {Math.ceil(recipesCounter / 20)}
                    </span>
                            <button
                                className="paginacion__boton"
                                onClick={() => goToNextPage()}
                                disabled={nextPage === null}
                            >
                                Next
                            </button>
                        </nav>

                        <ButtonToTop/>
                    </>
                )}
            </section>
        </main>
    );
};

export default SearchRecipes;