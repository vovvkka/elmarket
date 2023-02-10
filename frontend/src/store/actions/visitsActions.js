import axiosApi from "../../axiosApi";
import {fetchVisitsFailure, fetchVisitsRequest, fetchVisitsSuccess} from "../slices/visitsSlice";

export const fetchVisits = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchVisitsRequest());
            const response = await axiosApi.get(`/visits`);
            dispatch(fetchVisitsSuccess(response.data));
        } catch (e) {
            dispatch(fetchVisitsFailure(e));
        }
    };
};

// export const editContacts = (data) => {
//     return async (dispatch) => {
//         try {
//             dispatch(editContactsRequest());
//             const response = await axiosApi.put(`/contacts`, data);
//             dispatch(editContactsSuccess(response.data));
//             dispatch(historyPush('/admin/contacts'));
//         } catch (e) {
//             dispatch(editContactsFailure(e));
//         }
//     };
// };