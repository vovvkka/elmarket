import axiosApi from "../../axiosApi";
import { historyPush } from "./historyActions";
import {
    addOrderFailure,
    addOrderRequest,
    addOrderSuccess, fetchOrdersFailure, fetchOrdersRequest, fetchOrdersSuccess,
} from "../slices/ordersSlice";

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
}
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