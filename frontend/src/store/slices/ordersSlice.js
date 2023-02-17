import {createSlice} from "@reduxjs/toolkit";

const name = 'orders';

export const initialState = {
    orders: [],
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
            state.totalPages = action.payload;
        },
        fetchOrdersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addOrderRequest(state) {
            state.loading = true;
            state.createError = null;
        },
        addOrderSuccess(state) {
            state.loading = false;
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
    }
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
    deleteOrderFailure
} = ordersSlice.actions;

export default ordersSlice;
