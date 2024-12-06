import React from 'react';

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

    const validateIngredients = text => {
        const regex = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/i;
        return regex.test(text);
    }

    const validateMinutes = minutes => {
        const regex = /^[1-9]\d*$/;
        return regex.test(minutes);
    }

    return (
        <>
            <aside>
                <form action="">
                    <label htmlFor="q">
                        Ingredient:
                        <input
                            type="text"
                            name="q"
                            value={filters.q}
                            onChange={validateInput}
                        />
                        {filterErrors.q !== "" ? <p>{filterErrors.q}</p> : null}
                    </label>

                    <h1>Filters</h1>

                    {
                        page !== "mealsTypes" && (
                            <fieldset>
                                <legend>Meal type</legend>
                                {mealTypesOptions.map((option) => (
                                    <label key={option}>
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

                    <fieldset>
                        <legend>Cuisine type</legend>
                        {cuisineTypeOptions.map((option) => (
                            <label key={option}>
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

                    <fieldset>
                        <legend>Health</legend>
                        {healthOptions.map((option) => (
                            <label key={option}>
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
                            <fieldset>
                                <legend>Max. time</legend>
                                <label>
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
            </aside>
        </>
    );
};

export default FilterRecipes;