import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext.jsx";
import Navbar from "./Navbar.jsx";
import {NavLink} from "react-router-dom";
import {logOut} from "../../config/Firebase.jsx";

const UserMenu = () => {
    const {user, setUser} = useContext(UserContext);

    const handleLogout = async () => {
        await logOut();
        setUser(false)
    }
    return (
        <>
            {
                user
                    ? <NavLink onClick={handleLogout} to="/">Log out</NavLink>
                    : <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Sign up</NavLink>
                    </>
            }
        </>
    );
};

export default UserMenu;