import axiosApi from "../../axiosApi";
import {
    createCategoryFailure,
    createCategoryRequest,
    createCategorySuccess,
    deleteCategoryFailure,
    deleteCategoryRequest, deleteCategorySuccess,
    editCategoryFailure,
    editCategoryRequest,
    editCategorySuccess,
    fetchCategoriesFailure,
    fetchCategoriesPopularFailure,
    fetchCategoriesPopularRequest,
    fetchCategoriesPopularSuccess,
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoryFailure,
    fetchCategoryRequest,
    fetchCategorySuccess
} from "../slices/categoriesSlice";
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";

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

export const fetchCategory = id => {
    return async dispatch => {
        try {
            dispatch(fetchCategoryRequest());
            const response = await axiosApi.get("/categories/" + id);

            dispatch(fetchCategorySuccess(response.data));
        } catch (e) {
            dispatch(fetchCategoryFailure(e));
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
            dispatch(addNotification('Категория успешно добавлена!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(createCategoryFailure(e.response.data));
            } else {
                dispatch(createCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const editCategory = (id, categoryData) => {
    return async dispatch => {
        try {
            dispatch(editCategoryRequest());

            await axiosApi.put("/categories/" + id, categoryData);

            dispatch(editCategorySuccess());
            dispatch(historyPush("/admin/categories"));
            dispatch(addNotification('Категория успешно отредактирована!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(editCategoryFailure(e.response.data));
            } else {
                dispatch(editCategoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteCategory = id => {
    return async dispatch => {
        try {
            dispatch(deleteCategoryRequest());

            await axiosApi.delete('/categories/' + id);

            dispatch(deleteCategorySuccess(id));
            dispatch(addNotification('Категория успешно удалена!', "success"));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            dispatch(deleteCategoryFailure(e));
        }
    };
};