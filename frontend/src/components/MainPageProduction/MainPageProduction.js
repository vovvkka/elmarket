import React from 'react';
import cable from "../../assets/electric-screened-cable.png";
import bulb from "../../assets/light-bulb.png"

const MainPageProduction = () => {
    return (
        <div className="production">
                <div className="production__block">
                    <div className="production__card production__card-1">
                        <div className="production__info">
                            <h2 className="production__title">Кабельная продукция</h2>
                            <p className="production__description production__description-1">
                                cиловые, греющие, <br/>
                                слаботочные кабели и аксессуары
                            </p>
                        </div>
                        <img className="production__image production__image-1" src={cable} alt="production"/>
                    </div>
                    <div className="production__card production__card-2">
                        <div className="production__info">
                            <h2 className="production__title">светотехнические изделия</h2>
                            <p className="production__description production__description-2">
                                светильники, прожекторы и лампы
                            </p>
                        </div>
                        <img className="production__image production__image-2" src={bulb} alt="production"/>
                    </div>
                </div>
        </div>
    );
};

export default MainPageProduction;