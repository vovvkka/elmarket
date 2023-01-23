import {createSlice} from "@reduxjs/toolkit";

const name = 'categories';

export const initialState = {
    categories: [],
    popularCategories: [],
    pages: null,
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
        fetchCategoriesSuccess(state, {payload}) {
            state.loading = false;
            if (payload.totalPages) {
                state.categories = payload.categories;
                state.pages = payload.totalPages;
            } else {
                state.categories = payload;
            }
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
        deleteCategoryRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteCategorySuccess(state, action) {
            state.loading = false;
            state.categories = [...state.categories.filter(c => c._id !== action.payload)];
        },
        deleteCategoryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        clearCategoryError(state) {
            state.createError = null;
        }
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
    createCategoryFailure,
    deleteCategoryRequest,
    deleteCategorySuccess,
    deleteCategoryFailure,
    clearCategoryError
} = categoriesSlice.actions;

export default categoriesSlice;
