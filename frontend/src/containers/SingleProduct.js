import React, { useEffect } from 'react';
import star from '../assets/svg/star.svg';
import fullStar from '../assets/svg/fullStar.svg';
import Rating from 'react-rating';
import productCart from '../assets/svg/product-cart.svg';
import delivery from '../assets/svg/delivery.svg';
import ProductCard from '../components/ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOne } from '../store/actions/productsActions';
import { apiUrl } from '../config';
import { fetchHistory, sendHistory } from '../store/actions/watchListActions';
import { Link } from 'react-router-dom';

const SingleProduct = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product);
    const user = useSelector((state) => state.users.user);
    const history = useSelector((state) => state.watchList.history);

    useEffect(() => {
        dispatch(fetchOne(match.params.id));

        if (user) {
            dispatch(fetchHistory());
            dispatch(sendHistory(match.params.id));
        }
    }, [dispatch, match.params.id, user]);

    return (
        product && (
            <div className="container">
                <div className="single-product">
                    <div className="product">
                        <div className="product__image">
                            <img
                                src={apiUrl + '/' + product.image[0]}
                                alt="Product"
                                className="product__main-image"
                            />
                        </div>
                        <div className="product__info">
                            <span>Артикул {product.code}</span>
                            <h2 className="product__title">{product.title}</h2>
                            <div className="product__upper-block">
                                <span className="product__price">
                                    {product.price} сом
                                </span>
                                {product.rating ? (
                                    <>
                                        <Rating
                                            className="rating"
                                            initialRating={product.rating}
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
                                        <Link
                                            to={`/reviews/${product._id}`}
                                            className="product__feedback"
                                        >
                                            +{product.ratingCount} отзывов
                                        </Link>
                                    </>
                                ) : (
                                    <div className="product__no-feedback">
                                        <p>Пока нет отзывов.</p>
                                        {user && (
                                            <Link
                                                to={`/feedback/${product._id}`}
                                            >
                                                Добавить отзыв
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                            <span>
                                {product.inStock
                                    ? 'в наличии'
                                    : ' в наличии нет'}
                            </span>
                            <div className="product-card__cart product-card__cart--single">
                                <div>
                                    <button className="product-card__add">
                                        В корзину{' '}
                                        <img src={productCart} alt="" />
                                    </button>
                                </div>
                                <div className="product-card__buttons product-card__buttons--single">
                                    <button className="product-card__button">
                                        +
                                    </button>
                                    <span>2</span>
                                    <button className="product-card__button">
                                        -
                                    </button>
                                </div>
                            </div>
                            <p className="product__subtitle">
                                Общая информация
                            </p>
                            <div className="product__subinfo">
                                <p>Кратность товара: {product.amount}</p>
                                <p>Единица измерения: 3шт</p>
                                <p>Объем (м3): 0.000502</p>
                            </div>
                            <div className="product__delivery">
                                <img src={delivery} alt="Доставка" width={40} />
                                <span>
                                    Доставка курьером 27 марта или позже
                                </span>
                            </div>
                            <p className="product__subtitle">Описание</p>
                            <p>{product.description}</p>
                        </div>
                    </div>
                    {user && (
                        <>
                            <h3 className="product__recent">
                                Вы недавно посмотрели
                            </h3>
                            <div className="catalog">
                                {history.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default SingleProduct;
