import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";

const Navbar = () => {
    console.log(useContext(UserContext));
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/quickrecipes">Quick recipes</NavLink></li>
                <li><NavLink to="/breakfast">Breakfast</NavLink></li>
                <li><NavLink to="/lunchdinner">Lunch/dinner</NavLink></li>
                <li><NavLink to="/contactus">Contact us</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;