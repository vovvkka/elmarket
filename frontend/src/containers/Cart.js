import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../components/UI/Modal/Modal';
import CartProduct from '../components/CartProduct/CartProduct';

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const totalSum = useSelector((state) => state.cart.totalSum);
    const [show, setShow] = useState(false);
    const [order, setOrder] = useState(false);

    const cartProduct = products?.map((p) => <CartProduct key={p._id} p={p} />);

    const getTotalPrice = Math.floor(
        products.reduce(
            (acc, num) =>
                acc +
                (num.price * num.quantity -
                    ((num.price * num.quantity) / 100) * num.discount),
            0
        )
    );

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
                                    <div className="cart__product-image" />
                                    <p className="cart__product-title" />
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
                                    {totalSum ? totalSum : getTotalPrice} сом
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
                        <p style={{ textAlign: 'center' }}>
                            Ваша корзина пуста!
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;
