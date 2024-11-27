import React, {useEffect, useState} from 'react';
import Button from "../components/Button.jsx";
// import "../../public/img_home.jpeg"
import "../sass/main.scss"

const Home = () => {
    const api_data = {
        id: import.meta.env.VITE_RECIPES_API_ID,
        key: import.meta.env.VITE_RECIPES_API_KEY,
    }
    // Estados
    const [recipes, setRecipes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const recipesPerPage = 3; // Número de recetas por página

    async function getRandomRecipes() {
        try {
            const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&app_id=${api_data.id}&app_key=${api_data.key}&diet=balanced&random=true`);
            const data = await response.json();
            setRecipes(data.hits || []);
            setLoading(false);
            console.log(data.hits);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getRandomRecipes();
    }, [])

    // Lógica para obtener las recetas de la página actual
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Cambiar página
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



    return (
        <>
            <h1>Looking for new recipes</h1>
            <h2>Bored of always eating the same thing?</h2>
            <img src="/img_home.jpeg" alt="Cocina"/>
            <Button texto="What would you like to cook?"></Button>

            {loading && <p>Loading...</p>}
            {/* llamada api para mostrar 20 recetas */}
            {!loading && (
                <>
                    <ul>
                        {currentRecipes.map((recipe, index) => (
                            <li key={index}>
                                {recipe.recipe.label} || {recipe.recipe.mealType} || {recipe.recipe.cuisineType}
                            </li>
                        ))}
                    </ul>
                    {/* Botones de navegación */}
                    <div>
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
                    </div>
                </>
            )}
        </>
    );
};

export default Home;