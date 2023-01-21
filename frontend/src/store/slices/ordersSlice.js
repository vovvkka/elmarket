import {createSlice} from "@reduxjs/toolkit";

const name = 'orders';

export const initialState = {
    orders: [],
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
        fetchOrdersSuccess(state, {payload: orders}) {
            state.loading = false;
            state.orders = orders;
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
    }
});

export const {
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    addOrderRequest,
    addOrderSuccess,
    addOrderFailure
} = ordersSlice.actions;

export default ordersSlice;
