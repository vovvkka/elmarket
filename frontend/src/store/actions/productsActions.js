import axiosApi from "../../axiosApi";
import {
    createProductFailure,
    createProductRequest, createProductSuccess,
    fetchOneFailure,
    fetchOneRequest, fetchOneSuccess,
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess
} from "../slices/productsSlice";
import {createCategoryFailure, createCategoryRequest, createCategorySuccess} from "../slices/categoriesSlice";
import {historyPush} from "./historyActions";

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

export const createProduct = productData => {
    return async dispatch => {
        try {
            dispatch(createProductRequest());

            await axiosApi.post("/products", productData);

            dispatch(createProductSuccess());
            dispatch(historyPush("/admin/products"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createProductFailure(e.response.data));
            } else {
                dispatch(createProductFailure({global: 'No internet'}));
            }
        }
    };
};