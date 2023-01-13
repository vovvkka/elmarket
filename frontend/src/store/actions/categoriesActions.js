import axiosApi from "../../axiosApi";
import {
    createCategoryFailure,
    createCategoryRequest, createCategorySuccess,
    fetchCategoriesFailure,
    fetchCategoriesPopularFailure,
    fetchCategoriesPopularRequest,
    fetchCategoriesPopularSuccess, fetchCategoriesRequest, fetchCategoriesSuccess
} from "../slices/categoriesSlice";
import {historyPush} from "./historyActions";

export const fetchCategories = query => {
    return async dispatch => {
        try {
            dispatch(fetchCategoriesRequest());

            let response;

            if (query) {
                response = await axiosApi.get('/categories' + query);
            } else {
                response = await axiosApi.get('/categories');
            }

            dispatch(fetchCategoriesSuccess(response.data));
        } catch (e) {
            dispatch(fetchCategoriesFailure(e));
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

export const createCategory = categoryData => {
    return async dispatch => {
        try {
            dispatch(createCategoryRequest());

            await axiosApi.post("/categories", categoryData);

            dispatch(createCategorySuccess());
            dispatch(historyPush("/admin/categories"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createCategoryFailure(e.response.data));
            } else {
                dispatch(createCategoryFailure({global: 'No internet'}));
            }
        }
    };
};