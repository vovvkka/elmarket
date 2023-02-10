import axiosApi from "../../axiosApi";
import {
    fetchHistoryFailure,
    fetchHistoryRequest, fetchHistorySuccess,
    sendHistoryFailure,
    sendHistoryRequest,
    sendHistorySuccess
} from "../slices/watchListSlice";

export const fetchHistory = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchHistoryRequest());
            const response = await axiosApi.get("/users/watchlist");
            dispatch(fetchHistorySuccess(response.data));
        } catch (e) {
            dispatch(fetchHistoryFailure(e));
        }
    };
};

export const sendHistory = (product) => {
    return async (dispatch) => {
        try {
            dispatch(sendHistoryRequest());
            await axiosApi.post("/users/history", {product});
            dispatch(sendHistorySuccess());
        } catch (e) {
            dispatch(sendHistoryFailure(e));
        }
    };
};