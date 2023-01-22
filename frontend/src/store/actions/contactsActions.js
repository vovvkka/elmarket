import axiosApi from "../../axiosApi";
import {
    editContactsFailure,
    editContactsRequest, editContactsSuccess,
    fetchContactsFailure,
    fetchContactsRequest,
    fetchContactsSuccess
} from "../slices/contactsSlice";
import {historyPush} from "./historyActions";

export const fetchContacts = () => {
    return async (dispatch) => {
        try {
            dispatch(fetchContactsRequest());
            const response = await axiosApi(`/contacts`);
            dispatch(fetchContactsSuccess(response.data));
        } catch (e) {
            dispatch(fetchContactsFailure(e));
        }
    };
};

export const editContacts = (data) => {
    return async (dispatch) => {
        try {
            dispatch(editContactsRequest());
            const response = await axiosApi.put(`/contacts`, data);
            dispatch(editContactsSuccess(response.data));
            dispatch(historyPush('/admin/contacts'));
        } catch (e) {
            dispatch(editContactsFailure(e));
        }
    };
};