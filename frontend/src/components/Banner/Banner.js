import React from 'react';
import multimeter from "../../assets/multimeter.png";

const Banner = () => {
    return (
        <div className='banner'>
            <img src={multimeter} alt="Мультиметр" draggable={false} width='1000' height='500'/>
        </div>
    );
};

export default Banner;