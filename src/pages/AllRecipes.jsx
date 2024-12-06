import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

const AllRecipes = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: [],
        cuisineTypes: [],
        health: [],
        maxTime: ""
    }

    return (
        <>
            <SearchRecipes filtersInitialValues={filtersInitialValues} page="" />
        </>
    );
};

export default AllRecipes;