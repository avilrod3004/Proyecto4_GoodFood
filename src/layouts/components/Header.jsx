import React from 'react';
import Navbar from "./Navbar.jsx";
import UserMenu from "./UserMenu.jsx";
import GoodFoodLogo from "../../assets/GoodFood_logo.svg";

const Header = () => {
    return (
        <header className="cabecera">
            <section className="cabecera__navegacion">
                <a className="navegacion__logo" href="/">
                    <img className="logo__imagen" src={GoodFoodLogo} alt="Logo tipo de GoodFood"/>
                </a>

                <Navbar/>
            </section>

            <UserMenu/>
        </header>
    );
};

export default Header;