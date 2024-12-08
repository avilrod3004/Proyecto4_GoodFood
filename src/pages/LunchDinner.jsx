import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

/**
 * Componente que muestra las recetas de comida y cena disponibles.
 * Utiliza el componente SearchRecipes para permitir a los usuarios buscar recetas con filtros personalizados.
 * El estado inicial de los filtros se define dentro del componente, proporcionando valores por defecto para los campos de búsqueda.
 *
 * @return {Element} Un componente que renderiza el componente SearchRecipes con los filtros iniciales.
 * */
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