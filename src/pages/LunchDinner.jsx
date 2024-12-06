import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

const LunchDinner = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: ["Dinner", "Lunch"],
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

export default LunchDinner;