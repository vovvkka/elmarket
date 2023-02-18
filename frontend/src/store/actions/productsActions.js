import axiosApi from "../../axiosApi";
import {
    createProductFailure,
    createProductRequest,
    createProductSuccess, deleteProductFailure,
    deleteProductRequest, deleteProductSuccess,
    editProductFailure,
    editProductRequest,
    editProductSuccess,
    fetchOneFailure,
    fetchOneRequest,
    fetchOneSuccess,
    fetchProductsFailure,
    fetchProductsRequest,
    fetchProductsSuccess, fetchSalesFailure, fetchSalesRequest, fetchSalesSuccess
} from "../slices/productsSlice";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

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

export const fetchSales = () => {
    return async dispatch => {
        try {
            dispatch(fetchSalesRequest());

            const response = await axiosApi(`/products/sales`);

            dispatch(fetchSalesSuccess(response.data));
        } catch (e) {
            dispatch(fetchSalesFailure(e));
        }
    };
};

export const fetchOne = (id, query) => {
    return async dispatch => {
        try {
            dispatch(fetchOneRequest());

            let response;

            if (query) {
                response = await axiosApi('/products/admin/' + id);
            } else {
                response = await axiosApi('/products/' + id);
            }

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
            dispatch(addNotification('Товар успешно добавлен!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(createProductFailure(e.response.data));
            } else {
                dispatch(createProductFailure({global: 'No internet'}));
            }
        }
    };
};

export const editProduct = (id, productData) => {
    return async dispatch => {
        try {
            dispatch(editProductRequest());

            await axiosApi.put("/products/" + id, productData);

            dispatch(editProductSuccess());
            dispatch(historyPush("/admin/products"));
            dispatch(addNotification('Товар успешно отредактирован!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(editProductFailure(e.response.data));
            } else {
                dispatch(editProductFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteProduct = id => {
    return async dispatch => {
        try {
            dispatch(deleteProductRequest());

            await axiosApi.delete("/products/" + id);

            dispatch(deleteProductSuccess(id));
            dispatch(addNotification('Товар успешно удален!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            dispatch(deleteProductFailure(e));
        }
    };
};