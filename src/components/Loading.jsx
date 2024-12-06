import React from 'react';
import Carrot from "../assets/carrot.svg";
import Fish from "../assets/fish.svg";
import Apple from "../assets/apple.svg";
import Chicken from "../assets/chicken.svg";
import Shrimp from "../assets/shrimp.svg";

const Loading = () => {
    return (
        <main className="loading">
            <img className="loading__imagen" src={Carrot} alt="carrot"/>
            <img className="loading__imagen" src={Fish} alt="fish"/>
            <img className="loading__imagen" src={Apple} alt="apple"/>
            <img className="loading__imagen" src={Chicken} alt="chicken"/>
            <img className="loading__imagen" src={Shrimp} alt="shrimp"/>
        </main>
    );
};

export default Loading;