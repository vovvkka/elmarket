import {createSlice} from "@reduxjs/toolkit";

const name = 'cart';

export const initialState = {
    products: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name,
    initialState,
    reducers: {
        addProduct(state, action) {
            const itemInCart = state.products.find((item) => item._id === action.payload._id);

            if (itemInCart) {
                itemInCart.amount = itemInCart.amount + action.payload.amount;
            } else {
                state.products.push({...action.payload, amount: action.payload.amount});
            }
        },
        // reduceProduct(state, action) {
        //     const itemInCart = state.products.find((item) => item._id === action.payload._id);
        //
        //     if (itemInCart) {
        //         if (itemInCart.amount === 1){
        //             state.products = state.products.filter(product => product._id !== action.payload._id);
        //         } else {
        //             itemInCart.amount--;
        //         }
        //     }
        // },
    }
});

export const {
    addProduct,
    reduceProduct
} = cartSlice.actions;

export default cartSlice;