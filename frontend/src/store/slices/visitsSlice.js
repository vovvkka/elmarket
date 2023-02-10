import {createSlice} from '@reduxjs/toolkit';

const name = 'visits';

export const initialState = {
    visits: 0,
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchVisitsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchVisitsSuccess(state, action) {
            state.loading = false;
            state.visists = action.payload;
        },
        fetchVisitsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchVisitsRequest,
    fetchVisitsSuccess,
    fetchVisitsFailure,
} = usersSlice.actions;

export default usersSlice;
