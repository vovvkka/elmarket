import axiosApi from "../../axiosApi";
import { historyPush } from "./historyActions";
import {
    addOrderFailure,
    addOrderRequest,
    addOrderSuccess, changeStatusFailure,
    changeStatusRequest,
    changeStatusSuccess, deleteOrderFailure, deleteOrderRequest, deleteOrderSuccess,
    fetchOrdersFailure,
    fetchOrdersRequest,
    fetchOrdersSuccess,
} from "../slices/ordersSlice";

export const fetchUserOrders = () => {
    return async dispatch => {
        try {
            dispatch(fetchOrdersRequest());

            const response = await axiosApi.get('/orders/user-orders');

            dispatch(fetchOrdersSuccess(response.data));
        } catch (e) {
            dispatch(fetchOrdersFailure(e));
        }
    }
};

export const fetchOrders = query => {
    return async dispatch => {
        try {
            dispatch(fetchOrdersRequest());

            let response;

            if (query) {
                response = await axiosApi.get('/orders' + query);
            } else {
                response = await axiosApi.get('/orders');
            }

            dispatch(fetchOrdersSuccess(response.data));
        } catch (e) {
            dispatch(fetchOrdersFailure(e));
        }
    }
};

export const addOrder = orderData => {
    return async (dispatch) => {
        try {
            dispatch(addOrderRequest());
            await axiosApi.post("/orders", orderData);
            dispatch(addOrderSuccess());

            dispatch(historyPush("/"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(addOrderFailure(e.response.data));
            } else {
                dispatch(addOrderFailure({ global: "No internet" }));
            }
        }
    };
};

export const changeOrderStatus = id => {
    return async (dispatch) => {
        try {
            dispatch(changeStatusRequest());
            await axiosApi.put(`/orders/${id}/changeStatus`);
            dispatch(changeStatusSuccess(id));
        } catch (e) {
            dispatch(changeStatusFailure(e));
        }
    };
};

export const deleteOrder = id => {
    return async (dispatch) => {
        try {
            dispatch(deleteOrderRequest());
            await axiosApi.delete(`/orders/${id}`);
            dispatch(deleteOrderSuccess(id));
        } catch (e) {
            dispatch(deleteOrderFailure(e));
        }
    };
};