import React from 'react';
import Navbar from "./components/Navbar.jsx";
import {Outlet} from "react-router-dom";

const LayoutPublic = () => {
    return (
        <>
            <header>
                <h1>GoodFood</h1>
                <Navbar/>
            </header>

            <Outlet/>

            <footer>
                soy un footer
            </footer>
        </>
    );
};

export default LayoutPublic;