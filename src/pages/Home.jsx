import React from 'react';
import Button from "../components/Button.jsx";
// import "../../public/img_home.jpeg"

const Home = () => {
    return (
        <>
            <h1>Looking for new recipes</h1>
            <h2>Bored of always eating the same thing?</h2>
            <img src="/img_home.jpeg" alt="Cocina"/>
            <Button texto="What would you like to cook?"></Button>

        {/* llamada api para mostrar 20 recetas */}
        </>
    );
};

export default Home;