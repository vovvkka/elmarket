import React, {useEffect} from 'react';
import star from '../assets/svg/star.svg';
import fullStar from '../assets/svg/fullStar.svg';
import Rating from "react-rating";
import productCart from "../assets/svg/product-cart.svg";
import delivery from "../assets/svg/delivery.svg";
import ProductCard from "../components/ProductCard/ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchOne} from "../store/actions/productsActions";
import {apiUrl} from "../config";

const SingleProduct = ({match}) => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.products.product);

    useEffect(() => {
        dispatch(fetchOne(match.params.id));
    }, [dispatch, match.params.id])

    return product && (
        <div className='container'>
            <div className='single-product'>
                <div className='product'>
                    <div className='product__image'>
                        <img src={apiUrl + '/' + product.image[0]} alt="Product" className='product__main-image'/>
                        {/*<div className='product__other-images'>*/}
                        {/*    <img src={image} alt="Product"/>*/}
                        {/*    <img src={image} alt="Product"/>*/}
                        {/*</div>*/}
                    </div>
                    <div className='product__info'>
                        <span>Артикул {product.code}</span>
                        <h2 className='product__title'>{product.title}</h2>
                        <div className='product__upper-block'>
                            <span className='product__price'>{product.price} сом</span>
                            <Rating
                                className='rating'
                                initialRating={1}
                                emptySymbol={<img src={star} className="product-card__star" alt='empty-star'/>}
                                fullSymbol={<img src={fullStar} className="product-card__star" alt='full-star'/>}
                                readonly
                            />
                            <span className='product__feedback'>+27 отзывов</span>
                        </div>
                        <span>{product.inStock ? 'в наличии' : ' в наличии нет'}</span>
                        <div className='product-card__cart product-card__cart--single'>
                            <div>
                                <button className='product-card__add'>В корзину <img src={productCart} alt=""/></button>
                            </div>
                            <div className='product-card__buttons product-card__buttons--single'>
                                <button className='product-card__button'>+</button>
                                <span>2</span>
                                <button className='product-card__button'>-</button>
                            </div>
                        </div>
                        <p className='product__subtitle'>Общая информация</p>
                        <div className='product__subinfo'>
                            <p>Кратность товара: {product.amount}</p>
                            <p>Единица измерения: 3шт</p>
                            <p>Объем (м3): 0.000502</p>
                        </div>
                        <div className='product__delivery'>
                            <img src={delivery} alt="Доставка" width={40}/>
                            <span>Доставка курьером 27 марта или позже</span>
                        </div>
                        <p className='product__subtitle'>Описание</p>
                        <p>{product.description}</p>
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