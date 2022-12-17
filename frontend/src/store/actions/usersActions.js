import axiosApi from "../../axiosApi";
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest, registerSuccess, registerFailure
} from "../slices/usersSlice";
import {historyPush} from "./historyActions";

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('/users', userData);

            dispatch(registerSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerFailure(e.response.data));
            } else {
                dispatch(registerFailure({global: 'No internet'}));
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            dispatch(loginSuccess(response.data.user));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginFailure(e.response.data));
            } else {
                dispatch(loginFailure({global: 'No internet'}));
            }
        }
    };
};

export const logoutUser = () => {
    return async dispatch => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete('/users/sessions');

            dispatch(logoutSuccess());
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(logoutFailure(e));
        }
    };
};