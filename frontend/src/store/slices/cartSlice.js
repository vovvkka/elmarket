import { createSlice } from '@reduxjs/toolkit';

const name = 'cart';

export const initialState = {
    products: [],
    totalSum: null,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProduct(state, action) {
            const itemInCart = state.products.find(
                (item) => item._id === action.payload._id
            );

            if (itemInCart) {
                itemInCart.quantity =
                    itemInCart.quantity + action.payload.quantity;

                if (itemInCart.quantity < 1) {
                    state.products = [
                        ...state.products.filter(
                            (p) => p._id !== action.payload._id
                        ),
                    ];
                }
            } else {
                state.products.push({
                    ...action.payload,
                    quantity: action.payload.quantity,
                });
            }

            state.totalSum = Math.floor(
                state.products.reduce(
                    (acc, num) =>
                        acc +
                        (num.price * num.quantity -
                            ((num.price * num.quantity) / 100) * num.discount),
                    0
                )
            );
        },
        deleteProduct(state, action) {
            state.products = [
                ...state.products.filter((p) => p._id !== action.payload),
            ];

            state.totalSum = Math.floor(
                state.products.reduce(
                    (acc, num) =>
                        acc +
                        (num.price * num.quantity -
                            ((num.price * num.quantity) / 100) * num.discount),
                    0
                )
            );
        },
        insertQuantity(state, action) {
            const itemInCart = state.products.find(
                (item) => item._id === action.payload._id
            );

            if (itemInCart) {
                itemInCart.quantity = action.payload.quantity;
            }
        },
        clearCart(state) {
            state.products = [];
            state.totalSum = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { addProduct, deleteProduct, clearCart, insertQuantity } = cartSlice.actions;

export default cartSlice;
