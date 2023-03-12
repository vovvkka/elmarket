import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Modal from '../components/UI/Modal/Modal';
import CartProduct from '../components/CartProduct/CartProduct';
import {Link} from 'react-router-dom';

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const user = useSelector(state => state.users.user);
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState(false);

    const cartProduct = products?.map((p) => <CartProduct key={p._id} p={p}/>);

    const getTotalPrice = () => {
        if (user) {
            return products.reduce((acc, p) => {
                const quantity = p.quantity;
                const price = p.price;
                const discountThreshold = p.amountForDiscount;
                const discountRate = p.discount / 100;

                let total = quantity * price;

                if (quantity >= discountThreshold) {
                    const numDiscountedItems = Math.floor(quantity / discountThreshold);
                    const discountedPrice = price - (price * discountRate);
                    const discountedTotal = numDiscountedItems * discountThreshold * discountedPrice;
                    const remainingItems = quantity % discountThreshold;
                    total = discountedTotal + (remainingItems * price);
                }

                acc = total;

                return acc;
            }, 0)
        } else {
            return products.reduce((acc, p) => acc + p.quantity * p.price, 0);
        }
    };


    return (
        <>
            <Modal
                show={show}
                order={order}
                closed={() => {
                    setShow(false);
                    setOrder(false);
                }}
            />

            <div className="cart">
                <div className="container-sm">
                    <h2 className="cart__title">Корзина</h2>
                    {products?.length ? (
                        <>
                            <div className="cart__block">
                                <div className="cart__product">
                                    <div className="cart__product-image"/>
                                    <p className="cart__product-title"/>
                                    <p className="cart__product-amount">
                                        <b>Количество</b>
                                    </p>
                                    <p className="cart__product-discount">
                                        <b>Скидка</b>
                                    </p>
                                    <p className="cart__product-price">
                                        <b>Цена</b>
                                    </p>
                                    <p className="cart__product-total">
                                        <b>Общая стоимость</b>
                                    </p>
                                    <div className="cart__product-delete"></div>
                                </div>
                                {cartProduct}
                            </div>
                            <div className="cart__order">
                                <p className="cart__total">
                                    Общая сумма:{' '}
                                    {getTotalPrice()} сом
                                </p>
                                <button
                                    className="cart__btn"
                                    onClick={() => {
                                        setShow(true);
                                        setOrder(true);
                                    }}
                                >
                                    Оформить заказ
                                </button>
                            </div>
                        </>
                    ) : (
                        <p style={{textAlign: 'center'}}>
                            Ваша корзина пуста!
                        </p>
                    )}

                    {!products?.length && (
                        <div className="cart__go">
                            <Link to="/catalog?page=1" className="button">
                                В каталог
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
