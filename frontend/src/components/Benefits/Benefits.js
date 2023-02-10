import React from "react";
import bulb from "../../assets/svg/bulb.svg";
import gear from "../../assets/svg/gear.svg";
import darts from "../../assets/svg/darts.svg";
import watch from "../../assets/svg/watch.svg";

const Benefits = () => {
    return (
        <div className="container">
            <h3 className="benefits__title">Наши преимущества</h3>
            <div className="benefits">
                <div className="benefits__card">
                    <div className="benefits__img">
                        <img src={bulb} alt="" />
                    </div>

                    <p className="benefits__text">
                        Выгодные цены, широкий ассортимент электрики
                    </p>
                </div>
                <div className="benefits__card">
                    <div className="benefits__img">
                        <img src={gear} alt="" />
                    </div>
                    <p className="benefits__text">Доставка по всему городу</p>
                </div>
                <div className="benefits__card">
                    <div className="benefits__img">
                        <img src={darts} alt="" />
                    </div>
                    <p className="benefits__text">
                        Скидки для оптовых покупателей
                    </p>
                </div>
                <div className="benefits__card">
                    <div className="benefits__img">
                        <img src={watch} alt="" />
                    </div>
                    <p className="benefits__text">
                        На нашем складе есть все актуальные позиции
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Benefits;
