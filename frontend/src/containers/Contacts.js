import React from 'react';

const Contacts = () => {
    return (
        <div className="contacts">
            <div className="container-sm">
                <div className="contacts__block">
                    <div className="contacts__aboutUs">
                        <h2 className="contacts__title">
                            О компании
                        </h2>

                        <ul className="contacts__list">
                            <li>ОсОО “Има Электро”</li> <br/>

                            <li>+(996) 777-77-11-07</li>
                            <li>+(996)709-40-39-55</li>
                            <li>Electromarket.kg@gmail.com</li> <br/>

                            <li>Юр.адрес: УГНС Ленинского района, код 002</li>
                            <li>Код ОКПО 30023004</li> <br/>

                            <li>ИНН01603201810293</li>
                            <li>ОЗО ДКИБ-ЦЕНТР</li>
                            <li>Р/С 1180000107669503</li>
                            <li>БИК 118003</li>
                        </ul>
                    </div>
                    <div className="contacts__orders">
                        <div className="contacts__orders-block">
                            <p>
                                ПРИЕМ ЗАКАЗОВ И ИХ ОБРАБОТКА: <br/>
                                понедельник - пятница с 9:30 до 18:30
                            </p>
                            <p>
                                суббота с 10:00 до 18:00 <br/>
                                воскресенье выходной
                            </p>
                            <p>
                                ПРИЕМ ЗАКАЗОВ ONLINE: <br/>
                                Сделать заказ на нашем сайте <br/>
                                Вы можете круглосуточно.
                            </p>
                        </div>
                        <div className="contacts__orders-block contacts__orders-block-2">
                            <p className="contacts__orders-write">
                                НАПИШИТЕ ДИРЕКТОРУ <br/>
                                Есть замечания, вопросы, <br/>
                                предложения по нашей работе?
                            </p>

                            <button className="contacts__btn">
                                Написать директору
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;