import React from 'react';
import MainPageProduction from "../components/MainPageProduction/MainPageProduction";
import Manufacturers from "../components/Manufacturers/Manufacturers";
import Instruments from "../components/Instruments/Instruments";

const MainPage = () => {
    return (
        <div className="main-page">
            <MainPageProduction/>
            <Manufacturers/>
            <Instruments/>
        </div>
    );
};

export default MainPage;