import { createSlice } from '@reduxjs/toolkit';

const name = 'products';

export const initialState = {
    products: [],
    product: null,
    totalPages: null,
    totalItems: null,
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
            state.products = payload.products;
            state.totalPages = payload.totalPages;
            state.totalItems = payload.totalItems;
            state.loading = false;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSalesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSalesSuccess(state, {payload}) {
            state.products = payload.products;
            state.totalPages = payload.totalPages;
            state.loading = false;
        },
        fetchSalesFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
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
        clearProductError(state) {
            state.createError = null;
        },
        clearProducts(state) {
            state.product = null;
            state.products = [];
        }
    },
});

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchSalesRequest,
    fetchSalesSuccess,
    fetchSalesFailure,
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
    clearProductError,
    clearProducts
} = productsSlice.actions;

export default productsSlice;
