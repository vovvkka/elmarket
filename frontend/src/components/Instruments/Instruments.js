import React from 'react';
import first from "../../assets/glavnaja-kartinka 1.png";
import second from "../../assets/top-view-electrical-tools-equipm 1.png";

const Instruments = () => {
    return (
        <div className="instruments">
            <div className="container">
                <div className="instruments__block">
                    <h2 className="instruments__title instruments__title--mobile">
                        Инструменты для <span>электромонтажных</span> <br/>
                        и строительных работ
                    </h2>

                    <div className="instruments__image-block">
                        <img className="instruments__image-first" src={first} alt=""/>
                        <img className="instruments__image-second" src={second} alt=""/>
                    </div>

                    <div className="instruments__info">
                        <h2 className="instruments__title">
                            Инструменты для <span>электромонтажных</span> <br/>
                            и строительных работ
                        </h2>

                        <p className="instruments__description">
                            Диэлектрические средства защиты. <br/>
                            Заклепочники для вытяжных заклепок. <br/>
                            Зарядные устройства USB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instruments;