import {createSlice} from "@reduxjs/toolkit";

const name = 'categories';

export const initialState = {
    categories: [],
    popularCategories: [],
    createLoading: false,
    loading: false,
    createError: null,
    error: null,
};

const categoriesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCategoriesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCategoriesSuccess(state, {payload: categories}) {
            state.loading = false;
            state.categories = categories;
        },
        fetchCategoriesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCategoriesPopularRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCategoriesPopularSuccess(state, {payload: popularCategories}) {
            state.popularCategories = popularCategories;
            state.loading = false;
        },
        fetchCategoriesPopularFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createCategoryRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        createCategorySuccess(state) {
            state.createLoading = false;
        },
        createCategoryFailure(state, action) {
            state.createLoading = false;
            state.createError = action.payload;
        },
    }
});

export const {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
    fetchCategoriesPopularRequest,
    fetchCategoriesPopularSuccess,
    fetchCategoriesPopularFailure,
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure
} = categoriesSlice.actions;

export default categoriesSlice;
