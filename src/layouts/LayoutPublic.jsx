import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Button from "../components/Button.jsx";

const LayoutPublic = () => {
    return (
        <>
            <header style={{ border: `1px solid black` }}>
                <h1>GoodFood</h1>
                <Navbar/>
                {/*<Button texto={"Login"}></Button>*/}
                {/*<Button texto={"Sign up"}></Button>*/}
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Sign up</NavLink>
            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPublic;