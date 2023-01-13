import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {
    addFeedbackFailure,
    addFeedbackRequest,
    addFeedbackSuccess, fetchFeedbacksFailure,
    fetchFeedbacksRequest, fetchFeedbacksSuccess
} from "../slices/feedbackSlice";

export const addFeedback = feedbackData => {
    return async (dispatch) => {
        try {
            dispatch(addFeedbackRequest());
            await axiosApi.post(`/products/feedback${feedbackData.product ? `/${feedbackData.product}` : ''}`, feedbackData);
            dispatch(addFeedbackSuccess());
            dispatch(historyPush(feedbackData.product ? '/reviews/' + feedbackData.product : '/catalog'));
        } catch (e) {
            dispatch(addFeedbackFailure(e));
        }
    };
};

export const fetchFeedbacks = (productId) => {
    return async (dispatch) => {
        try {
            dispatch(fetchFeedbacksRequest());
            const response = await axiosApi(`/products/feedback${productId ? `/${productId}` : ''}`);
            dispatch(fetchFeedbacksSuccess(response.data));
        } catch (e) {
            dispatch(fetchFeedbacksFailure(e));
        }
    };
};