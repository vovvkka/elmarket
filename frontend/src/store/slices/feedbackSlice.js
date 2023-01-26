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
        deleteFeedbackRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteFeedbackSuccess(state, {payload}) {
            state.loading = false;
            state.feedbacks.rating = [
                ...state.feedbacks.rating.filter((i) => i._id !== payload._id),
            ];
        },
        deleteFeedbackFailure(state, {payload}) {
            state.loading = false;
            state.error = payload;
        }
    }
});

export const {
    addFeedbackRequest,
    addFeedbackSuccess,
    addFeedbackFailure,
    fetchFeedbacksRequest,
    fetchFeedbacksSuccess,
    fetchFeedbacksFailure,
    deleteFeedbackRequest,
    deleteFeedbackSuccess,
    deleteFeedbackFailure
} = feedbackSlice.actions;

export default feedbackSlice;
