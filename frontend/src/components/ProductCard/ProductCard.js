import React from 'react';
import Rating from 'react-rating';
import star from '../../assets/svg/star.svg';
import fullStar from '../../assets/svg/fullStar.svg';
import example from '../../assets/card-example.png';
import productCard from '../../assets/svg/product-cart.svg';
import {Link} from "react-router-dom";

const ProductCard = () => {
    return (
        <div className='product-card'>
            <Link to='/catalog/product-id' className="clickable">
                <div className='product-card__hits'></div>
                <Rating
                    initialRating={4}
                    emptySymbol={<img src={star} className="product-card__star" alt='empty-star'/>}
                    fullSymbol={<img src={fullStar} className="product-card__star" alt='full-star'/>}
                    readonly
                />
                <div className='product-card__image'>
                    <img src={example} width='90%' alt='product-img'/>
                </div>
                <h5 className='product-card__title'>Legrand Valena Крем Розетка 1-ая с/з</h5>
                <p className='product-card__price'>93,06 ₽</p>
                <span className='product-card__in-stock'>в наличии</span>
                <div className='product-card__cart-block'>
            </div>
                <div className='product-card__cart'>
                    <div className='product-card__buttons'>
                        <button className='product-card__button'>+</button>
                        <span>2</span>
                        <button className='product-card__button'>-</button>
                    </div>
                    <div>
                        <button className='product-card__add'>В корзину <img src={productCard} alt=""/></button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;