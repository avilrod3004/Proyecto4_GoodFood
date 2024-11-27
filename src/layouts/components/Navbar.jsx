import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";

const Navbar = () => {
    console.log(useContext(UserContext));
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