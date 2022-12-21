import React from 'react';
import image from '../assets/single-product-example.png';
import star from '../assets/svg/star.svg';
import fullStar from '../assets/svg/fullStar.svg';
import Rating from "react-rating";
import productCard from "../assets/svg/product-cart.svg";
import delivery from "../assets/svg/delivery.svg";
import ProductCard from "../components/ProductCard/ProductCard";

const SingleProduct = () => {
    return (
        <div className='container'>
            <div className='single-product'>
                <div className='product'>
                    <div className='product__image'>
                        <img src={image} alt="Product" className='product__main-image'/>
                        <div className='product__other-images'>
                            <img src={image} alt="Product"/>
                            <img src={image} alt="Product"/>
                        </div>
                    </div>
                    <div className='product__info'>
                        <span>Артикул 34456</span>
                        <h2 className='product__title'>Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP</h2>
                        <div className='product__upper-block'>
                            <span className='product__price'>293,06 ₽</span>
                            <Rating
                                className='rating'
                                initialRating={1}
                                emptySymbol={<img src={star} className="product-card__star" alt='empty-star'/>}
                                fullSymbol={<img src={fullStar} className="product-card__star" alt='full-star'/>}
                                readonly
                            />
                            <span className='product__feedback'>+27 отзывов</span>
                        </div>
                        <span>в наличии нет</span>
                        <div className='product-card__cart product-card__cart--single'>
                            <div>
                                <button className='product-card__add'>В корзину <img src={productCard} alt=""/></button>
                            </div>
                            <div className='product-card__buttons product-card__buttons--single'>
                                <button className='product-card__button'>+</button>
                                <span>2</span>
                                <button className='product-card__button'>-</button>
                            </div>
                        </div>
                        <p className='product__subtitle'>Общая информация</p>
                        <div className='product__subinfo'>
                            <p>Кратность товара: 1</p>
                            <p>Единица измерения: 3шт</p>
                            <p>Объем (м3): 0.000502</p>
                        </div>
                        <div className='product__delivery'>
                            <img src={delivery} alt="Доставка" width={40}/>
                            <span>Доставка курьером 27 марта или позже</span>
                        </div>
                        <p className='product__subtitle'>Описание</p>
                        <p>Ищете Телефонные розетки недорого? Обратите внимание на товар «Legrand Etika Белый Розетка комп (RJ45) одинарная 5 категория UTP
                            Розетки оснащены винтовыми и безвинтовыми зажимами для безопасного и быстрого монтажа. Доступны механизмы, оборудованные защитными шторками.
                            Для выключателей с дизайном Allure предусмотрена контурная подсветка клавиши.</p>
                    </div>
                </div>
                <h3 className='product__recent'>Вы недавно посмотрели</h3>
                <div className='catalog'>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                    <ProductCard/>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;