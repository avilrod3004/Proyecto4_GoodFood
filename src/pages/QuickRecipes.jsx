import React, {useState} from 'react';
import FilterRecipes from "../components/FilterRecipes.jsx";

const QuickRecipes = () => {
    // Estados iniciales
    const filtersInitialValues = {
        q: "",
        mealTypes: [],
        cuisineTypes: [],
        health: [],
        maxTime: "15" // Aplicar filtro por defecto
    }

    const errorFiltersInitial = {
        q: "",
        maxTime: ""
    }

    // Estados
    const [filters, setFilters] = useState(filtersInitialValues)
    const [filterErrors, setFilterErrors] = useState(errorFiltersInitial)

    return (
        <>
            Quick recipes

            <FilterRecipes
                filters={filters}
                setFilters={setFilters}
                filterErrors={filterErrors}
                setFilterErrors={setFilterErrors}
            />
        </>
    );
};

export default QuickRecipes;