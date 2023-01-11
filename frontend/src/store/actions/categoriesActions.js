import axiosApi from "../../axiosApi";
import {
    fetchCategoriesFailure,
    fetchCategoriesPopularFailure,
    fetchCategoriesPopularRequest,
    fetchCategoriesPopularSuccess, fetchCategoriesRequest, fetchCategoriesSuccess
} from "../slices/categoriesSlice";

export const fetchCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());

            const response = await axiosApi.get('/categories');

            dispatch(fetchCategoriesSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(fetchCategoriesFailure(e.response.data));
            } else {
                dispatch(fetchCategoriesFailure({global: 'No internet'}));
            }
        }
    };
};
export const getPopularCategories = () => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesPopularRequest());
            const response = await axiosApi.get("/categories/popular");

            dispatch(fetchCategoriesPopularSuccess(response.data));
        } catch (e) {
            dispatch(fetchCategoriesPopularFailure(e));
        }
    };
};