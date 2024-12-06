import React, {useEffect, useState} from 'react';
import FilterRecipes from "../components/FilterRecipes.jsx";
import SmallCard from "../components/SmallCard.jsx";
import BigCard from "../components/BigCard.jsx";
import Loading from "../components/Loading.jsx";
import SearchRecipes from "../components/SearchRecipes.jsx";

const QuickRecipes = () => {
    // Estado inicial
    const filtersInitialValues = {
        q: "",
        mealTypes: [],
        cuisineTypes: [],
        health: [],
        maxTime: "15" // Aplicar filtro por defecto
    }

    return (
        <>
            <SearchRecipes filtersInitialValues={filtersInitialValues} page="quickRecipes" />
        </>
    );
};

export default QuickRecipes;