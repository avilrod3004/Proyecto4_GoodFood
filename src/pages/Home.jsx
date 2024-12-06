import React, {useEffect, useState} from 'react';
import Button from "../components/Button.jsx";
import Portada from "../assets/img_home.jpeg"
import "../sass/main.scss"
import SmallCard from "../components/SmallCard.jsx";

/**
 * Página principal de la web
 * @returns {Element} Página de inicio
 */
const Home = () => {
    // Datos API de recetas
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }
    // Estados
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const recipesPerPage = 20; // Número de recetas por página

    /**
     * Llamada a la API para obtener 20 recetas aleatorias
     */
    async function getRandomRecipes() {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${api_data.id}&app_key=${api_data.key}&diet=balanced&random=true`);
            const data = await response.json();
            setRecipes(data.hits || []);
            setLoading(false);
            setError(null);
        } catch (error) {
            setLoading(false);
            setError(`${error.code} - ${error.message}`);
        }
    }

    // Hace la peticion a la API al cargar el componente
    useEffect(() => {
        getRandomRecipes();
    }, [])

    const getRecipeId = (recipeUri) => recipeUri.split('recipe_')[1]

    // Paginación
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const nextPage = () => {
        if (currentPage < Math.ceil(recipes.length / recipesPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="entrada">
            <section className="entrada__portada">
                <div className="portada__texto">
                    <h1 className="texto__titulo">Looking for new recipes?</h1>
                    <h2 className="texto__subtitulo">Bored of always eating the same thing?</h2>
                    <a href="#" className="texto__boton">What would you like to cook?</a>
                </div>
                <img src={Portada} alt="Cocina" className="portada__imagen"/>
            </section>

            <section className="entrada__aletatorias">
                {currentRecipes.map((recipe, index) => (
                    <SmallCard
                        key={index}
                        id={getRecipeId(recipe.recipe.uri)}
                        image={recipe.recipe.image}
                        title={recipe.recipe.label}
                        mealType={recipe.recipe.mealType}
                        cuisineType={recipe.recipe.cuisineType}/>
                ))}
            </section>

            <nav>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                            Page {currentPage} of {Math.ceil(recipes.length / recipesPerPage)}
                        </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(recipes.length / recipesPerPage)}
                >
                    Next
                </button>
            </nav>
        </main>
    );
};

export default Home;