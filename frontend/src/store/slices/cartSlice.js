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

                if (itemInCart.amount < 1) {
                    state.products = [...state.products.filter(p => p._id !== action.payload._id)];
                }
            } else {
                state.products.push({...action.payload, amount: action.payload.amount});
            }
        },
        deleteProduct(state, action) {
            state.products = [...state.products.filter(p => p._id !== action.payload)];
        }
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
    deleteProduct
} = cartSlice.actions;

export default cartSlice;