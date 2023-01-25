import { createSlice } from '@reduxjs/toolkit';

const name = 'users';

export const initialState = {
    user: null,
    profile: null,
    loginLoading: false,
    loginError: null,
    registerLoading: false,
    registerError: null,
    logoutLoading: false,
    logoutError: null,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        registerRequest(state) {
            state.registerLoading = true;
            state.registerError = null;
        },
        registerSuccess(state, action) {
            state.registerLoading = false;
            state.user = action.payload;
        },
        registerFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, action) {
            state.loginLoading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutRequest(state) {
            state.logoutLoading = true;
            state.logoutError = null;
        },
        logoutSuccess(state) {
            state.logoutLoading = false;
            state.user = null;
        },
        logoutFailure(state, action) {
            state.logoutLoading = false;
            state.logoutError = action.payload;
        },
        editProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editProfileSuccess(state) {
            state.loading = false;
        },
        editProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getProfileRequest(state) {
            state.loading = true;
            state.error = null;
        },
        getProfileSuccess(state, { payload: profile }) {
            state.loading = true;
            state.profile = profile;
        },
        getProfileFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        forgotPasswordRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        forgotPasswordSuccess(state) {
            state.loginLoading = false;
        },
        forgotPasswordFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        resetPasswordRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        resetPasswordSuccess(state) {
            state.loginLoading = false;
        },
        resetPasswordFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        changePasswordRequest(state) {
            state.loading = true;
            state.error = null;
        },
        changePasswordSuccess(state) {
            state.loading = false;
        },
        changePasswordFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
        resendActivationLinkRequest(state) {
            state.loading = true;
            state.error = null;
        },
        resendActivationLinkSuccess(state) {
            state.loading = false;
        },
        resendActivationLinkFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    editProfileRequest,
    editProfileSuccess,
    editProfileFailure,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailure,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
    resendActivationLinkRequest,
    resendActivationLinkSuccess,
    resendActivationLinkFailure
} = usersSlice.actions;

export default usersSlice;
