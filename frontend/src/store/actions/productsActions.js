import axiosApi from "../../axiosApi";
import {
    fetchOneFailure,
    fetchOneRequest, fetchOneSuccess,
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess
} from "../slices/productsSlice";

export const fetchProducts = (query) => {
    return async dispatch => {
        try {
            dispatch(fetchProductsRequest());

            const response = await axiosApi(`/products/${query ? query : ''}`);

            dispatch(fetchProductsSuccess(response.data));
        } catch (e) {
            dispatch(fetchProductsFailure(e));
        }
    };
};

export const fetchOne = (id) => {
    return async dispatch => {
        try {
            dispatch(fetchOneRequest());

            const response = await axiosApi('/products/' + id);

            dispatch(fetchOneSuccess(response.data));
        } catch (e) {
            dispatch(fetchOneFailure(e));
        }
    };
};