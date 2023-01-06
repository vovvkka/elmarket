import axiosApi from "../../axiosApi";
import {
    fetchCategoriesPopularFailure,
    fetchCategoriesPopularRequest,
    fetchCategoriesPopularSuccess
} from "../slices/categoriesSlice";


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