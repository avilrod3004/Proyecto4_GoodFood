import React from 'react';
import Carrot from "../assets/carrot.svg";
import Fish from "../assets/fish.svg";
import Apple from "../assets/apple.svg";
import Chicken from "../assets/chicken.svg";

const Loading = () => {
    return (
        <div className="loading">
            <img className="loading__imagen" src={Carrot} alt=""/>
            <img className="loading__imagen" src={Fish} alt=""/>
            <img className="loading__imagen" src={Apple} alt=""/>
            <img className="loading__imagen" src={Chicken} alt=""/>
        </div>
    );
};

export default Loading;