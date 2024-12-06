import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

const LunchDinner = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: ["Dinner", "Lunch"], // Aplicar filtro por defecto
        cuisineTypes: [],
        health: [],
        maxTime: ""
    }

    return (
        <>
            <SearchRecipes filtersInitialValues={filtersInitialValues} page="mealsTypes"/>
        </>
    );
};

export default LunchDinner;