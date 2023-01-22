import { createSlice } from '@reduxjs/toolkit';

const name = 'products';

export const initialState = {
    products: [],
    product: null,
    pages: null,
    createLoading: false,
    loading: false,
    createError: null,
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
        fetchProductsSuccess(state, { payload }) {
            console.log(payload)
            state.products = payload.products;
            state.totalPages = payload.totalPages;

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
        fetchOneSuccess(state, { payload: product }) {
            state.product = product;
            state.loading = false;
        },
        fetchOneFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createProductRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        createProductSuccess(state) {
            state.createLoading = false;
        },
        createProductFailure(state, action) {
            state.createLoading = false;
            state.createError = action.payload;
        },
        editProductRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        editProductSuccess(state) {
            state.createLoading = false;
        },
        editProductFailure(state, action) {
            state.createLoading = false;
            state.createError = action.payload;
        },
        deleteProductRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteProductSuccess(state, action) {
            state.products = [
                ...state.products.filter((p) => p._id !== action.payload),
            ];
            state.loading = false;
        },
        deleteProductFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchOneRequest,
    fetchOneSuccess,
    fetchOneFailure,
    createProductRequest,
    createProductSuccess,
    createProductFailure,
    editProductRequest,
    editProductSuccess,
    editProductFailure,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFailure,
} = productsSlice.actions;

export default productsSlice;
