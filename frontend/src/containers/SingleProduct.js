import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { apiUrl } from '../config';
import Rating from 'react-rating';
import star from '../assets/svg/star.svg';
import noPhoto from '../assets/no-photo.png';
import fullStar from '../assets/svg/fullStar.svg';
import productCart from '../assets/svg/product-cart.svg';
import delivery from '../assets/svg/delivery.svg';
import ProductCard from '../components/ProductCard/ProductCard';
import { fetchOne } from '../store/actions/productsActions';
import { fetchHistory, sendHistory } from '../store/actions/watchListActions';
import { clearProducts } from '../store/slices/productsSlice';
import '@splidejs/react-splide/css';
import Spinner from '../components/UI/Spinner/Spinner';
import { addProduct } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { addNotification } from '../store/actions/notifierActions';

const SingleProduct = ({ match }) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products.product);
    const loading = useSelector((state) => state.products.loading);
    const user = useSelector((state) => state.users.user);
    const profile = useSelector((state) => state.users.profile);
    const history = useSelector((state) => state.watchList.history);
    const mainRef = useRef(null);
    const thumbsRef = useRef(null);
    const [quantity, setQuantity] = useState(1);
    const { products } = useSelector((state) => state.cart);
    const productInCart = products?.find((p) => p._id === product?._id);

    useEffect(() => {
        if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
            mainRef.current.sync(thumbsRef.current.splide);
        }
    });

    useEffect(() => {
        dispatch(fetchOne(match.params.id));

        if (user) {
            dispatch(fetchHistory());
            dispatch(sendHistory(match.params.id));
        }

        return () => {
            dispatch(clearProducts());
        };
    }, [dispatch, match.params.id, user]);

    const handleAdd = () => {
        if (!user || user.role !== 'admin') {
            dispatch(
                addProduct({
                    ...product,
                    quantity,
                })
            );

            toast.success('Товар успешно добавлен в корзину!', {
                position: 'bottom-right',
                theme: 'dark',
            });
        }
    };

    const addQuantity = () => {
        if (!user || user.role !== 'admin') {
            if (quantity < product.amount) {
                setQuantity((prev) => prev + 1);
            }
        }
    };

    const handleInsert = (e) => {
        const { value } = e.target;
        const number = Number(value);
        if (number || number === 0) {
            // if (productInCart?.quantity) {
                if (e.target.value > (product.amount - productInCart?.quantity)) {
                    dispatch(
                        addNotification(
                            `Вы можете добавить не более ${
                                product.amount - productInCart?.quantity
                            } единиц товара`,
                            'warn'
                        )
                    );
                    setQuantity(product.amount - productInCart?.quantity);
                } else {
                    if (number === 0) {
                        setQuantity('');
                    } else {
                        setQuantity(number);
                    }
                }
            // } else {
            //     console.log('here');
            //     dispatch(
            //         addNotification(
            //             `Вы можете добавить не более ${product.amount} единиц товара`,
            //             'warn'
            //         )
            //     );
            //     setQuantity(product.amount);
            // }
        }
    };

    const mainOptions = {
        type: 'slide',
        width: 600,
        heightRatio: 1,
        pagination: false,
        arrows: false,
        cover: true,
        breakpoints: {
            780: {
                fixedHeight: 355,
            },
        },
    };
    const thumbsOptions = {
        rewind: false,
        fixedWidth: 104,
        fixedHeight: 110,
        padding: '75px',
        isNavigation: true,
        gap: 1,
        focus: 'none',
        pagination: false,
        cover: true,
        dragMinThreshold: {
            mouse: 4,
            touch: 10,
        },
        breakpoints: {
            780: {
                fixedWidth: 80,
                fixedHeight: 80,
                padding: '60px',
            },
        },
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        product && (
            <div className="container">
                <div className="single-product">
                    <div className="product">
                        <div className="product__image">
                            {product.image.length > 1 ? (
                                <>
                                    <Splide options={mainOptions} ref={mainRef}>
                                        {product.image.map((slide, index) => (
                                            <SplideSlide key={index}>
                                                <img
                                                    src={apiUrl + '/' + slide}
                                                    alt={product.title}
                                                    width={500}
                                                />
                                            </SplideSlide>
                                        ))}
                                    </Splide>

                                    <Splide
                                        options={thumbsOptions}
                                        ref={thumbsRef}
                                    >
                                        {product.image.map((slide) => (
                                            <SplideSlide key={slide}>
                                                <img
                                                    src={apiUrl + '/' + slide}
                                                    alt={product.title}
                                                />
                                            </SplideSlide>
                                        ))}
                                    </Splide>
                                </>
                            ) : (
                                <>
                                    {product.image.length ? (
                                        product.image.map((slide) => (
                                            <img
                                                key={slide}
                                                className="product__single-image"
                                                src={
                                                    slide
                                                        ? apiUrl + '/' + slide
                                                        : noPhoto
                                                }
                                                alt={product.title}
                                            />
                                        ))
                                    ) : (
                                        <img
                                            className="product__single-image"
                                            src={noPhoto}
                                            alt={product.title}
                                        />
                                    )}
                                </>
                            )}
                        </div>
                        <div className="product__info">
                            <span>Артикул {product.code}</span>
                            <h2 className="product__title">{product.title}</h2>
                            <div className="product__upper-block">
                                <span className="product__price">
                                    {user ? (
                                        <>
                                            {Math.floor(
                                                product.price -
                                                    (product.price / 100) *
                                                        product.discount
                                            )}{' '}
                                            сом за{' '}
                                            {product.unit
                                                ? product.unit
                                                : 'шт.'}
                                        </>
                                    ) : (
                                        <>
                                            {product.price} сом за{' '}
                                            {product.unit
                                                ? product.unit
                                                : 'шт.'}
                                        </>
                                    )}
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
                                        {user && profile?.isActivated && (
                                            <Link
                                                to={`/feedback/${product._id}`}
                                            >
                                                Добавить отзыв
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </div>
                            <span className="product-card__in-stock">
                                {product.amount > 0
                                    ? 'в наличии'
                                    : ' в наличии нет'}
                            </span>
                            <div className="product-card__cart product-card__cart--single">
                                <div style={{ display: 'flex' }}>
                                    <div
                                        className={`product-card__buttons ${
                                            product.amount <= 0 ||
                                            productInCart?.quantity >=
                                                productInCart?.amount
                                                ? 'product-card__buttons--disabled'
                                                : ''
                                        }`}
                                        style={{ width: '200px' }}
                                    >
                                        <button
                                            className="product-card__button"
                                            onClick={addQuantity}
                                        >
                                            +
                                        </button>
                                        <input
                                            size=""
                                            className="product-card__insert"
                                            type="text"
                                            value={quantity}
                                            onChange={(e) => handleInsert(e)}
                                        />
                                        <button
                                            className="product-card__button"
                                            onClick={() => {
                                                if (quantity > 1)
                                                    setQuantity(
                                                        (prev) => prev - 1
                                                    );
                                            }}
                                        >
                                            -
                                        </button>
                                    </div>
                                    <button
                                        className="product-card__add"
                                        onClick={handleAdd}
                                        disabled={
                                            product.amount <= 0 ||
                                            productInCart?.quantity >=
                                                productInCart?.amount
                                        }
                                    >
                                        В корзину
                                        <img src={productCart} alt="" />
                                    </button>
                                </div>
                            </div>
                            <p className="product__subtitle">
                                Общая информация
                            </p>
                            <div className="product__subinfo">
                                <p>Кратность товара: {product.amount}</p>
                                <p>
                                    Единица измерения:{' '}
                                    {product.unit ? product.unit : 'шт.'}
                                </p>
                            </div>
                            <div className="product__delivery">
                                <img src={delivery} alt="Доставка" width={40} />
                                <span>Доставка курьером</span>
                            </div>
                            <p className="product__subtitle">Описание</p>
                            <p className="product__description">
                                {product.description}
                            </p>
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
