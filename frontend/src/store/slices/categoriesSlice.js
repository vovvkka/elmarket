import {createSlice} from "@reduxjs/toolkit";

const name = 'categories';

export const initialState = {
    categories: [],
    popularCategories: [],
    category: null,
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
        fetchCategoryRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCategorySuccess(state, {payload: category}) {
            state.loading = false;
            state.category = category;
        },
        fetchCategoryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editCategoryRequest(state) {
            state.createLoading = true;
            state.createError = null;
        },
        editCategorySuccess(state) {
            state.createLoading = false;
        },
        editCategoryFailure(state, action) {
            state.createLoading = false;
            state.createError = action.payload;
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
    fetchCategoryRequest,
    fetchCategorySuccess,
    fetchCategoryFailure,
    editCategoryRequest,
    editCategorySuccess,
    editCategoryFailure,
    createCategoryRequest,
    createCategorySuccess,
    createCategoryFailure
} = categoriesSlice.actions;

export default categoriesSlice;
