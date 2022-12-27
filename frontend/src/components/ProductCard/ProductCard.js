import React, {useState} from 'react';
import Rating from 'react-rating';
import star from '../../assets/svg/star.svg';
import fullStar from '../../assets/svg/fullStar.svg';
import productCard from '../../assets/svg/product-cart.svg';
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";
import {useDispatch} from "react-redux";
import {addProduct} from "../../store/slices/cartSlice";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(1);

    return product && (
        <div className='product-card'>
                <div className='product-card__column'>
                    <Link to={`catalog/${product._id}`} className="clickable">
                    <div className='product-card__top'>
                        <div className='product-card__hits'></div>
                        <Rating
                            initialRating={4}
                            emptySymbol={<img src={star} className="product-card__star" alt='empty-star'/>}
                            fullSymbol={<img src={fullStar} className="product-card__star" alt='full-star'/>}
                            readonly
                        />
                        <div className='product-card__image'>
                            <img src={apiUrl + '/' + product.image[0]} width='90%' alt='product-img'/>
                        </div>
                    </div>
                    </Link>
                    <div className='product-card__bottom'>
                        <Link to={`catalog/${product._id}`} className="clickable">
                        <h5 className='product-card__title'>{product.title} </h5>
                        <p className='product-card__price'>{product.price} сом</p>
                        <span className='product-card__in-stock'>{product.inStock? 'в наличии' : 'нет в наличии'}</span>
                        <div className='product-card__cart-block'>
                        </div>
                        </Link>
                        <div className='product-card__cart'>
                            <div className='product-card__buttons'>
                                <button className='product-card__button' onClick={() => setAmount(prev => prev + 1)}>+</button>
                                <span>{amount}</span>
                                <button className='product-card__button' onClick={() => {if (amount > 0) setAmount(prev => prev - 1)}}>-</button>
                            </div>
                            <div>
                                <button className='product-card__add' onClick={() => dispatch(addProduct({...product, amount}))}>В корзину <img src={productCard} alt=""/></button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ProductCard;