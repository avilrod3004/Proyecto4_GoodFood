import React from 'react';
import {Outlet} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Button from "../components/Button.jsx";

const LayoutPublic = () => {
    return (
        <>
            <header style={{ border: `1px solid black` }}>
                <h1>GoodFood</h1>
                <Navbar/>
                <Button texto={"Login"}></Button>
                <Button texto={"Sign up"}></Button>
            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPublic;