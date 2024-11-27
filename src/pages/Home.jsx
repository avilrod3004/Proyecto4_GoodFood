import React, {useEffect} from 'react';
import Button from "../components/Button.jsx";
// import "../../public/img_home.jpeg"
import "../sass/main.scss"

const Home = () => {
    // Estados
    const [recipes, setRecipes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    async function getRandomRecipes() {
        try {
            const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&app_id=32da34cb&app_key=7e487e43eed86b77a71e9d6f40b63073&diet=balanced&random=true");
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


    return (
        <>
            <h1>Looking for new recipes</h1>
            <h2>Bored of always eating the same thing?</h2>
            <img src="/img_home.jpeg" alt="Cocina"/>
            <Button texto="What would you like to cook?"></Button>

            {loading && <p>Loading...</p>}
            {/* llamada api para mostrar 20 recetas */}
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index}>{recipe.recipe.label}</li>
                ))}
            </ul>
        </>
    );
};

export default Home;