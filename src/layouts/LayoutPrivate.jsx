import React, {useContext, useEffect} from 'react';
import Navbar from "./components/Navbar.jsx";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";
import {logOut} from "../config/Firebase.jsx";

const LayoutPrivate = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user])

    const handleLogout = async () => {
        await logOut();
        setUser(false)
    }

    return (
        <>
            <header style={{ border: `1px solid black` }}>
                <h1>GoodFood</h1>
                <Navbar/>
                <NavLink onClick={handleLogout} to="/">Log out</NavLink>

            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPrivate;