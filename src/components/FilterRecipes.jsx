import React from 'react';
import {validateIngredients, validateMinutes} from "../utils/ValidateForms.jsx";

const FilterRecipes = ({filters, setFilters, filterErrors, setFilterErrors, page}) => {
    const mealTypesOptions = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
    const cuisineTypeOptions = ["American", "Asian", "British", "Caribbean", "Chinese", "French", "Indian", "Italian", "Japanese", "Mediterranean", "Nordic"]
    const healthOptions = ["Alcohol-free", "Celery-free", "Dairy-free", "Egg-free", "Fish-free", "Gluten-free", "Low-sugar", "Mollusk-free", "Mustard-free", "Peanut-free", "Pork-free", "Soy-free", "Vegan", "Vegetarian", "Wheat-free"];

    const validateInput = event => {
        let {name, value, checked, type} = event.target

        if (type === "text") {
            setFilterErrors({
                ...filterErrors,
                [name]: ""
            })
        }

        if (value.trim() && name === "q") {
            const valid = validateIngredients(value)
            if (!valid) {
                setFilterErrors({
                    ...filterErrors,
                    [name]: `Separe los ingredientes con espacios`
                })
            }
        }

        if (value.trim() && name === "maxTime") {
            const valid = validateMinutes(value)
            if (!valid) {
                setFilterErrors({
                    ...filterErrors,
                    [name]: `El valor de los minutos debe ser un número entero y positivo`
                })
            }
        }

        if (type === "checkbox") {
            const updatedChecked = filters[name].includes(value)
                ? filters[name].filter((option) => option !== value) // Desmarcar
                : [...filters[name], value]; // Marcar

            setFilters({
                ...filters,
                [name]: updatedChecked,
            });
        } else {
            setFilters({
                ...filters,
                [name]: value,
            });
        }
    }

    return (
        <>
            <form className="filter__formulario-filtros">
                <fieldset className="formulario-filtros__fieldset-filtros">
                    <legend className="fieldset-filtros__leyenda-filtros">Ingredients</legend>
                    <label htmlFor="q" className="leyenda-filtros__label">
                        <input
                            type="text"
                            name="q"
                            value={filters.q}
                            onChange={validateInput}
                        />
                        {filterErrors.q !== "" ? <p>{filterErrors.q}</p> : null}
                    </label>
                </fieldset>

                {
                    page !== "mealsTypes" && (
                        <fieldset className="formulario-filtros__fieldset-filtros">
                            <legend className="fieldset-filtros__leyenda-filtros">Meal type</legend>
                            {mealTypesOptions.map((option) => (
                                <label key={option} className="leyenda-filtros__checkbox">
                                    <input
                                        type="checkbox"
                                        name="mealTypes"
                                        value={option}
                                        checked={filters.mealTypes.includes(option)}
                                        onChange={validateInput}
                                    />
                                    {option}
                                </label>
                            ))}
                        </fieldset>
                    )
                }

                <fieldset className="formulario-filtros__fieldset-filtros">
                    <legend className="fieldset-filtros__leyenda-filtros">Cuisine type</legend>
                    {cuisineTypeOptions.map((option) => (
                        <label key={option} className="leyenda-filtros__checkbox">
                            <input
                                type="checkbox"
                                name="cuisineTypes"
                                value={option}
                                checked={filters.cuisineTypes.includes(option)}
                                onChange={validateInput}
                            />
                            {option}
                        </label>
                    ))}
                </fieldset>

                <fieldset className="formulario-filtros__fieldset-filtros">
                    <legend className="fieldset-filtros__leyenda-filtros">Health</legend>
                    {healthOptions.map((option) => (
                        <label key={option} className="leyenda-filtros__checkbox">
                            <input
                                type="checkbox"
                                name="health"
                                value={option}
                                checked={filters.health.includes(option)}
                                onChange={validateInput}
                            />
                            {option}
                        </label>
                    ))}
                </fieldset>

                {
                    page !== "quickRecipes" && (
                        <fieldset className="formulario-filtros__fieldset-filtros">
                            <legend className="fieldset-filtros__leyenda-filtros">Max. time</legend>
                            <label className="leyenda-filtros__checkbox">
                                <input
                                    type="text"
                                    name="maxTime"
                                    value={filters.maxTime}
                                    onChange={validateInput}
                                />
                                {filterErrors.maxTime !== "" ? <p>{filterErrors.maxTime}</p> : null}
                            </label>
                        </fieldset>
                    )
                }
            </form>
        </>
    );
};

export default FilterRecipes;