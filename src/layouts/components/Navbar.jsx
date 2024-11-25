import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/quickrecipes">Quick recipes</NavLink>
            <NavLink to="/breakfast">Breakfast</NavLink>
            <NavLink to="/lunchdinner">Lunch/dinner</NavLink>
            <NavLink to="/contactus">Contact us</NavLink>
        </nav>
    );
}

export default Navbar;