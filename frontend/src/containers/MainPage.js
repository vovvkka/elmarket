import React from 'react';
import MainPageProduction from "../components/MainPageProduction/MainPageProduction";
import Manufacturers from "../components/Manufacturers/Manufacturers";

const MainPage = () => {
    return (
        <div className="main-page">
            <MainPageProduction/>
            <Manufacturers/>
        </div>
    );
};

export default MainPage;