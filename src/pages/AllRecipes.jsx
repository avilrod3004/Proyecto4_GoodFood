import React from 'react';
import SearchRecipes from "../components/SearchRecipes.jsx";

/**
 * Componente que muestra todas las recetas disponibles.
 * Utiliza el componente SearchRecipes para permitir a los usuarios buscar recetas con filtros personalizados.
 * El estado inicial de los filtros se define dentro del componente, proporcionando valores por defecto para los campos de búsqueda.
 *
 * @return {Element} Un componente que renderiza el componente SearchRecipes con los filtros iniciales.
* */
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