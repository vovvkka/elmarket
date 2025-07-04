import React from 'react';
import {
    addProduct,
    deleteProduct,
    insertQuantity,
} from '../../store/slices/cartSlice';
import { apiUrl } from '../../config';
import { useDispatch, useSelector } from 'react-redux';
import noPhoto from '../../assets/no-photo.png';
import { addNotification } from '../../store/actions/notifierActions';
import { useMediaQuery } from 'react-responsive';

const CartProduct = ({ p }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.users.user);
    let imageUrl;
    p.image[0] ? (imageUrl = `${apiUrl}/${p.image[0]}`) : (imageUrl = noPhoto);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    const getTotalPrice = (p) => {
        const quantity = p.quantity;
        const price = p.price;
        const discountThreshold = p.amountForDiscount;
        const discountRate = p.discount / 100;

        let total = quantity * price;

        if (quantity >= discountThreshold) {
            const numDiscountedItems = Math.floor(quantity / discountThreshold);
            const discountedPrice = price - price * discountRate;
            const discountedTotal =
                numDiscountedItems * discountThreshold * discountedPrice;
            const remainingItems = quantity % discountThreshold;
            total = discountedTotal + remainingItems * price;
        }

        return Math.floor(total);
    };

    const handleInsert = (e) => {
        const { value } = e.target;
        const number = Number(value);
        if (number || number === 0) {
            if (e.target.value > p.amount) {
                dispatch(insertQuantity({ ...p, quantity: p.amount }));
                dispatch(
                    addNotification(
                        `Вы можете добавить не более ${p.amount} единиц товара`,
                        'warn'
                    )
                );
            } else {
                if (number === 0) {
                    dispatch(insertQuantity({ ...p, quantity: '' }));
                } else {
                    dispatch(insertQuantity({ ...p, quantity: number }));
                }
            }
        }
    };

    return (
        p && (
            <div className="cart__product">
                <img
                    className="cart__product-image"
                    src={imageUrl}
                    alt={p.title}
                />
                <h5 className="cart__product-title">{p.title}</h5>
                <div className="cart__product-amount">
                    <div>
                        <div className="product-card__buttons">
                            {!isMobile && (
                                <button
                                    className="product-card__button"
                                    disabled={p.amount <= p.quantity}
                                    onClick={() =>
                                        dispatch(
                                            addProduct({ ...p, quantity: 1 })
                                        )
                                    }
                                >
                                    +
                                </button>
                            )}

                            <input
                                size=""
                                className="product-card__insert"
                                type="text"
                                value={p.quantity}
                                onChange={(e) => handleInsert(e)}
                            />
                            {!isMobile && (
                                <button
                                    className="product-card__button"
                                    onClick={() =>
                                        dispatch(
                                            addProduct({ ...p, quantity: -1 })
                                        )
                                    }
                                >
                                    -
                                </button>
                            )}
                        </div>
                        <p>({p.unit ? p.unit : 'шт.'})</p>
                    </div>
                </div>
                <p className="cart__product-discount">
                    {user && p.quantity >= p.amountForDiscount ? p.discount : 0}
                    % / {p.amountForDiscount} ед.
                </p>
                <p className="cart__product-price">{p.price} сом</p>
                <p className="cart__product-total">
                    {user ? getTotalPrice(p) : p.price * p.quantity} сом
                </p>
                <div
                    className="cart__product-delete"
                    onClick={() => dispatch(deleteProduct(p._id))}
                >
                    <svg
                        width="27"
                        height="30"
                        viewBox="0 0 27 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_281_2244)">
                            <path
                                d="M4.9984 30C4.96672 29.9029 4.87166 29.9272 4.80433 29.907C3.34284 29.4862 2.46753 28.3172 2.46753 26.7597C2.46753 21.2824 2.46356 15.805 2.47149 10.3317C2.47149 10.0728 2.42 9.98382 2.15067 9.99595C1.69123 10.0202 1.23179 10.004 0.772351 10.004C0.24558 10 0.00397822 9.76942 0.0118996 9.24353C0.0237816 8.32524 -0.0475107 7.40696 0.0475458 6.49272C0.202013 4.98382 1.48131 3.77832 2.97449 3.75809C4.74492 3.73382 6.51931 3.74191 8.28973 3.75809C8.56302 3.76214 8.61847 3.67314 8.61055 3.41828C8.59075 2.92071 8.59867 2.42314 8.60659 1.92557C8.61847 0.788835 9.39873 0.00404531 10.5156 0C12.5079 0 14.5001 0 16.4923 0.00404531C17.6132 0.00404531 18.3895 0.788835 18.4053 1.92557C18.4132 2.44337 18.4212 2.96117 18.4014 3.47896C18.3934 3.72168 18.4766 3.76214 18.6905 3.75809C20.3857 3.75 22.0808 3.75405 23.776 3.75405C25.6851 3.75405 26.9961 5.09304 27 7.04693C27 7.7589 27 8.47087 27 9.18285C27 9.7856 26.7822 10.004 26.1802 10.004C25.7207 10.004 25.2613 10.0162 24.8018 10C24.58 9.99191 24.5365 10.0566 24.5404 10.271C24.5484 13.8228 24.5444 17.3786 24.5444 20.9304C24.5444 22.9005 24.5523 24.8746 24.5404 26.8447C24.5325 28.3374 23.5819 29.5591 22.1799 29.915C22.0848 29.9393 21.966 29.8786 21.8987 29.996C16.2626 30 10.6305 30 4.9984 30ZM13.502 10.0162C10.3334 10.0162 7.16094 10.0202 3.99239 10.0081C3.73494 10.0081 3.68346 10.0769 3.68346 10.3277C3.69138 15.7767 3.69138 21.2257 3.69138 26.6748C3.69138 27.9895 4.44787 28.7581 5.75093 28.7581C10.9236 28.7581 16.0923 28.7581 21.2649 28.7581C22.564 28.7581 23.3205 27.9895 23.3205 26.6748C23.3205 21.2257 23.3205 15.7807 23.3285 10.3317C23.3285 10.0728 23.2691 10.0121 23.0156 10.0121C19.8431 10.0202 16.6745 10.0162 13.502 10.0162ZM13.506 8.73382C13.506 8.73786 13.506 8.74191 13.506 8.74595C17.3359 8.74595 21.1699 8.74595 24.9999 8.74191C25.2454 8.74191 25.5663 8.85113 25.7168 8.69741C25.8633 8.54369 25.7524 8.21602 25.7603 7.96521C25.7682 7.66181 25.7445 7.35841 25.7643 7.05906C25.8395 5.88592 24.9642 4.97977 23.7483 4.99191C20.6748 5.02023 17.5973 5.01618 14.5239 5.02023C12.7613 5.02427 10.9988 5.02427 9.23634 5.02023C7.17678 5.01618 5.11722 4.99191 3.05767 5.01214C2.01205 5.02023 1.26744 5.82929 1.24763 6.88916C1.23971 7.43528 1.25159 7.98139 1.23971 8.52751C1.23575 8.7055 1.27932 8.75809 1.46151 8.75404C2.08334 8.73786 2.70517 8.73786 3.33095 8.73786C6.72526 8.73382 10.1156 8.73382 13.506 8.73382ZM13.502 3.75C14.6506 3.75 15.7992 3.74595 16.9478 3.75405C17.1181 3.75405 17.2013 3.73382 17.1934 3.52751C17.1775 3.00162 17.1894 2.47573 17.1854 1.94579C17.1815 1.50485 16.9438 1.25 16.5121 1.25C14.512 1.24595 12.5118 1.24595 10.5117 1.25C10.0641 1.25 9.83044 1.50485 9.83044 1.96602C9.82648 2.48382 9.83836 3.00162 9.82648 3.51537C9.82252 3.7055 9.87005 3.75809 10.0602 3.75405C11.2048 3.74595 12.3534 3.75 13.502 3.75Z"
                                fill="#423F40"
                            />
                            <path
                                d="M7.367 19.3649C7.367 17.7468 7.367 16.1246 7.367 14.5065C7.367 14.0858 7.55711 13.8188 7.87397 13.7702C8.21855 13.7177 8.50372 13.9118 8.57897 14.2557C8.60273 14.369 8.60273 14.4863 8.60273 14.6036C8.60273 17.7832 8.60273 20.9668 8.60273 24.1465C8.60273 24.6966 8.38886 24.996 7.99279 25.0041C7.5888 25.0122 7.36304 24.7007 7.36304 24.1384C7.367 22.5445 7.367 20.9547 7.367 19.3649Z"
                                fill="#423F40"
                            />
                            <path
                                d="M12.888 19.3648C12.888 17.7467 12.888 16.1245 12.888 14.5064C12.888 14.0857 13.0741 13.8187 13.395 13.7661C13.7356 13.7095 14.0287 13.9036 14.1 14.2475C14.1237 14.3608 14.1237 14.4781 14.1237 14.5954C14.1237 17.775 14.1237 20.9586 14.1237 24.1383C14.1237 24.6884 13.9138 24.9878 13.5177 24.9999C13.1137 25.012 12.888 24.6965 12.888 24.1342C12.884 22.5485 12.888 20.9586 12.888 19.3648Z"
                                fill="#423F40"
                            />
                            <path
                                d="M19.641 19.3728C19.641 20.9909 19.641 22.6131 19.641 24.2312C19.641 24.749 19.3321 25.0686 18.9202 24.9836C18.635 24.927 18.4686 24.7409 18.4211 24.4537C18.4053 24.3566 18.4053 24.2595 18.4053 24.1624C18.4053 20.9707 18.4053 17.7789 18.4053 14.5912C18.4053 14.4658 18.4092 14.3364 18.4409 14.215C18.5083 13.9278 18.7419 13.7538 19.0271 13.7579C19.3123 13.7579 19.542 13.9359 19.6093 14.2231C19.637 14.3445 19.641 14.4739 19.641 14.5993C19.641 16.1891 19.641 17.783 19.641 19.3728Z"
                                fill="#423F40"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        )
    );
};

export default CartProduct;
