import React, {useContext, useEffect} from 'react';
import Navbar from "./components/Navbar.jsx";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import Footer from "./components/Footer.jsx";
import {UserContext} from "../context/UserContext.jsx";

const LayoutPrivate = () => {
    const {user} = useContext(UserContext);
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
                {/*<Button texto={"Login"}></Button>*/}
                {/*<Button texto={"Sign up"}></Button>*/}
                <NavLink to="/">Log out</NavLink>

            </header>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default LayoutPrivate;