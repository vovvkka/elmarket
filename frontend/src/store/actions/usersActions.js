import axiosApi from '../../axiosApi';
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    editProfileFailure,
    editProfileSuccess,
    editProfileRequest,
    getProfileRequest,
    getProfileSuccess,
    getProfileFailure,
    forgotPasswordRequest,
    forgotPasswordSuccess, forgotPasswordFailure, resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure,
} from '../slices/usersSlice';
import {historyPush} from "./historyActions";

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('/users', userData);

            dispatch(registerSuccess(response.data));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerFailure(e.response.data));
            } else {
                dispatch(registerFailure({ global: 'No internet' }));
            }
        }
    };
};

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);
            console.log(response.data.user);

            dispatch(loginSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginFailure(e.response.data));
                throw e;
            } else {
                dispatch(loginFailure({ global: 'No internet' }));
                throw e;
            }
        }
    };
};

export const editProfile = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(editProfileRequest());

            await axiosApi.put('/users', userData);

            dispatch(editProfileSuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editProfileFailure(e.response.data));
                throw e;
            } else {
                dispatch(editProfileFailure({ global: 'No internet' }));
                throw e;
            }
        }
    };
};

export const getProfile = () => {
    return async (dispatch) => {
        try {
            dispatch(getProfileRequest());

            const response = await axiosApi('/users');

            dispatch(getProfileSuccess(response.data));
        } catch (e) {
            dispatch(getProfileFailure(e));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete('/users/sessions');

            dispatch(logoutSuccess());
        } catch (e) {
            dispatch(logoutFailure(e));
        }
    };
};

export const forgotPassword = email => {
    return async dispatch => {
        try {
            dispatch(forgotPasswordRequest());

            await axiosApi.post('/users/forgot-password', {email});

            dispatch(forgotPasswordSuccess());
        } catch (e) {
            dispatch(forgotPasswordFailure(e.response.data));
        }
    };
};

export const resetPassword = (id, token, userData) => {
    return async dispatch => {
        try {
            dispatch(resetPasswordRequest());

            await axiosApi.post(`/users/reset-password/${id}/${token}`, userData);

            dispatch(resetPasswordSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(resetPasswordFailure(e.response.data));
        }
    };
};
