import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

const Breakfast = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: ["Breakfast"], // Aplicar filtro por defecto
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

export default Breakfast;