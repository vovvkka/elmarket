import {createSlice} from "@reduxjs/toolkit";

const name = 'orders';

export const initialState = {
    orders: [],
    displayOrder: null,
    totalPages: null,
    loading: false,
    createError: null,
    error: null,
};

const ordersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess(state, action) {
            state.loading = false;
            state.orders = action.payload;
            state.totalPages = action.payload.totalPages;
        },
        fetchOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchDisplayRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDisplaySuccess(state, action) {
            state.loading = false;
            state.displayOrder = action.payload;
        },
        fetchDisplayFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addOrderRequest(state) {
            state.loading = true;
            state.createError = null;
        },
        addOrderSuccess(state, {payload}) {
            state.loading = false;
            state.displayOrder = payload;
        },
        addOrderFailure(state, action) {
            state.loading = false;
            state.createError = action.payload;
        },
        changeStatusRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changeStatusSuccess(state, action) {
            state.loading = false;
            state.orders = [...state.orders.filter(order => order._id !== action.payload)];
        },
        changeStatusFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteOrderRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteOrderSuccess(state, action) {
            state.loading = false;
            state.orders = [...state.orders.filter(order => order._id !== action.payload)];
        },
        deleteOrderFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    addOrderRequest,
    addOrderSuccess,
    addOrderFailure,
    changeStatusRequest,
    changeStatusSuccess,
    changeStatusFailure,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFailure,
    fetchDisplayRequest,
    fetchDisplaySuccess,
    fetchDisplayFailure,
} = ordersSlice.actions;

export default ordersSlice;
