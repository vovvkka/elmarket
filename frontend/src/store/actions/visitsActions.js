import axiosApi from "../../axiosApi";
import {fetchVisitsFailure, fetchVisitsRequest, fetchVisitsSuccess} from "../slices/visitsSlice";

export const fetchVisits = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchVisitsRequest());
            const response = await axiosApi.get(`/visits`);
            dispatch(fetchVisitsSuccess(response.data.visits));
        } catch (e) {
            dispatch(fetchVisitsFailure(e));
        }
    };
};

export const newVisit = () => {
    return async () => {
        await axiosApi.post('/visits');
    };
};