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
import ErrorMessage from "./ErrorMessage.jsx";

/**
 * Componente `SearchRecipes`
 * Este componente permite buscar recetas mediante filtros personalizados, mostrando los resultados en tarjetas de tamaño configurable.
 * Se conecta a una API para obtener los datos de las recetas y maneja la paginación, así como los errores que puedan surgir.
 *
 * @param {Object} filtersInitialValues - Valores iniciales de los filtros para la búsqueda (por ejemplo, ingredientes, tipos de comida, etc.).
 * @param {String} page - Nombre de la página en la que se va a mostrar el componente, influye en los filtros que se visualizan
 * @returns {JSX.Element} Componente que muestra los resultados de la búsqueda de recetas, con paginación y filtros aplicados.
 */
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

    /**
     * Verifica si un objeto está vacío.
     *
     * @param {Object} obj - El objeto que se va a verificar.
     * @returns {Boolean} `true` si el objeto está vacío, `false` en caso contrario.
     */
    function isEmptyObject(obj) {
        return Object.keys(obj).length === 0;
    }

    /**
     * Añade los filtros seleccionados a la URL de la petición.
     */
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

    /**
     * Obtiene las recetas según los filtros aplicados y maneja la paginación.
     *
     * @param {String} request - La URL de la solicitud a la API.
     * @param {Boolean} addToPagesList - Si se debe agregar la página actual a la lista de páginas.
     */
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

    /**
     * Obtiene el ID de una receta a partir de su URI.
     *
     * @param {String} recipeUri - La URI completa de la receta.
     * @returns {String} El ID de la receta.
     */
    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    /**
     * Cambia a la siguiente página de recetas.
     */
    const goToNextPage = () => {
        getRecipes(nextPage)
    }

    /**
     * Vuelve a la página anterior de recetas.
     */
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
    if (error) return <ErrorMessage />;

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
                                image={recipe.recipe.image}
                                title={recipe.recipe.label}
                                mealType={recipe.recipe.mealType}
                                cuisineType={recipe.recipe.cuisineType}
                                healthLabels={recipe.recipe.healthLabels}
                                totalTime={recipe.recipe.totalTime}
                            />
                        )
                ))}

                {recipes.length === 20 && (
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