import React from 'react';
import multimeter from "../../assets/multimeter.png";
import multimeterMobile from "../../assets/multimeter-mobile.png";
import {useMediaQuery} from "react-responsive";

const Banner = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return (
        <div className='banner'>
            <img src={isMobile ? multimeterMobile : multimeter} alt="Мультиметр" draggable={false}/>
        </div>
    );
};

export default Banner;