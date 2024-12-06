import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

const Breakfast = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: ["Breakfast"],
        cuisineTypes: [],
        health: [],
        maxTime: "" // Aplicar filtro por defecto
    }

    return (
        <>
            <SearchRecipes filtersInitialValues={filtersInitialValues} page="mealsTypes"/>
        </>
    );
};

export default Breakfast;