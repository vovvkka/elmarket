import {createSlice} from "@reduxjs/toolkit";

const name = 'products';

export const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchProductsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, {payload: products}) {
            state.products = products;
            state.loading = false;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchOneRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOneSuccess(state, {payload: product}) {
            state.product = product;
            state.loading = false;
        },
        fetchOneFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchOneRequest,
    fetchOneSuccess,
    fetchOneFailure
} = productsSlice.actions;

export default productsSlice;
