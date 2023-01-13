import {createSlice} from "@reduxjs/toolkit";

const name = 'feedback';

export const initialState = {
    feedbacks: [],
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name,
    initialState,
    reducers: {
        addFeedbackRequest(state) {
            state.loading = true;
            state.error = null;
        },
        addFeedbackSuccess(state) {
            state.loading = false;
        },
        addFeedbackFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchFeedbacksRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchFeedbacksSuccess(state, {payload: feedbacks}) {
            state.loading = false;
            state.feedbacks = feedbacks;
        },
        fetchFeedbacksFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    addFeedbackRequest,
    addFeedbackSuccess,
    addFeedbackFailure,
    fetchFeedbacksRequest,
    fetchFeedbacksSuccess,
    fetchFeedbacksFailure
} = feedbackSlice.actions;

export default feedbackSlice;
