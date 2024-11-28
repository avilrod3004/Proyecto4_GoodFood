import React, {useContext, useEffect} from 'react';
import Navbar from "./components/Navbar.jsx";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";
import {logOut} from "../config/Firebase.jsx";
import UserMenu from "./components/UserMenu.jsx";

const LayoutPrivate = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    return (
        <>
            <header style={{ border: `1px solid black` }}>
                <h1>GoodFood</h1>
                <Navbar/>
                <UserMenu/>
            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPrivate;