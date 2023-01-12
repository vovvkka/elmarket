import {createSlice} from "@reduxjs/toolkit"

const name = 'products';

export const initialState = {
    history: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name,
    initialState,
    reducers: {
        sendHistoryRequest(state) {
            state.loading = true;
            state.error = null;
        },
        sendHistorySuccess(state) {
            state.loading = false;
        },
        sendHistoryFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchHistoryRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchHistorySuccess(state, {payload: history}) {
            state.history = history;
            state.loading = false;
        },
        fetchHistoryFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    sendHistoryRequest,
    sendHistorySuccess,
    sendHistoryFailure,
    fetchHistoryRequest,
    fetchHistorySuccess,
    fetchHistoryFailure
} = productsSlice.actions;

export default productsSlice;
