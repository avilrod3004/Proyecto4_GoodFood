import React from 'react';
import {validateIngredients, validateMinutes} from "../utils/ValidateForms.jsx";

/**
 * Componente `FilterRecipes`
 * Este componente permite filtrar recetas según diferentes criterios como los ingredientes, el tiempo máximo
 * de preparación, el tipo de comida, el tipo de cocina y opciones relacionadas con la salud. Utiliza un conjunto de
 * opciones predeterminadas y también realiza validaciones en los inputs proporcionados por el usuario.
 *
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Object} props.filters - El estado actual de los filtros aplicados.
 * @param {Function} props.setFilters - Función para actualizar los filtros.
 * @param {Object} props.filterErrors - El estado actual de los errores de validación de los filtros.
 * @param {Function} props.setFilterErrors - Función para actualizar los errores de validación.
 * @param {string} props.page - La página actual que influye en qué filtros se mostrarán.
 * @returns {JSX.Element} El formulario de filtros para buscar recetas.
 */
const FilterRecipes = ({filters, setFilters, filterErrors, setFilterErrors, page}) => {
    // Opciones predeterminadas para los filtros
    const mealTypesOptions = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];
    const cuisineTypeOptions = ["American", "Asian", "British", "Caribbean", "Chinese", "French", "Indian", "Italian", "Japanese", "Mediterranean", "Nordic"]
    const healthOptions = ["Alcohol-free", "Celery-free", "Dairy-free", "Egg-free", "Fish-free", "Gluten-free", "Low-sugar", "Mustard-free", "Peanut-free", "Pork-free", "Soy-free", "Vegan", "Vegetarian"];

    /**
     * Manejar la validación y actualización de los filtros.
     * Esta función maneja diferentes tipos de entradas, como texto y casillas de verificación.
     * Además, realiza la validación de los ingredientes y del tiempo máximo de preparación.
     *
     * @param {Object} event - El evento de cambio generado por el input.
     */
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
                    [name]: `* Separate ingredients with spaces`
                })
            }
        }

        if (value.trim() && name === "maxTime") {
            const valid = validateMinutes(value)
            if (!valid) {
                setFilterErrors({
                    ...filterErrors,
                    [name]: `* Must be an integer and positive`
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
                            className={filterErrors.q !== "" ? "label-filtros__input label-filtros__input-error" : "label-filtros__input"}
                            type="text"
                            name="q"
                            value={filters.q}
                            onChange={validateInput}
                        />
                    </label>
                    {
                        filterErrors.q !== "" &&
                        <p className="leyenda-filtros__error">{filterErrors.q}</p>
                    }
                </fieldset>

                {
                    page !== "quickRecipes" && (
                        <fieldset className="formulario-filtros__fieldset-filtros">
                            <legend className="fieldset-filtros__leyenda-filtros">Max. time</legend>
                            <label className="leyenda-filtros__checkbox">
                                <input
                                    className={filterErrors.maxTime !== "" ? "label-filtros__input label-filtros__input-error" : "label-filtros__input"}
                                    type="text"
                                    name="maxTime"
                                    value={filters.maxTime}
                                    onChange={validateInput}
                                />
                            </label>
                            {
                                filterErrors.maxTime !== ""
                                && <p className="leyenda-filtros__error">{filterErrors.maxTime}</p>
                            }
                        </fieldset>
                    )
                }

                {
                    page !== "mealsTypes" && (
                        <fieldset className="formulario-filtros__fieldset-filtros">
                            <legend className="fieldset-filtros__leyenda-filtros">Meal type</legend>
                            {mealTypesOptions.map((option) => (
                                <label key={option} className="leyenda-filtros__checkbox">
                                    <input
                                        className="checkbox__opcion"
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
                                className="checkbox__opcion"
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
                                className="checkbox__opcion"
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
            </form>
        </>
    );
};

export default FilterRecipes;