import React from 'react';
import man from '../../assets/comment.png';
import star from '../../assets/svg/star.svg';
import fullStar from '../../assets/svg/fullStar.svg';
import Rating from 'react-rating';

const Buyer = () => {
    return (
        <div className="container-xs">
            <div className="buyer">
                <h2 className="buyer__title">Выбор покупателей</h2>
                <div className="buyer__flex">
                    <div className="buyer__img">
                        <img src={man} alt="Покупатель" />
                    </div>
                    <div className="buyer__comment">
                        <h5>Розетки и выключатели скрытого монтажа </h5>
                        <div className="buyer__info">
                            <Rating
                                className="rating buyer__rating"
                                initialRating={5}
                                emptySymbol={
                                    <img
                                        src={star}
                                        className="product-card__star"
                                        alt="empty-star"
                                    />
                                }
                                fullSymbol={
                                    <img
                                        src={fullStar}
                                        className="product-card__star"
                                        alt="full-star"
                                    />
                                }
                                readonly
                            />
                            <span>Антон Власов</span>
                        </div>
                        <p className="buyer__text">
                            Заказ был выполнен моментально. Продавец очень
                            доброжелательный! Описание товара соответствует
                            товару! Рекомендую!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buyer;
